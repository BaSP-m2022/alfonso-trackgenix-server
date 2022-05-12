import express, { json } from 'express';

import fileSystem from 'fs';

import tasks from '../data/tasks.json';

const router = express.Router();

router.get('/taskList', (req, res) => {
  res.status(200).json({ data: tasks });
});

router.get('/findById/:id', (req, res) => {
  const taskId = req.params.id;
  const comparator = tasks.find((task) => task.id === taskId);

  if (comparator) {
    res.status(200).json({ data: comparator });
  } else {
    res.status(404).send('The specified task does not exist');
  }
});

router.get('/filterByStatus', (req, res) => {
  const taskFilter = req.query.status;
  const compliantTasks = tasks.filter((task) => task.status === taskFilter);

  if (compliantTasks.length > 0) {
    res.status(200).json({ data: compliantTasks });
  } else {
    res.status(404).send('The specified task does not exist');
  }
});

router.get('/filterByCreator', (req, res) => {
  const taskFilter = req.query.taskCreator;
  const compliantTasks = tasks.filter((task) => task.taskCreator === taskFilter);

  if (compliantTasks.length > 0) {
    res.status(200).json({ data: compliantTasks });
  } else {
    res.status(404).send('The specified task does not exist');
  }
});

router.get('/filterByProject', (req, res) => {
  const taskFilter = req.query.parentProject;
  const compliantTasks = tasks.filter((task) => task.parentProject === taskFilter);

  if (compliantTasks.length > 0) {
    res.status(200).json({ data: compliantTasks });
  } else {
    res.status(404).send('The specified task does not exist');
  }
});

router.post('/add', (req, res) => {
  const taskData = json(req.body);
  const taskId = req.params.id;
  const comparator = tasks.find((task) => task.id === taskId);

  if (comparator) {
    res.status(409).send('Requested id already exist on database');
  } else
  if (taskData.parentProject && taskData.id && taskData.taskCreator && taskData.taskName
            && taskData.startDate) {
    tasks.push(taskData);
    fileSystem.writeFile(tasks, JSON.stringify(tasks), (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send('Task has been successfully created');
      }
    });
  } else {
    res.status(400).send('One or more Key fields are not valid');
  }
});

router.put('/:id', (req, res) => {
  const taskId = req.params.id;
  const comparator = tasks.find((task) => task.id === taskId);
  const taskChanges = req.body;

  if (comparator) {
    tasks.forEach((task) => {
      const current = task;
      if (task.id === taskId) {
        current.Name = taskChanges.Name ? taskChanges.Name : task.Name;
        current.Description = taskChanges.Description
          ? taskChanges.Description : task.Description;
        current.assignedEmployee.employeeId = taskChanges.assignedEmployee.employeeId
          ? taskChanges.assignedEmployee.employeeId : task.assignedEmployee.employeeId;
        current.assignedEmployee.employeeRole = taskChanges.assignedEmployee.employeeRole
          ? taskChanges.assignedEmployee.employeeRole : task.assignedEmployee.employeeRole;
        current.assignedEmployee.employeeName = taskChanges.assignedEmployee.employeeName
          ? taskChanges.assignedEmployee.employeeName : task.assignedEmployee.employeeName;
        current.status = taskChanges.status ? taskChanges.status : task.status;
      }
    });

    fileSystem.writeFile(tasks, JSON.stringify(tasks), (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send('Task has been successfully edited');
      }
    });
  } else {
    res.status(409).send('Requested id does not exist on database');
  }
});

router.delete('/delete/:id', (req, res) => {
  const taskId = req.params.id;
  const filteredTasks = tasks.filter((task) => task.id !== taskId);

  if (filteredTasks.length < tasks.length) {
    fileSystem.writeFile(tasks, JSON.stringify(filteredTasks), (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send('Task has been successfully deleted');
      }
    });
  } else {
    res.status(409).send('Requested id does not exist on database');
  }
});

export default router;
