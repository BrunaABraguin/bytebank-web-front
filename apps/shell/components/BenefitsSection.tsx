import Image from "next/image";

const benefits = [
  {
    icon: "./gift.svg",
    title: "Conta e cartão gratuitos",
    desc: "Isso mesmo, nossa conta é digital, sem custo fixo e mais que isso: sem tarifa de manutenção.",
  },
  {
    icon: "./money.svg",
    title: "Saques sem custo",
    desc: "Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h.",
  },
  {
    icon: "./points.svg",
    title: "Programa de pontos",
    desc: "Você pode acumular pontos com suas compras no crédito sem pagar mensalidade!",
  },
  {
    icon: "./devices.svg",
    title: "Seguro Dispositivos",
    desc: "Seus dispositivos móveis (computador e laptop) protegidos por uma mensalidade simbólica.",
  },
];

export const BenefitsSection = () => {
  return (
    <section className="text-center py-10 xl:px-28">
      <h2 className="text-2xl font-bold mb-6">Vantagens do nosso banco:</h2>
      <div className="flex flex-wrap justify-center gap-6 px-4">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="text-gray-600 text-center max-w-xs text-md"
          >
            <Image
              src={benefit.icon}
              alt={benefit.title}
              width={73}
              height={56}
              className="mx-auto"
              style={{ width: "auto", height: "auto" }}
            />
            <h3 className="text-xl text-green mt-2 mb-1 font-bold">
              {benefit.title}
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-6 text-gray-medium">
              {benefit.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
