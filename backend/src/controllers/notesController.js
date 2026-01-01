import Note from "../models/Note.js";

export async function getAllPosts(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // mostra o mais recente
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error em getAllPosts", error);
    res.status(500).json({ message: "Error interno" });
  }
}

export async function getPostByID(req, res) {
  try {
    const { id } = req.params;

    const post = await Note.findById(id);

    if (!post) return res.status(404).json({ message: "Post não encontrado." });

    res.json(post);
  } catch (error) {
    console.error("Error em getPostByID", error);
    res.status(500).json({ message: "Error interno" });
  }
}

export async function createPost(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });

    const saveNote = await note.save();
    res.status(201).json(saveNote);
  } catch (error) {
    console.error("Error em createPost", error);
    res.status(500).json({ message: "Error interno" });
  }
}

export async function updatePost(req, res) {
  try {
    const { title, content } = req.body;
    const updateNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      {
        new: true,
      }
    );

    if (!updateNote)
      return res.status(404).json({ message: "Post não encontrado." });

    res.status(200).json(updateNote);
  } catch (error) {
    console.error("Error em updatePost", error);
    res.status(500).json({ message: "Error interno" });
  }
}

export async function deletePost(req, res) {
  try {
    const deletePost = await Note.findByIdAndDelete(req.params.id);

    if (!deletePost)
      return res.status(404).json({ message: "Post não encontrado." });

    res.status(200).json(deletePost);
  } catch (error) {
    console.error("Error em deletePost", error);
    res.status(500).json({ message: "Error interno" });
  }
}
