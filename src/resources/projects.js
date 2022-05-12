import express from 'express';
import fs from 'fs';
import projects from '../data/projects.json';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    data: projects,
  });
});

router.get('/:id', (req, res) => {
  const projectId = req.params.id;
  const project = projects.find((projectRequested) => projectId === projectRequested.id.toString());
  const validIds = projects.map((pro) => pro.id);
  if (project) {
    res.status(200).json({ project });
  } else {
    res.status(404).send(`Project with ID: ${projectId} not found. Valid IDs: ${validIds}`);
  }
});

router.post('/add', (req, res) => {
  const projectData = req.body;
  const neededKeys = ['id', 'name', 'description', 'clientName', 'startDate', 'endDate', 'projectManager', 'active',
    'adminId', 'team'];
  const validIds = projects.map((pro) => pro.id);
  if (neededKeys.every((key) => Object.keys(projectData).includes(key))
  && Object.values(projectData).every((value) => value !== '')
  && projects.every((project) => projectData.id !== project.id)) {
    projects.push(projectData);
    fs.writeFile('src/data/projects.json', JSON.stringify(projects), (err) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(201).send('Project created');
      }
    });
  } else if (projects.some((repeatedId) => projectData.id === repeatedId.id)) {
    res.status(409).send(`Project ID: ${projectData.id} already exists. Used IDs: ${validIds}`);
  } else {
    res.status(400).send('Complete all fields with valid inputs');
  }
});

router.post('/:projectId/addEmployee', (req, res) => {
  const employeeData = req.body;
  const { projectId } = req.params;
  const projectToBoost = projects.find((project) => projectId === project.id.toString());
  const validIds = projects.map((pro) => pro.id);
  const neededKeys = ['employeeId', 'employeeName', 'role', 'hours', 'rate'];
  const roles = ['QA', 'PM', 'DEV', 'TL'];
  if (projectToBoost) {
    if (neededKeys.every((key) => Object.keys(employeeData).includes(key))
    && Object.values(employeeData).every((value) => value !== '')
    && projectToBoost.team.every((employee) => employeeData.employeeId !== employee.employeeId)
    && roles.some((key) => employeeData.role === key)) {
      if ((employeeData.role === 'TL' && projectToBoost.team.some((e) => e.role === 'TL'))
      || (employeeData.role === 'PM' && projectToBoost.team.some((e) => e.role === 'PM'))) {
        res.status(409).send(`Role: ${employeeData.role} already exists in this team, and there can be only 1`);
      } else {
        projectToBoost.team.push(employeeData);
        fs.writeFile('src/data/projects.json', JSON.stringify(projects), (err) => {
          if (err) {
            res.status(400).send(err);
          } else {
            res.status(201).send('Employee added');
          }
        });
      }
    } else if (projectToBoost.team.some((team) => employeeData.employeeId === team.employeeId)) {
      res.status(409).send(`Employee ID: ${employeeData.employeeId} already exists`);
    } else if (roles.every((key) => employeeData.role !== key)) {
      res.status(406).send('Role not acceptable. Use QA, PM, DEV or TL');
    } else {
      res.status(400).send('Complete all fields with valid inputs');
    }
  } else {
    res.status(404).send(`Project with ID: ${projectId} not found. Valid IDs: ${validIds}`);
  }
});

router.delete('/delete/:id', (req, res) => {
  const projectId = req.params.id;
  const filteredProjects = projects.filter((project) => project.id.toString() !== projectId);
  if (projects.length === filteredProjects.length) {
    res.send(`No project with the id of ${req.params.id}`);
  } else {
    fs.writeFile('src/data/projects.json', JSON.stringify(filteredProjects), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Project deleted');
      }
    });
  }
});

router.put('/:id', (req, res) => {
  const projectId = req.params.id;
  const filteredProjects = projects.find((project) => project.id.toString() === projectId);
  const updProject = req.body;
  if (filteredProjects) {
    projects.forEach((project) => {
      const newProject = project;
      if (project.id.toString() === projectId) {
        newProject.name = updProject.name ? updProject.name : project.name;
        newProject.description = updProject.description ? updProject.description
          : project.description;
        newProject.clientName = updProject.clientName ? updProject.clientName : project.clientName;
        newProject.startDate = updProject.startDate ? updProject.startDate : project.startDate;
        newProject.endDate = updProject.endDate ? updProject.endDate : project.endDate;
        newProject.projectManager = updProject.projectManager ? updProject.projectManager
          : project.projectManager;
        newProject.active = updProject.active ? updProject.active : project.active;
        newProject.adminId = updProject.adminId ? updProject.adminId : project.adminId;
      }
    });
    fs.writeFile('src/data/projects.json', JSON.stringify(projects), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Project updated');
      }
    });
  } else {
    res.send(`No project with the id of ${req.params.id}`);
  }
});

router.get('/getByName/:name', (req, res) => {
  const projectName = req.params.name;
  const filteredProjects = projects.filter((project) => project.name.toString() === projectName);
  if (filteredProjects.length > 0) {
    res.send(filteredProjects);
  } else {
    res.send(`No project with the name of ${req.params.name}`);
  }
});

router.get('/getByClientName/:clientName', (req, res) => {
  const projectClient = req.params.clientName;
  const filtProject = projects.filter((project) => project.clientName.toString() === projectClient);
  if (filtProject.length > 0) {
    res.send(filtProject);
  } else {
    res.send(`No project with the client name of ${req.params.clientName}`);
  }
});

router.get('/getByStartDate', (req, res) => {
  const projectStDate = req.query.startDate;
  const filtProject = projects.filter((project) => project.startDate.toString() === projectStDate);
  if (filtProject.length > 0) {
    res.send(filtProject);
  } else {
    res.send(`No project with the start date of ${req.query.startDate}`);
  }
});

router.get('/getByActive/:active', (req, res) => {
  const projectActive = req.params.active;
  const filtProject = projects.filter((project) => project.active.toString() === projectActive);
  if (filtProject.length > 0) {
    res.send(filtProject);
  } else {
    res.send(`No project with the status of ${req.params.active}`);
  }
});

export default router;
