import { CreationOptional, DataTypes, Model, Optional, Sequelize } from "sequelize";
import sequelize from "../../config/connection";
import Files from "./files";
import Categories from "./categories";
import PostCategories from "./postcategories";

export type PostsAttributes = {
  id: CreationOptional<typeof DataTypes.UUID>;
  title: string;
  description: typeof DataTypes.TEXT;
  thumbnail: CreationOptional<typeof DataTypes.UUID>;
  status: "Draft" | "Published";
  slug: string;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
  deletedAt: CreationOptional<Date>;
};

// put the attribute that's optional here
export type PostsCreationAttributes = Optional<
  PostsAttributes,
  "id" | "thumbnail" | "createdAt" | "updatedAt" | "deletedAt"
>;

class Posts extends Model<PostsAttributes, PostsCreationAttributes> {
  declare id: CreationOptional<typeof DataTypes.UUID>;
  declare title: string;
  declare description: typeof DataTypes.TEXT;
  declare thumbnail: CreationOptional<typeof DataTypes.UUID>;
  declare status: "Draft" | "Published";
  declare slug: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;
}

Posts.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING(128),
    },
    description: {
      type: DataTypes.TEXT,
    },
    thumbnail: {
      type: DataTypes.UUID,
    },
    status: {
      type: DataTypes.ENUM("Draft", "Published"),
    },
    slug: {
      type: DataTypes.STRING(128),
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
  { sequelize, modelName: "Posts" }
);

Posts.hasMany(Files, { foreignKey: "id", sourceKey: "thumbnail", onDelete: "CASCADE" });
Posts.belongsToMany(Categories, {
  through: PostCategories,
  foreignKey: "postId",
  otherKey: "categoryId",
});

export default Posts;
