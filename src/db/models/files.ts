import { CreationOptional, DataTypes, Model, Optional, Sequelize } from "sequelize";
import sequelize from "../../config/database";

type FilesAttributes = {
  id: CreationOptional<typeof DataTypes.UUID>;
  fileName: string;
  type: string;
  url: string;
  path: string;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
  deletedAt: CreationOptional<Date>;
};

// put the attribute that's optional here
type FilesCreationAttributes = Optional<
  FilesAttributes,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
>;

class Files extends Model<FilesAttributes, FilesCreationAttributes> {
  declare id: CreationOptional<typeof DataTypes.UUID>;
  declare fileName: string;
  declare type: string;
  declare url: string;
  declare path: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;
}

Files.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    fileName: {
      type: DataTypes.STRING(128),
    },
    type: {
      type: DataTypes.STRING(128),
    },
    url: {
      type: DataTypes.STRING(128),
    },
    path: {
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
  { sequelize, modelName: "Files" }
);

export default Files;
