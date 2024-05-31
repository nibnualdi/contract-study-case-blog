import { CreationOptional, DataTypes, Model, Optional, Sequelize } from "sequelize";
import sequelize from "../../config/connection";
import Files from "./files";

export type UsersAttributes = {
  id: CreationOptional<typeof DataTypes.UUID>;
  fullName: string;
  email: string;
  role: "Super Admin" | "Creator";
  password: string;
  status: "Active" | "Suspend";
  avatar: CreationOptional<typeof DataTypes.UUID>;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
  deletedAt: CreationOptional<Date>;
};

// put the attribute that's optional here
export type UsersCreationAttributes = Optional<
  UsersAttributes,
  "id" | "avatar" | "createdAt" | "updatedAt" | "deletedAt"
>;

class Users extends Model<UsersAttributes, UsersCreationAttributes> {
  declare id: CreationOptional<typeof DataTypes.UUID>;
  declare fullName: string;
  declare email: string;
  declare role: "Super Admin" | "Creator";
  declare password: string;
  declare status: "Active" | "Suspend";
  declare avatar: CreationOptional<typeof DataTypes.UUID>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;
}

Users.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    fullName: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.ENUM("Super Admin", "Creator"),
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Active", "Suspend"),
    },
    avatar: {
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
  {
    sequelize,
    modelName: "Users",
  }
);

Users.hasMany(Files, { foreignKey: "id", sourceKey: "avatar", onDelete: "CASCADE", as: "Avatar" });

export default Users;
