import { Response } from "express";

export function handleError(
  res: Response,
  error: any = "An unknown error has occurred.",
  code: number = 500
) {
  console.error(`${new Date()} ERROR ${code}: ${error}`);
  res.status(code).json({ error });
}
