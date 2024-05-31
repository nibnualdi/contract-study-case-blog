import { Request, Response } from "express";
import Users from "../db/models/users";
import Files from "../db/models/files";

const create = async (req: Request, res: Response) => {
  const fullName = req.body.fullName;
  const email = req.body.email;
  const password = req.body.newPassword;
  const confirmNewPassword = req.body.confirmNewPassword;
  const role = req.body.role;
  const status = req.body.status;
  if (!(password === confirmNewPassword)) {
    res.status(400).json({
      message: "Pastikan new password dan confirm new password sama!",
    });
    return;
  }

  try {
    const user = await (await Users.create({ fullName, email, password, role, status })).reload();

    res.status(201).json({
      code: 201,
      message: "Data berhasil dibuat",
      data: user,
    });
  } catch (error) {
    res.json({ error });
  }
};

const getAll = async (req: Request, res: Response) => {
  const page: number = Number(req.query.page) || 1;
  const pageSize: number = Number(req.query.pageSize) || 2;
  const fullName: string = (req.query.fullName as string) || "";
  const offset = (page - 1) * pageSize;

  try {
    const { rows } = await Users.findAndCountAll({
      include: {
        model: Files,
        as: "Avatar",
      },
      offset,
      limit: pageSize,
      where: fullName ? { fullName } : {},
    });

    res.status(200).json({
      code: 200,
      message: `${rows.length} data sudah diterima`,
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    res.json({ error });
  }
};

const getById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const user = await Users.findAll({
      include: {
        model: Files,
        as: "Avatar",
      },
      where: { id },
    });

    res.status(200).json({
      code: 200,
      message: "Data sudah diterima",
      data: user[0],
    });
  } catch (error) {
    res.json({ error });
  }
};

const update = async (req: Request, res: Response) => {
  const id = req.params.id;
  const {
    fullName,
    email,
    newPassword: password,
    confirmNewPassword,
    status,
    avatar,
    role,
  } = req.body;
  let obj: object = {};
  if (password) {
    if (password && confirmNewPassword) Object.assign(obj, { password });
  }
  if (fullName) Object.assign(obj, { fullName });
  if (email) Object.assign(obj, { email });
  if (status) Object.assign(obj, { status });
  if (avatar) Object.assign(obj, { avatar });
  if (role) Object.assign(obj, { role });

  if (password.length !== 0 || confirmNewPassword.length !== 0) {
    if (password !== confirmNewPassword) {
      res.status(400).json({
        message: "Pastikan new password dan confirm new password sama!",
      });
      return;
    }
    try {
      await Users.update(obj, { where: { id } });
      const userUpdated = await Users.findAll({
        where: { id },
      });
      const {
        id: idUpdated,
        fullName,
        email,
        role,
        status,
        avatar,
        createdAt,
        updatedAt,
        deletedAt,
      } = userUpdated[0] as Users;

      res.status(200).json({
        code: 200,
        message: "Data berhasil diperbarui",
        data: {
          id: idUpdated,
          fullName,
          email,
          role,
          status,
          avatar,
          createdAt,
          updatedAt,
          deletedAt,
        },
      });
    } catch (error) {
      res.json({ error });
    }
    return;
  }
  try {
    await Users.update(obj, { where: { id } });
    const userUpdated = await Users.findAll({
      where: { id },
    });
    const {
      id: idUpdated,
      fullName,
      email,
      role,
      status,
      avatar,
      createdAt,
      updatedAt,
      deletedAt,
    } = userUpdated[0] as Users;

    res.status(200).json({
      code: 200,
      message: "Data berhasil diperbarui",
      data: {
        id: idUpdated,
        fullName,
        email,
        role,
        status,
        avatar,
        createdAt,
        updatedAt,
        deletedAt,
      },
    });
  } catch (error) {
    res.json({ error });
  }
};

const deleteData = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    await Users.destroy({ where: { id } });
    res.status(200).json({
      code: 200,
      message: "Data berhasil dihapus",
    });
  } catch (error) {
    res.json({ error });
  }
};

export { create, getAll, getById, update, deleteData };
