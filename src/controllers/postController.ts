import { Request, Response } from "express";
import Posts from "../db/models/posts";
import PostCategories, { PostCategoriesCreationAttributes } from "../db/models/postcategories";
import { NullishPropertiesOf } from "sequelize/types/utils";
import { AbstractDataTypeConstructor } from "sequelize";
import Categories from "../db/models/categories";

type postCategory = Omit<
  PostCategoriesCreationAttributes,
  NullishPropertiesOf<PostCategoriesCreationAttributes>
>[];

const create = async (req: Request, res: Response) => {
  const title = req.body.title;
  const description = req.body.description;
  const status = req.body.status;
  const categoryId: AbstractDataTypeConstructor[] = req.body.categoryId;
  const slug = title.split(" ").join("-");
  const postCategoriesArr: postCategory = [];

  try {
    const post = await (
      await Posts.create({
        title,
        description,
        slug,
        status,
      })
    ).reload();

    categoryId.forEach((item) => {
      postCategoriesArr.push({ postId: post.id, categoryId: item });
    });

    await PostCategories.bulkCreate(postCategoriesArr);

    res.status(201).json({
      code: 201,
      message: "Data berhasil dibuat",
      data: post,
    });
  } catch (error) {
    res.json({ error });
  }
};

const getAll = async (req: Request, res: Response) => {
  const page: number = Number(req.query.page) || 1;
  const pageSize: number = Number(req.query.pageSize) || 2;
  const title: string = (req.query.title as string) || "";
  const category: string = (req.query.category as string) || "";
  const offset = (page - 1) * pageSize;

  try {
    const { rows } = await Posts.findAndCountAll({
      include: [
        {
          model: Categories,
          through: { where: { categoryId: category } },
        },
      ],
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

const getBySlug = async (req: Request, res: Response) => {
  const slug = req.params.slug;

  try {
    const post = await Posts.findOne({
      include: [
        {
          model: Categories,
        },
      ],
      where: { slug },
    });

    res.status(200).json({
      code: 200,
      message: "Data sudah diterima",
      data: post,
    });
  } catch (error) {
    res.json({ error });
  }
};

const getById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const post = await Posts.findOne({
      include: [
        {
          model: Categories,
        },
      ],
      where: { id },
    });

    res.status(200).json({
      code: 200,
      message: "Data sudah diterima",
      data: post,
    });
  } catch (error) {
    res.json({ error });
  }
};

const update = async (req: Request, res: Response) => {
  const id = req.params.id;
  const categoryIds: postCategory = req.body.categoryIds;
  const { title, description, status } = req.body;
  let obj: object = {};

  if (title) Object.assign(obj, { title });
  if (description) Object.assign(obj, { description });
  if (categoryIds.length) Object.assign(obj, { categoryIds });
  if (status) Object.assign(obj, { status });

  try {
    await Posts.update(obj, { where: { id } });
    const postUpdated = await Posts.findAll({ where: { id } });
    res.status(200).json({
      code: 200,
      message: "Data berhasil diperbarui",
      data: postUpdated,
    });
  } catch (error) {
    res.json({ error });
  }
};

const deleteData = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    await Posts.destroy({ where: { id } });
    res.status(200).json({
      code: 200,
      message: "Data berhasil dihapus",
    });
  } catch (error) {
    res.json({ error });
  }
};

export { create, getAll, getBySlug, getById, update, deleteData };
