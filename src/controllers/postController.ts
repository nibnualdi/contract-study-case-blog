import { Request, Response } from "express";
import Posts from "../db/models/posts";
import PostCategories, { PostCategoriesCreationAttributes } from "../db/models/postcategories";
import { NullishPropertiesOf } from "sequelize/types/utils";
import { AbstractDataTypeConstructor } from "sequelize";

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

export { create };
