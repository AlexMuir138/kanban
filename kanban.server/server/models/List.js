import mongoose, { Schema } from 'mongoose'
const ListSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    boardId: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
    creatorId: { type: String, required: true }
  },

  { timestamps: true, toJSON: { virtuals: true } }

)
export default ListSchema
