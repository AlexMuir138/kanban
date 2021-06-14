import mongoose, { Schema } from 'mongoose'
const CommentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    listId: { type: Schema.Types.ObjectId, ref: 'List', required: true },
    taskId: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
    creatorId: { type: String, required: true }
  },

  { timestamps: true, toJSON: { virtuals: true } }

)
export default CommentSchema
