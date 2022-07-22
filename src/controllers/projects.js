import Project from '../models/Projects';

const getAllProjects = async (req, res) => {
  try {
    const {
      name,
      description,
      clientName,
      startDate = new Date('1900-01-01'),
    } = req.query;
    const allProjects = await Project
      .find({
        name: { $regex: new RegExp(name || '', 'i') },
        description: { $regex: new RegExp(description || '', 'i') },
        clientName: { $regex: new RegExp(clientName || '', 'i') },
        startDate: { $gte: new Date(startDate) },
        isDeleted: { $ne: true },
      })
      .populate('team.employeeId', { firstName: 1, lastName: 1 })
      .populate('tasks');
    return res.status(200).json({
      message: 'All Projects are:',
      data: allProjects,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: {},
      error: true,
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findOne({ _id: projectId })
      .populate('team.employeeId', { firstName: 1, lastName: 1 })
      .populate('tasks');
    if (project) {
      res.status(200).json({
        message: `Project with ID:${req.params.id} sent.`,
        data: project,
        error: false,
      });
    } else {
      res.status(404).json({
        message: `Project with ID:${req.params.id} not found`,
        data: {},
        error: true,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      data: {},
      error: true,
    });
  }
};

const pushEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.params) {
      return res.status(400).json({
        message: 'Missing ID parameter',
        data: {},
        error: true,
      });
    }

    const result = await Project
      .findByIdAndUpdate(id, { $push: { team: req.body } }, { new: true })
      .populate('team.employeeId', { firstName: 1, lastName: 1 })
      .populate('tasks');

    if (!result) {
      return res.status(404).json({
        message: `Project with ID:${req.params.id} not found`,
        data: {},
        error: true,
      });
    }

    return res.status(200).json({
      message: 'The employee was added successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: {},
      error: true,
    });
  }
};

const pushTask = async (req, res) => {
  try {
    const { id } = req.params;
    const taskId = req.body.task;
    if (!req.params) {
      return res.status(400).json({
        message: 'Missing ID parameter',
        data: {},
        error: true,
      });
    }

    const result = await Project
      .findByIdAndUpdate(id, { $push: { tasks: taskId } }, { new: true })
      .populate('team.employeeId', { firstName: 1, lastName: 1 })
      .populate('tasks');

    if (!result) {
      return res.status(404).json({
        message: `Project with ID:${req.params.id} not found`,
        data: {},
        error: true,
      });
    }

    return res.status(200).json({
      message: 'The task was added successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: {},
      error: true,
    });
  }
};

const updatePushedemployee = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.params) {
      return res.status(400).json({
        message: 'Missing ID parameter',
        data: {},
        error: true,
      });
    }

    // here goes result
    const result = await Project
      .updateOne({ _id: id, 'team.employeeId': req.body.employeeId }, { $set: { 'team.$': req.body } }, { new: true })
      .populate('team.employeeId', { firstName: 1, lastName: 1 })
      .populate('tasks');

    if (!result) {
      return res.status(404).json({
        message: `Project with ID:${req.params.id} not found`,
        data: {},
        error: true,
      });
    }

    return res.status(200).json({
      message: 'The employee was successfully updated',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: {},
      error: true,
    });
  }
};

const createProject = async (req, res) => {
  try {
    const project = new Project({
      name: req.body.name,
      description: req.body.description,
      clientName: req.body.clientName,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      team: req.body.team,
      tasks: req.body.tasks,
    });

    const result = await project.save();
    return res.status(201).json({
      message: 'Project has been created',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: {},
      error: true,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'Missing ID parameter',
        data: {},
        error: true,
      });
    }
    const result = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    )
      .populate('team.employeeId', { firstName: 1, lastName: 1 })
      .populate('tasks');

    if (!result) {
      return res.status(404).json({
        message: `Project with ID:${req.params.id} not found`,
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Project succesfully updated',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: {},
      error: true,
    });
  }
};

const pullEmployee = async (req, res) => {
  try {
    const { id, empid } = req.params;
    if (!req.params) {
      return res.status(400).json({
        message: 'Missing ID parameter',
        data: {},
        error: true,
      });
    }

    const result = await Project
      .findByIdAndUpdate(id, {
        $pull: { team: { employeeId: empid } },
      }, { new: true })
      .populate('team.employeeId', { firstName: 1, lastName: 1 })
      .populate('tasks');

    if (!result) {
      return res.status(404).json({
        message: `Project with ID:${req.params.id} not found`,
        data: {},
        error: true,
      });
    }

    return res.status(200).json({
      message: 'Employee succesfully updated',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: {},
      error: true,
    });
  }
};

const pullTask = async (req, res) => {
  try {
    const { id, taskid } = req.params;
    if (!req.params) {
      return res.status(400).json({
        message: 'Missing ID parameter',
        data: {},
        error: true,
      });
    }

    const result = await Project
      .findByIdAndUpdate(id, {
        $pullAll: { tasks: [{ _id: taskid }] },
      }, { new: true })
      .populate('team.employeeId', { firstName: 1, lastName: 1 })
      .populate('tasks');

    if (!result) {
      return res.status(404).json({
        message: `Project with ID:${req.params.id} not found`,
        data: {},
        error: true,
      });
    }

    return res.status(200).json({
      message: 'Task succesfully updated',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: {},
      error: true,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: 'Missing ID parameter',
        data: {},
        error: true,
      });
    }
    const result = await Project
      .findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true })
      .populate('team.employeeId', { firstName: 1, lastName: 1 })
      .populate('tasks');
    if (!result) {
      return res.status(404).json({
        message: `Project with ID:${req.params.id} not found`,
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Project successfully deleted',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: {},
      error: true,
    });
  }
};

export default {
  getAllProjects,
  getProjectById,
  pushEmployee,
  pushTask,
  updatePushedemployee,
  createProject,
  updateProject,
  pullEmployee,
  pullTask,
  deleteProject,
};
