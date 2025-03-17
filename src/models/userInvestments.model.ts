import { DataTypes, Model } from "sequelize";
import sequelize from "../config/dbConfig";
import User from "./user.model";
import Investment from "./investment.model";
import ProjectedROI from "./projectedROI.model";
import RealROI from "./realROI.model";
import Payment from "./payement.model";

class UserInvestment extends Model {
  public id!: string;
  public userId!: string;
  public investmentId!: string;
  public transactionAmount!: number;
  public currency!: "USD" | "EUR" | "GBP";
  public status!: "active" | "closed";
  public deleted!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
}

UserInvestment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: User, key: "id" },
    },
    investmentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Investment, key: "id" },
    },
    transactionAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    currency: {
      type: DataTypes.ENUM("USD", "EUR", "GBP"),
      allowNull: false,
      defaultValue: "USD",
    },
    status: {
      type: DataTypes.ENUM("active", "closed"),
      defaultValue: "active",
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
    modelName: "UserInvestment",
    defaultScope: {
      where: { deleted: false }, // ✅ Global filter to exclude deleted investments
    },
    scopes: {
      withDeleted: {}, // Allows fetching soft-deleted records explicitly
    },
    tableName: "user_investments",
  }
);

// ✅ Associations
UserInvestment.belongsTo(Investment, { foreignKey: "investmentId", as: "investment" }); // ✅ Investment Relation
UserInvestment.belongsTo(User, { foreignKey: "userId", as: "user" });

UserInvestment.hasOne(ProjectedROI, { foreignKey: "userInvestmentId", as: "projectedROI" });
UserInvestment.hasOne(RealROI, { foreignKey: "userInvestmentId", as: "realROI" });
UserInvestment.hasMany(Payment, { foreignKey: "userInvestmentId", as: "payments" });

export default UserInvestment;
