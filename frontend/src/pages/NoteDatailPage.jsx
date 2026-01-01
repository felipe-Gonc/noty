import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import api from "../lib/axios";
import { Link, useNavigate, useParams } from "react-router";

const NoteDatailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [save, setSave] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Erro na busca do post", error);
        toast.error("Falha ao buscar o post");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Você tem certeza de que deseja deletar o post?"))
      return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Post deletado");
      navigate("/");
    } catch (error) {
      console.log("Erro ao deletar post", error);
      toast.error("Falha ao deletar post");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  const handdleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Por favor add um título ou conteúdo");
      return;
    }

    setSave(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Post alterado com sucesso");

      navigate("/")
    } catch (error) {
      console.log("Erro ao alterar post", error);
      toast.error("Falha ao alterar post");
    } finally {
      save(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to={"/"} className="btn btn-ghost">
              <ArrowLeftIcon className="size-5" />
              Volta para posts
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="size-5" />
              Deletar post
            </button>
          </div>
          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-xl">Título</span>
                </label>
                <input
                  type="text"
                  placeholder="Título do post"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-xl">Conteúdo</span>
                </label>
                <textarea
                  placeholder="Sua próxima tarefa..."
                  className="textarea textarea-bordered h-32"
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                />
              </div>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={save}
                  onClick={handdleSave}
                >
                  {save ? "Salvando..." : "Salvar Alterações"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDatailPage;
