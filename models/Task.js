import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  assignedVolunteer: { type: mongoose.Schema.Types.ObjectId, ref: 'Volunteer' },
  status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

export default Task;
