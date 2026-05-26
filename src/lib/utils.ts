import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isIOSSafari = () => {
  if (typeof navigator === "undefined") return false;
  return /iP(ad|hone|od).+Version\/[\d.]+.*Safari/i.test(navigator.userAgent);
};

export const isIPhone = () => {
  if (typeof navigator === "undefined") return false;
  return /iPhone/i.test(navigator.userAgent);
};


