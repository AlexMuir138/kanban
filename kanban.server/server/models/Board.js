import mongoose from 'mongoose'
const BoardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    creatorId: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }

)
export default BoardSchema
