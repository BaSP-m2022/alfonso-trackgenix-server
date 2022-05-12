import express from 'express';
import fs from 'fs';
import timesheets from '../data/time-sheets.json';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    data: timesheets,
  });
});

router.get('/:id', (req, res) => {
  const timesheetsId = req.params.id;
  const timesheet = timesheets
    .find((timesheetRequested) => timesheetsId === timesheetRequested.id.toString());
  const validIds = timesheets.map((ts) => ts.id);
  if (timesheet) {
    res.status(200).json({ timesheet });
  } else {
    res.status(404).send(`Timesheet with ID: ${timesheetsId} were not found. Valid IDs: ${validIds}`);
  }
});

router.put('/:id', (req, res) => {
  const timesheetsId = req.params.id;
  const filteredTimesheets = timesheets
    .find((timesheet) => timesheet.id.toString() === timesheetsId);
  const updatedTimesheet = req.body;

  if (filteredTimesheets) {
    timesheets.forEach((timesheet) => {
      const newTS = timesheet;
      if (timesheet.id.toString() === timesheetsId) {
        newTS.employeeId = updatedTimesheet.employeeId
          ? updatedTimesheet.employeeId
          : timesheet.employeeId;
        newTS.description = updatedTimesheet.description ? updatedTimesheet.description
          : timesheet.description;
        newTS.project = updatedTimesheet.project ? updatedTimesheet.project : timesheet.project;
        newTS.date = updatedTimesheet.date ? updatedTimesheet.date : timesheet.date;
        newTS.hours = updatedTimesheet.hours ? updatedTimesheet.hours : timesheet.hours;
        newTS.task = updatedTimesheet.task ? updatedTimesheet.task : timesheet.task;
        newTS.approved = updatedTimesheet.approved ? updatedTimesheet.approved : timesheet.approved;
        newTS.role = updatedTimesheet.role ? updatedTimesheet.role : timesheet.role;
      }
    });

    fs.writeFile('src/data/time-sheets.json', JSON.stringify(timesheets), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('The timesheet was updated succesfully');
      }
    });
  } else {
    res.send(`No timesheet with the id of ${req.params.id} were found.`);
  }
});

router.delete('/delete/:id', (req, res) => {
  const timesheetsId = req.params.id;
  const filteredTimesheets = timesheets
    .filter((timesheet) => timesheet.id.toString() !== timesheetsId);
  if (timesheets.length === filteredTimesheets.length) {
    res.send(`No timesheets with the id of ${req.params.id} were found`);
  } else {
    fs.writeFile('src/data/time-sheets.json', JSON.stringify(filteredTimesheets), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Time-sheet deleted');
      }
    });
  }
});

router.get('/getAll', (req, res) => {
  res.status(200).json({ data: timesheets });
});

router.get('/getByEmployee/:employeeId', (req, res) => {
  const tsEmp = req.params.employeeId;
  const ts = timesheets.filter((tSheet) => tSheet.employeeId === tsEmp);
  if (ts.length > 0) {
    res.status(200).json({ data: ts });
  } else {
    res.status(404).json({ msg: `No timesheets found for employee ${tsEmp}` });
  }
});

router.get('/getByProject/:project', (req, res) => {
  const tsProj = req.params.project;
  const ts = timesheets.filter((tSheet) => tSheet.project === tsProj);
  if (ts.length > 0) {
    res.status(200).json({ data: ts });
  } else {
    res.status(404).json({ msg: `No timesheets found for project ${tsProj}` });
  }
});

router.get('/getByDate', (req, res) => {
  const tsDate = req.query.date;
  const ts = timesheets.filter((tSheet) => tSheet.date === tsDate);
  if (ts.length > 0) {
    res.status(200).json({ data: ts });
  } else {
    res.status(404).json({ msg: 'No timesheets found for this date' });
  }
});

router.get('/getByStatus/:approved', (req, res) => {
  const tsAp = req.params.approved;
  const ts = timesheets.filter((tSheet) => tSheet.approved.toString() === tsAp);
  if (ts.length > 0) {
    res.status(200).json({ data: ts });
  } else {
    res.status(404).json({ msg: 'No timesheets found' });
  }
});

const isRepeated = (array, data) => {
  let repeated = false;
  for (let i = 0; i < array.length; i += 1) {
    if (timesheets[i].id === data.id) {
      repeated = true;
    }
  }
  return repeated;
};

router.post('/add', (req, res) => {
  const tsData = req.body;
  if (isRepeated(timesheets, tsData)) {
    res.status(409).json({ msg: 'This timesheet id corresponds to an existing timesheet' });
  } else if (tsData.id && tsData.employeeId && tsData.description && tsData.project
    && tsData.date && tsData.hours && tsData.task && tsData.approved !== '' && tsData.role) {
    timesheets.push(tsData);
    fs.writeFile('src/data/time-sheets.json', JSON.stringify(timesheets), (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send('Timesheet created');
      }
    });
  } else {
    res.status().json({ msg: 'Please complete all fields' });
  }
});

export default router;
