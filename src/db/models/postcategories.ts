import { CreationOptional, DataTypes, Model, Optional, Sequelize } from "sequelize";
import sequelize from "../../config/connection";

type PostCategoriesAttributes = {
  id: CreationOptional<typeof DataTypes.UUID>;
  postId: typeof DataTypes.UUID;
  categoryId: typeof DataTypes.UUID;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
  deletedAt: CreationOptional<Date>;
};

// put the attribute that's optional here
type PostCategoriesCreationAttributes = Optional<
  PostCategoriesAttributes,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
>;

class PostCategories extends Model<PostCategoriesAttributes, PostCategoriesCreationAttributes> {
  declare id: CreationOptional<typeof DataTypes.UUID>;
  declare postId: typeof DataTypes.UUID;
  declare categoryId: typeof DataTypes.UUID;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;
}

PostCategories.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    postId: {
      type: DataTypes.UUID,
    },
    categoryId: {
      type: DataTypes.UUID,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  { sequelize, modelName: "PostCategories" }
);

export default PostCategories;
