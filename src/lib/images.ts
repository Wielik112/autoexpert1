import type { StaticImageData } from "next/image";
import baner from "@/assets/baner-warsztat.webp";
import czyszczenie from "@/assets/czyszczenie-silnika.webp";
import diagnostyka from "@/assets/diagnostyka-maska.webp";
import gadzety from "@/assets/gadzety-auto-expert.webp";
import hamulce from "@/assets/hamulce-tarcza.webp";
import lukasz from "@/assets/lukasz-auto-expert.webp";
import lukaszAvatar from "@/assets/lukasz-avatar.webp";
import mechanika from "@/assets/mechanika-silnik.webp";
import tester from "@/assets/tester-hella-gutmann.webp";
import olej from "@/assets/wymiana-oleju.webp";
import opony from "@/assets/wymiana-opon.webp";

export const images: Record<string, StaticImageData> = {
  "baner-warsztat": baner,
  "czyszczenie-silnika": czyszczenie,
  "diagnostyka-maska": diagnostyka,
  "gadzety-auto-expert": gadzety,
  "hamulce-tarcza": hamulce,
  "lukasz-auto-expert": lukasz,
  "lukasz-avatar": lukaszAvatar,
  "mechanika-silnik": mechanika,
  "tester-hella-gutmann": tester,
  "wymiana-oleju": olej,
  "wymiana-opon": opony,
};

export const img = (name: string) => images[name] ?? diagnostyka;
