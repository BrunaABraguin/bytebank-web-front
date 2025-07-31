import Image from "next/image";

const services = ["Conta corrente", "Conta PJ", "Cartão de crédito"];
const contacts = [
  "0800 004 250 08",
  "meajuda@bytebank.com.br",
  "ouvidoria@bytebank.com.br",
];
const socialLinks = [
  {
    href: "https://instagram.com",
    src: "/instagram.svg",
    alt: "Instagram",
  },
  {
    href: "https://wa.me/",
    src: "/whatsapp.svg",
    alt: "WhatsApp",
  },
  {
    href: "https://youtube.com",
    src: "/youtube.svg",
    alt: "YouTube",
  },
];

const Footer: React.FC = () => (
  <footer className="bg-black text-white p-10 flex flex-wrap gap-10 justify-between text-base xl:px-28">
    <div className="flex flex-col gap-4">
      <h4 className="font-bold">Serviços</h4>
      {services.map((service) => (
        <p key={service}>{service}</p>
      ))}
    </div>
    <div className="flex flex-col gap-4">
      <h4 className="font-bold">Contato</h4>
      {contacts.map((contact) => (
        <p className="leading-7 [&:not(:first-child)]:mt-6" key={contact}>
          {contact}
        </p>
      ))}
    </div>
    <div className="flex flex-col gap-4">
      <h4 className="font-bold">Desenvolvido por Alura</h4>
      <Image
        src="/logo-white.svg"
        alt="Logo Bytebank"
        width={145}
        height={35}
        style={{ width: "auto", height: "auto" }}
      />
      <div className="flex gap-3 mt-2">
        {socialLinks.map(({ href, src, alt }) => (
          <a key={alt} href={href} target="_blank" rel="noopener noreferrer">
            <Image
              src={src}
              alt={alt}
              width={30}
              height={30}
              style={{ width: "auto", height: "auto" }}
            />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
