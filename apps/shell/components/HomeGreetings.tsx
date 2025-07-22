import Image from "next/image";

export const HomeGreetings: React.FC = () => {
  return (
    <main className="flex xl:flex-row flex-wrap justify-between items-center xl:px-28 px-5 py-10">
      <div className="flex-1 mb-8 xl:mb-0 line-clamp-3 max-sm:line-clamp-4">
        <p className="font-semibold text-black md:text-3xl text-2xl text-left max-lg:text-center max-w-lg">
          Experimente mais liberdade no controle da sua vida financeira. Crie
          sua conta com a gente!
        </p>
      </div>
      <div className="flex-1 text-center">
        <Image
          src="/illustration.svg"
          alt="Gráfico e pessoa"
          width={660}
          height={412}
          className="xl:w-[660px] md:w-[600px] sm:w-[312px] w-full h-auto mx-auto"
          style={{
            width: "auto",
            height: "auto",
            maxWidth: "100%",
          }}
        />
      </div>
    </main>
  );
};
