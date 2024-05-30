import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Users from "../db/models/users";

const generateToken = (data: {}) => {
  const privateKey = process.env.PRIVATE_KEY as string;
  const expiresIn = 3600000;
  const accessToken = jwt.sign(data, privateKey, { expiresIn });

  return { accessToken, expiresIn };
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ where: { email } });
    if (!user) throw "Email tidak ditemukan!";
    if (user?.password !== password) throw "Password salah!";
    const { password: passUser, ...rest } = user.dataValues;

    const { accessToken, expiresIn } = generateToken({
      id: user.id,
      fullName: user.fullName,
      role: user.role,
      status: user.status,
    });

    res.status(200).json({
      code: 200,
      message: "Berhasil masuk",
      accessToken: accessToken,
      expiresIn: expiresIn,
      tokenType: "Bearer",
      user: rest,
    });
  } catch (error) {
    res.json({ error });
  }
};

export { login };
