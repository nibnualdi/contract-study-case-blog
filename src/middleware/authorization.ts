import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

type JwtCustomTypes = {
  id?: string;
  role?: string | undefined;
} & JwtPayload;

const creatorAndSuperAdminOnly = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) throw "Izin dibutuhkan!!";
  const accessToken = req.headers.authorization.split(" ")[1];
  const privateKey: string = process.env.PRIVATE_KEY as string;

  try {
    const jwtRes = jwt.verify(accessToken, privateKey) as JwtCustomTypes;
    if (jwtRes.role !== "Creator" && jwtRes.role !== "Super Admin") throw "Izin dibutuhkan!!";
    next();
  } catch (error) {
    res.status(403).json({ error });
  }
};

const superAdminOnly = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) throw "Izin dibutuhkan!!";
  const accessToken = req.headers.authorization.split(" ")[1];
  const privateKey: string = process.env.PRIVATE_KEY as string;

  try {
    const jwtRes = jwt.verify(accessToken, privateKey) as JwtCustomTypes;
    if (jwtRes.role !== "Super Admin") throw "Izin dibutuhkan!!";
    next();
  } catch (error) {
    res.status(403).json({ error });
  }
};

const idTokentoReqParamsId = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) throw "Izin dibutuhkan!!";
  const accessToken = req.headers.authorization.split(" ")[1];
  const privateKey: string = process.env.PRIVATE_KEY as string;

  try {
    const jwtRes = jwt.verify(accessToken, privateKey) as JwtCustomTypes;
    if (!jwtRes.id) throw "Tidak dapat akses profile!!";
    req.params.id = jwtRes.id;
    next();
  } catch (error) {
    res.status(403).json({ error });
  }
};

export { creatorAndSuperAdminOnly, superAdminOnly, idTokentoReqParamsId };
