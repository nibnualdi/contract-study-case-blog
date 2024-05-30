import { Request, Response } from "express";
import Posts from "../db/models/posts";
import PostCategories, { PostCategoriesCreationAttributes } from "../db/models/postcategories";
import { NullishPropertiesOf } from "sequelize/types/utils";
import { AbstractDataTypeConstructor } from "sequelize";
import Categories from "../db/models/categories";

const create = async (req: Request, res: Response) => {
  const title = req.body.title;
  const description = req.body.description;
  const status = req.body.status;
  const categoryId: AbstractDataTypeConstructor[] = req.body.categoryId;
  const slug = title.split(" ").join("-");
  const postCategoriesArr: Omit<
    PostCategoriesCreationAttributes,
    NullishPropertiesOf<PostCategoriesCreationAttributes>
  >[] = [];

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
    const { rows, count } = await Posts.findAndCountAll({
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
      message: `${count} data sudah diterima`,
      count: count,
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

export { create, getAll, getBySlug };
