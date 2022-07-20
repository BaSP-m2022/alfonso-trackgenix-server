import mongoose from 'mongoose';

const { Schema } = mongoose;

const employeeSchema = new Schema(
  {
    firebaseUid: { type: String, required: true },
    firstName: {
      type: String,
      required: true,
      minlength: 3,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: false,
      enum: ['Male', 'Female', 'Other'],
    },
    address: {
      type: String,
      required: false,
    },
    dob: {
      type: Date,
      required: false,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    phone: {
      type: String,
      required: false,
      minlength: 9,
    },
    active: {
      type: Boolean,
      default: true,
    },
    associatedProjects: [
      {
        _id: false,
        projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
        role: { type: String, enum: ['QA', 'DEV', 'TL', 'PM', '-'] },
        rate: { type: Number },
        isPM: { type: Boolean, default: false },
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Employee', employeeSchema);
