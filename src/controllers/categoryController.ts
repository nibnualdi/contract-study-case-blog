import { Request, Response } from "express";
import Categories from "../db/models/categories";

const create = async (req: Request, res: Response) => {
  const title = req.body.title;
  try {
    const category = await (await Categories.create({ title })).reload();
    const id = category.dataValues.id;
    const deletedAt = category.dataValues.deletedAt;
    const updatedAt = category.dataValues.updatedAt;
    const createdAt = category.dataValues.createdAt;

    res.status(201).json({
      code: 201,
      message: "Data berhasil dibuat",
      data: {
        id,
        deletedAt,
        title,
        updatedAt,
        createdAt,
      },
    });
  } catch (error) {
    res.json({ error });
  }
};

const getAll = async (req: Request, res: Response) => {
  const page: number = Number(req.query.page) || 1;
  const pageSize: number = Number(req.query.pageSize) || 2;
  const title: string = (req.query.title as string) || "";
  const offset = (page - 1) * pageSize;

  try {
    const { rows } = await Categories.findAndCountAll({
      offset,
      limit: pageSize,
      where: title ? { title } : {},
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
    const category = await Categories.findAll({ where: { id } });

    res.status(200).json({
      code: 200,
      message: "Data sudah diterima",
      data: category[0],
    });
  } catch (error) {
    res.json({ error });
  }
};

const update = async (req: Request, res: Response) => {
  const id = req.params.id;
  const title = req.body.title;

  try {
    await Categories.update({ title }, { where: { id } });
    const categoryUpdated = await Categories.findAll({ where: { id } });

    res.status(200).json({
      code: 200,
      message: "Data berhasil diperbarui",
      data: categoryUpdated[0],
    });
  } catch (error) {
    res.json({ error });
  }
};

const deleteData = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    await Categories.destroy({ where: { id } });
    res.status(200).json({
      code: 200,
      message: "Data berhasil dihapus",
    });
  } catch (error) {
    res.json({ error });
  }
};

export { create, getAll, getById, update, deleteData };
