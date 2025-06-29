import { User } from "@repo/types";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

import { useEffect, useState } from "react";

export default function Index() {
  const [data, setData] = useState<User[] | null>(null);

  useEffect(() => {
    fetcher("/api/users").then(setData);
  }, []);

  if (!data) return null;

  return (
    <ul>
      {data.map((user) => (
        <li key={user._id}>
          <Link href="/user/[id]" as={`/user/${user._id}`}>
            {user.name ?? `User ${user._id}`}
          </Link>
        </li>
      ))}
    </ul>
  );
}
