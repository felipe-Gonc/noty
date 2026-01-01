import mongoose from "mongoose";

const nodeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // cria data, atualiza data
);

const Note = mongoose.model("NOTE", nodeSchema)

export default Note