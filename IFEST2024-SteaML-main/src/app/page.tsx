"use client";

import { Button } from "@/components/ui/button";
import useMe from "@/composable/Auth/query/useMe";
import { MeResponse } from "@/service/client/Auth/me.get";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const { data } = useMe();
  const [user, setUser] = useState<MeResponse | null>(null);
  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  return (
    <div className="p-10">
      Home page
      {user && (
        <div className="text-xl">
          <p>Welcome User {user.data.username}</p>
          <p>You logged in as {user.data.role}</p>
          <p>
            You're flag is <span className="font-bold">{user.data.flag}</span>
          </p>
        </div>
      )}
      <Link href="/auth/login">
        <Button>Login</Button>
      </Link>
    </div>
  );
}