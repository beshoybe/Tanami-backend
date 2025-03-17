import { DataTypes, Model } from "sequelize";
import sequelize from "../config/dbConfig";
import UserInvestment from "./userInvestments.model";
import { Currency } from "../enums/currency.enum";

class ProjectedROI extends Model {
  public id!: string;
  public userInvestmentId!: string;
  public roi!: number; // Expected ROI percentage
  public createdAt!: Date;
  public initialInvestment!: number;
  public currency!: Currency ;
  public finalValue!: number;
  public date!: Date;

}

ProjectedROI.init(
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
    roi: {
      type: DataTypes.FLOAT, // Expected ROI
      allowNull: false,
    },
    initialInvestment: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    finalValue: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    currency: {
      type: DataTypes.ENUM("USD", "EUR", "GBP"),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
          const rawValue = this.getDataValue("date");
          if (!rawValue) return null; // ✅ Avoid error if null
          const parsedDate = new Date(rawValue);
          if (isNaN(parsedDate.getTime())) return null; // ✅ Avoid error for invalid date
          return parsedDate.toISOString().split("T")[0]; // ✅ "YYYY-MM-DD" format
      
      },
    },
  },
  {
    sequelize,
    modelName: "ProjectedROI",
    tableName: "projected_rois",
  }
);

// ✅ Association
// ✅ Avoid circular dependency by setting up associations separately
import("./userInvestments.model").then(({ default: UserInvestment }) => {
  ProjectedROI.belongsTo(UserInvestment, { foreignKey: "userInvestmentId" });
});
export default ProjectedROI;
