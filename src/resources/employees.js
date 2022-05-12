import express from 'express';
import fs from 'fs';
import employees from '../data/employees.json';

const router = express.Router();

router.get('/getAll', (req, res) => {
  res.status(200).json({
    data: employees,
  });
});

router.get('/getById/:id', (req, res) => {
  const employeesId = req.params.id;
  const users = employees.find((employee) => employee.id === employeesId);
  if (users) {
    res.send(users);
  } else {
    res.send('user not found');
  }
});

router.get('/getByFname/:full_name', (req, res) => {
  const employeesFname = req.params.full_name;
  const Fname = employees.filter((name) => name.full_name === employeesFname);
  if (Fname.length > 0) {
    res.send(Fname);
  } else {
    res.send(`${employees.Fname} not found`);
  }
});

router.post('/add', (req, res) => {
  const userData = req.body;
  if (userData.id && userData.full_name && userData.email && userData.gender && userData.address
    && userData.dob && userData.password && userData.phone && userData.active !== '') {
    if (employees.every((employee) => userData.id !== employee.id)) {
      employees.push(userData);
      fs.writeFile('src/data/employees.json', JSON.stringify(employees), (err) => {
        if (err) {
          res.send(err);
        } else {
          res.send('User created');
        }
      });
    } else {
      res.send('This id already exists');
    }
  } else {
    res.send('This user is incomplete');
  }
});

router.get('/getByStatus/:active', (req, res) => {
  const employeesStatus = req.params.active;
  const users = employees.filter((employee) => employee.active.toString() === employeesStatus);
  if (users) {
    res.send(users);
  } else {
    res.send('user status not found');
  }
});

router.get('/getByFname/', (req, res) => {
  const employeesFname = req.query.full_name;
  const Fname = employees.filter((employee) => employee.full_name === employeesFname);
  if (Fname.length > 0) {
    res.send(Fname);
  } else {
    res.send('Full Name not found');
  }
});

router.get('/getByGender/:gender', (req, res) => {
  const employeesGender = req.params.gender;
  const Gndr = employees.filter((employee) => employee.gender === employeesGender);
  if (Gndr.length > 0) {
    res.send(Gndr);
  } else {
    res.send('Gender not found - Insert Female or Male by parameters');
  }
});

router.put('/edit/:id', (req, res) => {
  const employeeId = req.params.id;
  const filteredEmployees = employees.find((employee) => employee.id.toString() === employeeId);
  const updEmployee = req.body;

  if (filteredEmployees) {
    employees.forEach((employee) => {
      const newEmployee = employee;
      if (employee.id.toString() === employeeId) {
        newEmployee.full_name = updEmployee.full_name ? updEmployee.full_name : employee.full_name;
        newEmployee.email = updEmployee.email ? updEmployee.email
          : employee.email;
        newEmployee.gender = updEmployee.gender ? updEmployee.gender : employee.gender;
        newEmployee.address = updEmployee.address ? updEmployee.address : employee.address;
        newEmployee.dob = updEmployee.dob ? updEmployee.dob : employee.dob;
        newEmployee.password = updEmployee.password ? updEmployee.password
          : employee.password;
        newEmployee.phone = updEmployee.phone ? updEmployee.phone : employee.phone;
        newEmployee.active = updEmployee.active ? updEmployee.active : employee.active;
      }
    });

    fs.writeFile('src/data/employees.json', JSON.stringify(employees), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Employee edit');
      }
    });
  } else {
    res.send('No Employee with the id selected');
  }
});

router.delete('/delete/:id', (req, res) => {
  const employeesId = req.params.id;
  const filteredEmployees = employees.filter(({ id }) => id !== employeesId);
  if (employees.length === filteredEmployees.length) {
    res.send('Could not delete employee because it was not found');
  } else {
    fs.writeFile('src/data/employees.json', JSON.stringify(filteredEmployees), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Employeed deleted');
      }
    });
  }
});

export default router;
