import mongoose, { Schema } from 'mongoose'
const CommentSchema = new mongoose.Schema(
  {
    body: { type: String, required: true },
    taskId: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
    creatorId: { type: String, required: true },
    email: { type: String, required: true },
    picture: { type: String, required: true }
  },

  { timestamps: true, toJSON: { virtuals: true } }

)
export default CommentSchema
