import express from 'express';
import fs from 'fs';
import projects from '../data/projects.json';

const router = express.Router();

// Delete Project

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

// Update Project

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

// Filter list
// By name

router.get('/getByName/:name', (req, res) => {
  const projectName = req.params.name;
  const filteredProjects = projects.filter((project) => project.name.toString() === projectName);
  if (filteredProjects.length > 0) {
    res.send(filteredProjects);
  } else {
    res.send(`No project with the name of ${req.params.name}`);
  }
});

// By client name

router.get('/getByClientName/:clientName', (req, res) => {
  const projectClient = req.params.clientName;
  const filtProject = projects.filter((project) => project.clientName.toString() === projectClient);
  if (filtProject.length > 0) {
    res.send(filtProject);
  } else {
    res.send(`No project with the client name of ${req.params.clientName}`);
  }
});

// By start date

router.get('/getByStartDate', (req, res) => {
  const projectStDate = req.query.startDate;
  const filtProject = projects.filter((project) => project.startDate.toString() === projectStDate);
  if (filtProject.length > 0) {
    res.send(filtProject);
  } else {
    res.send(`No project with the start date of ${req.params.startDate}`);
  }
});

// By status

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
