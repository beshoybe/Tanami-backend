import { DataTypes, Model, Optional } from "sequelize";
import bcrypt from "bcryptjs";
import sequelize from "../config/dbConfig";

export enum UserType {
  ADMIN = "admin",
  USER = "user",
}


// Define attributes interface
interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  active: boolean;
  deleted: boolean;
  verified: boolean;
  otp?: string | null;
  otpExpires?: Date | null;
  type: UserType;
  createdAt: Date;
  updatedAt: Date;
}

// Define creation attributes (optional fields during creation)
interface UserCreationAttributes extends Optional<UserAttributes, "id" | "otp" | "otpExpires" | "createdAt" | "updatedAt"> {}

// Extend Sequelize Model

class User extends Model<UserAttributes, UserCreationAttributes> {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public active!: boolean;
  public deleted!: boolean;
  public verified!: boolean;
  public otp?: string | null;
  public otpExpires?: Date | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Instance Methods
  public async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  public async deleteUser(): Promise<this> {
    this.deleted = true;
    this.active = false;
    return this.save();
  }
}

// Define the model with schema
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "unique_email_constraint",
      validate: { isEmail: true },
    },
    password: { type: DataTypes.STRING, allowNull: false },
    active: { type: DataTypes.BOOLEAN, defaultValue: true },
    deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    verified: { type: DataTypes.BOOLEAN, defaultValue: false },
    otp: { type: DataTypes.STRING, allowNull: true },
    otpExpires: { type: DataTypes.DATE, allowNull: true },
    type: { type: DataTypes.ENUM(UserType.ADMIN, UserType.USER), defaultValue: UserType.USER },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },

  },
  {
    sequelize,
    tableName: "users",
    defaultScope: {
      where: {
        deleted: false, // ✅ Global filter to exclude deleted investments
      },
    },
    scopes: {
      withDeleted: {}, // Allows fetching soft-deleted records explicitly
    },
    timestamps: true,
    hooks: {
      beforeCreate: async (user: User) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 12);
        }
      },
      beforeUpdate: async (user: User) => {
        if (user.changed("password")) {
          user.password = await bcrypt.hash(user.password, 12);
        }
      },
    },
  }
);


export default User;
