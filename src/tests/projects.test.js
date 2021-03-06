import request from 'supertest';
import app from '../app';
import Projects from '../models/Projects';
import Employees from '../models/Employees';
import Task from '../models/Tasks';
import projectsSeed from '../seeds/projects';
import employeeSeed from '../seeds/employees';
import taskSeed from '../seeds/tasks';

beforeAll(async () => {
  await Projects.collection.insertMany(projectsSeed);
  await Employees.collection.insertMany(employeeSeed);
  await Task.collection.insertMany(taskSeed);
});

const projectID = '68a4a32f247e066e9495ce12';
let projectId;

describe('Test Projects routes', () => {
  test('It should create a new project', async () => {
    const response = await request(app).post('/projects').send({
      name: 'Gaylor',
      description: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Gaylor Geikie',
      startDate: '03/18/2021',
      endDate: '05/02/2021',
      projectManager: 'Gaylor Renbold',
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.statusCode).toBe(201);
    // eslint-disable-next-line no-underscore-dangle
    projectId = response.body.data._id;
  });
  test('This PUT should edit a project', async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      name: 'Gaylor',
      description: 'dis new montes edit ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Gaylor edit',
      startDate: '04/18/2021',
      endDate: '09/02/2021',
      projectManager: 'Gaylor Edited',
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.statusCode).toBe(200);
  });
});

describe('Test mesagges of project Routes', () => {
  test('This POST should give a seccess mesagge', async () => {
    const response = await request(app).post('/projects').send({
      name: 'Taylor',
      description: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Taylor Geikie',
      startDate: '03/18/2021',
      endDate: '05/02/2021',
      projectManager: 'Taylor Renbold',
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.body.message).toEqual('Project has been created');
  });
  test('This PUT should give a seccess mesagge', async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      name: 'Gaylor',
      description: 'dis new montes edit ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Gaylor edit',
      startDate: '04/18/2021',
      endDate: '09/02/2021',
      projectManager: 'Gaylor Edited',
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.body.message).toEqual('Project succesfully updated');
  });
});

describe('Test errors for response', () => {
  test('This POST should give us a false error', async () => {
    const response = await request(app).post('/projects').send({
      name: 'Green',
      description: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Green Geikie',
      startDate: '03/18/2021',
      endDate: '05/02/2021',
      projectManager: 'Green Renbold',
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.body.error).not.toBeTruthy();
  });
  test('This PUT should give us a false error', async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      name: 'Blue',
      description: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Blue Geikie',
      startDate: '03/18/2021',
      endDate: '05/02/2021',
      projectManager: 'Blue Renbold',
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.body.error).not.toBeTruthy();
  });
  test('This POST should give us a true error', async () => {
    const response = await request(app).post('/projects').send({
      name: 'A',
      description: 'b',
      clientName: 'Green Geikie',
      startDate: '03/18/2021',
      endDate: '05/02/2021',
      projectManager: 'Green Renbold',
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.body.error).toBeTruthy();
  });
  test('This PUT should give us a true error', async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      name: 'c',
      description: 'd',
      clientName: 'Green Geikie',
      startDate: '03/18/2021',
      endDate: '05/02/2021',
      projectManager: 'Green Renbold',
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.body.error).toBeTruthy();
  });
});

describe('Test lengths', () => {
  test('This POST test thes give us the validations of the name lengths, equal than joi', async () => {
    const response = await request(app).post('/projects').send({
      name: 'Taylor',
      description: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Gaylor Geikie',
      startDate: '03/18/2021',
      endDate: '05/02/2021',
      projectManager: 'Gaylor Renbold',
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.body.data.name.length).toBeGreaterThanOrEqual(3);
    expect(response.body.data.name.length).toBeLessThanOrEqual(30);
  });
  test('This POST test thes give us the validations of the description lengths, equal than joi', async () => {
    const response = await request(app).post('/projects').send({
      name: 'Taylor',
      description: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Gaylor Geikie',
      startDate: '03/18/2021',
      endDate: '05/02/2021',
      projectManager: 'Gaylor Renbold',
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.body.data.description.length).toBeGreaterThanOrEqual(3);
    expect(response.body.data.description.length).toBeLessThanOrEqual(300);
  });
  test('This POST test thes give us the validations of the client name lengths, equal than joi', async () => {
    const response = await request(app).post('/projects').send({
      name: 'Taylor',
      description: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Gaylor Geikie',
      startDate: '03/18/2021',
      endDate: '05/02/2021',
      projectManager: 'Gaylor Renbold',
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.body.data.clientName.length).toBeGreaterThanOrEqual(3);
    expect(response.body.data.clientName.length).toBeLessThanOrEqual(30);
  });
  test('This POST test thes give us the validations of the project manager lengths, equal than joi', async () => {
    const response = await request(app).post('/projects').send({
      name: 'Taylor',
      description: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Gaylor Geikie',
      startDate: '03/18/2021',
      endDate: '05/02/2021',
      projectManager: 'Gaylor Renbold',
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.body.data.projectManager.length).toBeGreaterThanOrEqual(3);
    expect(response.body.data.projectManager.length).toBeLessThanOrEqual(30);
  });
  test('This PUT test thes give us the validations of the name lengths, equal than joi', async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      name: 'Taylor',
      description: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Gaylor Geikie',
      startDate: '03/18/2021',
      endDate: '05/02/2021',
      projectManager: 'Gaylor Renbold',
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.body.data.name.length).toBeGreaterThanOrEqual(3);
    expect(response.body.data.name.length).toBeLessThanOrEqual(30);
  });
  test('This PUT test thes give us the validations of the description lengths, equal than joi', async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      name: 'Taylor',
      description: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Gaylor Geikie',
      startDate: '03/18/2021',
      endDate: '05/02/2021',
      projectManager: 'Gaylor Renbold',
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.body.data.description.length).toBeGreaterThanOrEqual(3);
    expect(response.body.data.description.length).toBeLessThanOrEqual(300);
  });
  test('This PUT test thes give us the validations of the client name lengths, equal than joi', async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      name: 'Taylor',
      description: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Gaylor Geikie',
      startDate: '03/18/2021',
      endDate: '05/02/2021',
      projectManager: 'Gaylor Renbold',
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.body.data.clientName.length).toBeGreaterThanOrEqual(3);
    expect(response.body.data.clientName.length).toBeLessThanOrEqual(30);
  });
  test('This PUT test thes give us the validations of the project manager lengths, equal than joi', async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      name: 'Taylor',
      description: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Gaylor Geikie',
      startDate: '03/18/2021',
      endDate: '05/02/2021',
      projectManager: 'Gaylor Renbold',
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.body.data.projectManager.length).toBeGreaterThanOrEqual(3);
    expect(response.body.data.projectManager.length).toBeLessThanOrEqual(300);
  });
});
describe('Test missing parameters', () => {
  test('This POST should throw an error 400 because name is missing', async () => {
    const response = await request(app).post('/projects').send({
      description: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Gaylor Geikie',
      startDate: '03/18/2021',
      endDate: '05/02/2021',
      projectManager: 'Gaylor Renbold',
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.statusCode).toBe(400);
  });
  test('This POST should throw an error 400 because description is missing', async () => {
    const response = await request(app).post('/projects').send({
      name: 'Gaylor',
      clientName: 'Gaylor Geikie',
      startDate: '03/18/2021',
      endDate: '05/02/2021',
      projectManager: 'Gaylor Renbold',
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.statusCode).toBe(400);
  });
  test('This POST should throw an error 400 because client name is missing', async () => {
    const response = await request(app).post('/projects').send({
      name: 'Gaylor',
      description: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      startDate: '03/18/2021',
      endDate: '05/02/2021',
      projectManager: 'Gaylor Renbold',
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.statusCode).toBe(400);
  });
  test('This POST should throw an error 400 because start date is missing', async () => {
    const response = await request(app).post('/projects').send({
      name: 'Gaylor',
      description: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Gaylor Geikie',
      endDate: '05/02/2021',
      projectManager: 'Gaylor Renbold',
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.statusCode).toBe(400);
  });
  test('This POST should throw an error 400 because project manager is missing', async () => {
    const response = await request(app).post('/projects').send({
      name: 'Gaylor',
      description: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Gaylor Geikie',
      startDate: '20/04/2021',
      endDate: '05/02/2021',
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.statusCode).toBe(400);
  });
  test('This POST should throw an error 400 because team is missing', async () => {
    const response = await request(app).post('/projects').send({
      name: 'Gaylor',
      description: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Gaylor Geikie',
      startDate: '20/04/2021',
      endDate: '05/02/2021',
      projectManager: 'Gaylor Renbold',
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.statusCode).toBe(400);
  });
  test('This POST should throw an error 400 because tasks is missing', async () => {
    const response = await request(app).post('/projects').send({
      name: 'Gaylor',
      description: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Gaylor Geikie',
      startDate: '20/04/2021',
      endDate: '05/02/2021',
      projectManager: 'Garrison Drake',
      team:
      ['60a4a32f24ae066e9495ce12'],
    });
    expect(response.statusCode).toBe(400);
  });
  test('This POST should not throw an error because end date is not necessary', async () => {
    const response = await request(app).post('/projects').send({
      name: 'Gaylor',
      description: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Gaylor Geikie',
      startDate: '03/18/2021',
      projectManager: 'Gaylor Renbold',
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.statusCode).toBe(201);
  });
  test('This PUT should throw an error 500 because id is not correct', async () => {
    const response = await request(app).put('/projects/0303456').send({
      name: 'Gaylor',
      description: 'dis new montes edit ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Gaylor edit',
      startDate: '04/18/2021',
      endDate: '09/02/2021',
      projectManager: 'Gaylor Edited',
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.statusCode).toBe(500);
  });
});

describe('GET ALL/Projects', () => {
  test('It should should show all projects and return a 200 status', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.status).toBe(200);
  });

  test('It should return a successful message', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.body.message).toEqual('All Projects are:');
  });

  test('It should return at least one project', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test('It should NOT return any project, due to wrong path', async () => {
    const response = await request(app).get('/notproject').send();
    expect(response.statusCode).toBe(404);
  });
});

describe('GET projects/id ', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get(`/projects/${projectID}`).send();
    expect(response.status).toBe(200);
  });
  test('response should return a false error', async () => {
    const response = await request(app).get(`/projects/${projectID}`).send();
    expect(response.error).toBeFalsy();
  });
  test('response should return a 404 status', async () => {
    const response = await request(app).get(`/patata/${projectID}`).send();
    expect(response.status).toBe(404);
  });
  test('response should return an empty body', async () => {
    const response = await request(app).get(`/patata/${projectID}`).send();
    expect(response.body.data).toBeUndefined();
  });
  test('response should return a true error', async () => {
    const response = await request(app).get(`/patata/${projectID}`).send();
    expect(response.error).toBeTruthy();
  });
  test('response should not return a 400 status', async () => {
    const response = await request(app).get('/projects/15946').send();
    expect(response.status).toBe(400);
  });
  test('response should not return an empty object', async () => {
    const response = await request(app).get('/projects/15946').send();
    expect(response.body.data.length).toBeUndefined();
  });
  test('response should not return a true error', async () => {
    const response = await request(app).get('/projects/15946').send();
    expect(response.error).toBeTruthy();
  });
  test('response should return a message', async () => {
    const response = await request(app).get(`/projects/${projectID}`).send();
    expect(response.body.message).toEqual(`Project with ID:${projectID} sent:`);
  });
  test('response should not return without a name', async () => {
    const response = await request(app).get(`/projects/${projectID}`).send();
    expect(response.body.data).toHaveProperty('name');
  });
  test('response should not return without a description', async () => {
    const response = await request(app).get(`/projects/${projectID}`).send();
    expect(response.body.data).toHaveProperty('description');
  });
  test('response should not return without a client name', async () => {
    const response = await request(app).get(`/projects/${projectID}`).send();
    expect(response.body.data).toHaveProperty('clientName');
  });
  test('response should not return without a start date', async () => {
    const response = await request(app).get(`/projects/${projectID}`).send();
    expect(response.body.data).toHaveProperty('startDate');
  });
  test('response should not return without a end date', async () => {
    const response = await request(app).get(`/projects/${projectID}`).send();
    expect(response.body.data).toHaveProperty('endDate');
  });
  test('response should not return without a project manager', async () => {
    const response = await request(app).get(`/projects/${projectID}`).send();
    expect(response.body.data).toHaveProperty('projectManager');
  });
  test('response should not return without a team', async () => {
    const response = await request(app).get(`/projects/${projectID}`).send();
    expect(response.body.data).toHaveProperty('team');
  });
  test('response should not return without a task sheet', async () => {
    const response = await request(app).get(`/projects/${projectID}`).send();
    expect(response.body.data).toHaveProperty('task');
  });
});

describe('DELETE projects/id', () => {
  test('response should not return a 404 status', async () => {
    const response = await request(app).patch(`/patata/${projectID}`).send();
    expect(response.status).toBe(404);
  });
  test('response should not return undefined data', async () => {
    const response = await request(app).patch(`/patata/${projectID}`).send();
    expect(response.body.data).toBeUndefined();
  });
  test('response should not return a true error', async () => {
    const response = await request(app).patch(`/patata/${projectID}`).send();
    expect(response.error).toBeTruthy();
  });
  test('response should not return a 500 status', async () => {
    const response = await request(app).patch('/projects/1594').send();
    expect(response.error).toBeTruthy();
  });
  test('response should return a 200 status', async () => {
    const response = await request(app).patch(`/projects/${projectID}`).send();
    expect(response.body.message).toEqual('Project successfully deleted');
    expect(response.body.data).not.toBeUndefined();
    expect(response.error).toBeFalsy();
    expect(response.status).toBe(200);
  });
});
