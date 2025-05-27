import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const clubCodes = {
  "aeromodelling": "aeromodelling",
  "automotiveclub": "automotive",
  "cimclub": "cim",
  "codingclub": "codingclub",
  "sa.esportz": "esportz",
  "fincom": "fincom",
  "club.iotacluster": "iotacluster",
  "monochromeclub": "monochrome",
  "robotics": "robotics",
  "softcom": "softcom",
  "zenithclub": "zenith",
  "meadityaraj0001": "meadityaraj0001",
  "2023meb1360": "2023meb1360",
  "2021ceb1007": "2021ceb1007",
  "gs.tech": "gs.tech",
  "2024epb1277": "2024epb1277"
}