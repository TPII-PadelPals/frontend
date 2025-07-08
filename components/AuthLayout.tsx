"use client";
import { useSessionStore } from "@/store/sessionStore";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const publicPaths = [
  "/auth/log-in",
  "/auth/sign-up",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/verify-email",
  "/",
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

  if (authenticated === null || (!authenticated && !pathIsPublic)) {
    return null;
  }

  if (pathIsPublic && !authenticated) {
    return (
      <div className="min-h-screen flex">
        {/* Lado izquierdo - Imagen/Branding */}
        <div className="hidden lg:flex lg:w-1/2 relative">
          <Image
            src="/image.png"
            width={500}
            height={500}
            alt="Picture of the author"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Lado derecho - Formulario */}
        <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-8 bg-slate-50">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    );
  }

  if (pathIsPublic === false && authenticated) {
    return (
      <>
        <nav className="w-full top-0 left-0 flex justify-between items-center header">
          <div>
            <h1 className="text-4xl font-extrabold">Padel Pals</h1>
          </div>
          {authenticated && (
            <div className="flex gap-x-5">
              <button
                onClick={() => useSessionStore.getState().onLogout()}
                className="text-xl hover:text-gray-600 transition-colors"
              >
                Salir
              </button>
            </div>
          )}
        </nav>
        {children}
      </>
    );
  }

  return null;
}
