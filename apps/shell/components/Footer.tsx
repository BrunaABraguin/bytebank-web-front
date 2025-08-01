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
    alt: "Visite nosso Instagram",
  },
  {
    href: "https://wa.me/",
    src: "/whatsapp.svg",
    alt: "Entre em contato pelo WhatsApp",
  },
  {
    href: "https://youtube.com",
    src: "/youtube.svg",
    alt: "Acesse nosso canal no YouTube",
  },
];

const Footer: React.FC = () => (
  <footer
    className="bg-black text-white p-10 flex flex-wrap gap-10 justify-between text-base xl:px-28"
    aria-label="Rodapé do site"
  >
    <nav className="flex flex-col gap-4" aria-label="Serviços oferecidos">
      <h4 className="font-bold">Serviços</h4>
      <ul>
        {services.map((service) => (
          <li key={service}>
            <p>{service}</p>
          </li>
        ))}
      </ul>
    </nav>
    <nav className="flex flex-col gap-4" aria-label="Informações de contato">
      <h4 className="font-bold">Contato</h4>
      <ul>
        {contacts.map((contact) => (
          <li
            className="leading-7 [&:not(:first-child)]:mt-6"
            key={contact}
          >
            <p>{contact}</p>
          </li>
        ))}
      </ul>
    </nav>
    <div className="flex flex-col gap-4">
      <h4 className="font-bold">Desenvolvido por Alura</h4>
      <Image
        src="/logo-white.svg"
        alt="Logo Bytebank"
        width={145}
        height={35}
        style={{ width: "auto", height: "auto" }}
      />
      <nav className="flex gap-3 mt-2" aria-label="Redes sociais">
        {socialLinks.map(({ href, src, alt }) => (
          <a
            key={alt}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={alt}
          >
            <Image
              src={src}
              alt={alt}
              width={30}
              height={30}
              style={{ width: "auto", height: "auto" }}
            />
          </a>
        ))}
      </nav>
    </div>
  </footer>
);

export default Footer;
