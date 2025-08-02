import { Loader } from "lucide-react";

export const Loading = () => {
    return (
      <output
        className="flex flex-col items-center justify-center h-full"
        aria-live="polite"
        aria-label="Carregando"
      >
        <Loader className="animate-spin text-green" size={24} />
        <p>Carregando...</p>
      </output>
    );
};
