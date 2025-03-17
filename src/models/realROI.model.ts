import { DataTypes, Model } from "sequelize";
import sequelize from "../config/dbConfig";
import UserInvestment from "./userInvestments.model";

class RealROI extends Model {
  public id!: string;
  public userInvestmentId!: string;
  public initialInvestment!: number;
  public finalValue!: number;
  public roi!: number; // Actual ROI based on real performance
}

RealROI.init(
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
    initialInvestment: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    finalValue: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    roi: {
      type: DataTypes.FLOAT, // Computed using the real formula
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "RealROI",
    tableName: "real_rois",
  }
);

// ✅ Association
// ✅ Avoid circular dependency by setting up associations separately
import("./userInvestments.model").then(({ default: UserInvestment }) => {
  RealROI.belongsTo(UserInvestment, { foreignKey: "userInvestmentId" });
});

export default RealROI;
