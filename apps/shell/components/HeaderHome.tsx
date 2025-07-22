import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LoginButtons } from "./LoginButtons";

const HeaderHome: React.FC = () => (
  <header className="bg-black text-white p-5 flex flex-wrap justify-between items-center xl:px-28">
    <div className="flex flex-wrap items-center sm:gap-10">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="Bytebank"
          width={150}
          height={32}
          className="block sm:hidden h-6 w-auto"
          priority
        />
        <Image
          src="/favicon.svg"
          alt="Bytebank"
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
