import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@bytebank-web/ui/button";

const NotFoundSection: React.FC = () => {
  const router = useRouter();
  return (
    <section className="bg-gradient-to-b from-green-dark to-white text-center items-center flex flex-col justify-center min-h-screen pt-6">
      <h1 className="text-2xl font-bold text-black mb-4">
        Ops! Não encontramos a página...
      </h1>
      <div className="w-96 max-sm:w-2xs line-clamp-2 max-sm:line-clamp-3">
        <p className="text-black">
          E olha que exploramos o universo procurando por ela! Que tal voltar e
          tentar novamente?
        </p>
      </div>
      <Button className="mt-4" color="orange" onClick={() => router.push("/")}>
        Voltar ao início
      </Button>
      <Image
        src="/not-found.svg"
        alt="Página não encontrada"
        width={470}
        height={354}
        className="mt-10 mx-auto"
        style={{ width: "auto", height: "auto" }}
      />
    </section>
  );
};

export default NotFoundSection;
