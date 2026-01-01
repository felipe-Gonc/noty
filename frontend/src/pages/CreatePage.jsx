import { Link, useNavigate } from "react-router";
import { useState } from "react";
import toast from "react-hot-toast";

import { ArrowLeftIcon } from "lucide-react";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const hendleSubmit =  async(e) => {
    e.preventDefault();

    if(!title.trim() || !content.trim()) {
      toast.error("Todos os campos são obrigatórios.")
      return
    }
    
    setLoading(true)

    try {
      await api.post("/notes",{
        title,
        content
      })
      toast.success("Post criado com sucesso.");
      navigate("/")
    } catch (error) {
      console.log("Erro ao criar novo post.",error)
      if(error.response.status == 429){
        toast.error("Diminua a velocidade! Você está criando posts muito rápido.",{
          duration: 4000,
          icon: "💀"
        })
      }
    } finally{
      setLoading(false)
    }

  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Voltar
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Criar novo post</h2>
              <form onSubmit={hendleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Título</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Título do post"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Conteúdo</span>
                  </label>
                  <textarea
                    placeholder="Sua proxiam tarefa..."
                    className="textarea textarea-bordered h-32"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Criando..." : "Criar post"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
