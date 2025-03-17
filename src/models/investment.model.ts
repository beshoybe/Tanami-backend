import { DataTypes, Model } from "sequelize";
import sequelize from "../config/dbConfig";

class Investment extends Model {
  public id!: string;
  public name!: string;
  public description!: string;
  public annualExpectedReturn!: number;
  public active!: boolean;
  public deleted!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Investment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    monthlyExpectedReturn: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Investment",
    defaultScope: {
      where: {
        deleted: false, // ✅ Global filter to exclude deleted investments
      },
    },
    scopes: {
      withDeleted: {}, // Allows fetching soft-deleted records explicitly
    },
    tableName: "investments",
  }
);

// ✅ Avoid circular dependency by setting up associations separately
import("./userInvestments.model").then(({ default: UserInvestment }) => {
  Investment.hasMany(UserInvestment, {
    foreignKey: "investmentId",
    onDelete: "CASCADE",
  });
});

export default Investment;
