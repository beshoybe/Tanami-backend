import { DataTypes, Model } from "sequelize";
import sequelize from "../config/dbConfig";
import UserInvestment from "./userInvestments.model";

class Payment extends Model {
  public id!: string;
  public userInvestmentId!: string;
  public  amount!: number;
  public currency!: "USD" | "EUR" | "GBP";
  public status!: "pending" | "completed" | "failed";
  public retryCount!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Payment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userInvestmentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: UserInvestment, key: "id" },
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    currency: {
      type: DataTypes.ENUM("USD", "EUR", "GBP"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "completed", "failed"),
      defaultValue: "pending",
    },
    retryCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
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
    modelName: "Payment",
    tableName: "payment",
    defaultScope: {
      where: {
        deleted: false, // ✅ Global filter to exclude deleted investments
      },
    },
    scopes: {
      withDeleted: {}, // Allows fetching soft-deleted records explicitly
    },
    
  }
);

// ✅ Association
// ✅ Avoid circular dependency by setting up associations separately
import("./userInvestments.model").then(({ default: UserInvestment }) => {
  Payment.belongsTo(UserInvestment, { foreignKey: "userInvestmentId" });
});

export default Payment;
