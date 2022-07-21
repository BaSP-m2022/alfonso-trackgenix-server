import SuperAdmin from '../models/Superadmin';

const getAllSuperA = async (req, res) => {
  const { email } = req.query;
  try {
    const allSuperA = await SuperAdmin.find({
      email: { $regex: new RegExp(email || '', 'i') },
      isDeleted: { $ne: true },
    });
    if (allSuperA.length < 1) {
      return res.status(404).json({
        message: 'Admins has not been found',
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      message: 'All Superadmins are:',
      data: allSuperA,
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

const getSuperAById = async (req, res) => {
  try {
    const superAdmin = await SuperAdmin.findById(req.params.id);
    if (superAdmin) {
      return res.status(200).json({
        message: `Superadmin with ID:${req.params.id} sent.`,
        data: superAdmin,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Superadmin with ID:${req.params.id} not found`,
      data: {},
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: {},
      error: true,
    });
  }
};

const createSuperAdmin = async (req, res) => {
  try {
    const superAdmin = new SuperAdmin({
      email: req.body.email,
      password: req.body.password,
    });

    const result = await superAdmin.save();
    return res.status(201).json({
      message: 'Superadmin has been created',
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

const updateSuperAdmin = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'Missing ID parameter',
        data: {},
        error: true,
      });
    }
    const result = await SuperAdmin.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    if (!result) {
      return res.status(404).json({
        message: `Superadmin with ID:${req.params.id} not found`,
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Superadmin successfully updated',
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

const deleteSuperAdmin = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: 'Missing ID parameter',
        data: {},
        error: true,
      });
    }
    const result = await SuperAdmin
      .findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
    if (!result) {
      return res.status(404).json({
        message: `Superadmin with ID:${req.params.id} not found`,
        data: {},
        error: true,
      });
    } return res.status(200).json({
      message: 'Superadmin successfully deleted',
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
  getAllSuperA,
  getSuperAById,
  createSuperAdmin,
  updateSuperAdmin,
  deleteSuperAdmin,
};
