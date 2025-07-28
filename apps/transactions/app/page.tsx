"use client";
import { useSharedStore } from "@workspace/store";

export default function Dashboard() {
  const { email } = useSharedStore();

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 w-full">
      <div className="grid col-span-1 lg:col-span-4 gap-5">
        {email}
      </div>
    </div>
  );
}
