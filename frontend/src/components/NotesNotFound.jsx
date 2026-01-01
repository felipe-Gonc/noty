import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const NotesNotFound = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center py-16 space-y-6 mx-auto text-center">
        <div className="bg-primary/10 rounded-full p-8">
          <NotebookIcon className="size-10 text-primary" />
        </div>
        <h3 className="text-2xl font-bold">Nenhum post encontrado</h3>
        <p className="text-base-content/70">
          Preparado para organizar as suas tarefas? Crie seu primeiro post e
          inicie os seus trabalhos.
        </p>
        <Link to={"/create"} className="btn btn-primary">
          Crie seu primeiro post
        </Link>
      </div>
    </div>
  );
};

export default NotesNotFound;
