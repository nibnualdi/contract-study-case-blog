import { CreationOptional, DataTypes, Model, Optional, Sequelize } from "sequelize";
import sequelize from "../../config/connection";
import Posts from "./posts";
import PostCategories from "./postcategories";

export type CategoriesAttributes = {
  id: CreationOptional<typeof DataTypes.UUID>;
  title: string;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
  deletedAt: CreationOptional<Date>;
};

// put the attribute that's optional here
export type CategoriesCreationAttributes = Optional<
  CategoriesAttributes,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
>;

class Categories extends Model<CategoriesAttributes, CategoriesCreationAttributes> {
  declare id: CreationOptional<typeof DataTypes.UUID>;
  declare title: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;
}

Categories.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING(128),
      allowNull: false,
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
  { sequelize, modelName: "Categories" }
);

export default Categories;
