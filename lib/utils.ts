import { clsx, type ClassValue } from "clsx";
import { scrypt } from "scrypt-js";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function hashPassword(password: string): Promise<string> {
  const passwordBytes = new TextEncoder().encode(password);

  const N = 16384; // Cost factor
  const r = 8;
  const p = 1;
  const dkLen = 32; // 256 bits

  const emptySalt = new Uint8Array(0);
  const derivedKey = await scrypt(passwordBytes, emptySalt, N, r, p, dkLen);

  return Array.from(derivedKey)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function formatCurrencyARS(value: string | Number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  }).format(Number(value));
}