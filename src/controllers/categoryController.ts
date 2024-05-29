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
  console.log(req.params,"get")

  try {
    const categories = await Categories.findAll();

    res.status(200).json({
      code: 200,
      message: `${categories.length} data sudah diterima`,
      count: categories.length,
      data: categories,
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

export { create, getAll, getById };
