"use client";
import { useSessionStore } from "@/store/sessionStore";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "./ui/button";

const publicPaths = [
  "/auth/log-in",
  "/auth/sign-up",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/verify-email",
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authenticated } = useSessionStore();
  const router = useRouter();
  const pathname = usePathname();
  const pathIsPublic = publicPaths.includes(pathname);
  const { onLogout } = useSessionStore();

  useEffect(() => {
    if (authenticated === null) {
      return;
    }

    if (!authenticated && !pathIsPublic) {
      router.replace("/auth/log-in");
    }

    if (authenticated && pathIsPublic) {
      router.replace("/my-businesses");
    }
  }, [authenticated, pathIsPublic, pathname, router]);

  return (
    <>
      <nav className="w-full top-0 left-0 flex justify-between items-center header">
        <div>
          <Link href={authenticated ? "/my-businesses" : "/"}>
            <h1 className="text-4xl font-extrabold">PadelPals</h1>
          </Link>
        </div>
        {authenticated === null ? (
          <></>
        ) : !authenticated ? (
          <div className="flex gap-x-5">
            <Link href="/auth/log-in" className="text-xl">
              Iniciar Sesión
            </Link>
            <Link href="/auth/sign-up" className="text-xl">
              Registrarse
            </Link>
          </div>
        ) : authenticated != null ? (
          <div className="flex gap-x-5">
            <Button onClick={onLogout} variant="ghost" className="text-xl">
              Salir
            </Button>
          </div>
        ) : null}
      </nav>
      {children}
    </>
  );
}
