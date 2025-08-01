import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LoginButtons } from "./LoginButtons";

const HeaderHome: React.FC = () => (
  <header
    className="bg-black text-white p-5 flex flex-wrap justify-between items-center xl:px-28"
    role="banner"
  >
    <div className="flex flex-wrap items-center sm:gap-10">
      <Link href="/" aria-label="Ir para a página inicial">
        <Image
          src="/logo.svg"
          alt="Logotipo do Bytebank"
          width={150}
          height={32}
          className="block sm:hidden h-6 w-auto"
          priority
        />
        <Image
          src="/favicon.svg"
          alt="Ícone do Bytebank"
          width={32}
          height={32}
          className="block lg:hidden max-sm:hidden"
          style={{ width: "auto", height: "auto" }}
        />
      </Link>
    </div>
    <LoginButtons />
  </header>
);

export default HeaderHome;
