import mongoose, { Schema } from 'mongoose'
const TaskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    listId: { type: Schema.Types.ObjectId, ref: 'List', required: true },
    creatorId: { type: String, required: true },
    email: { type: String, required: true },
    picture: { type: String, required: true }
  },

  { timestamps: true, toJSON: { virtuals: true } }

)
export default TaskSchema
