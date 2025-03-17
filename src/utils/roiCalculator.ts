function calculateROI(initialInvestment: number, expectedMonthlyReturn: number): { futureValue: number; roiPercentage: number } {
    // Convert percentage to decimal
    const monthlyRate = expectedMonthlyReturn / 100;
  
    // Calculate future value after 12 months
    const futureValue = initialInvestment * Math.pow(1 + monthlyRate, 12);
  
    // Calculate ROI percentage
    const roiPercentage = ((futureValue - initialInvestment) / initialInvestment) * 100;
  
    return { futureValue, roiPercentage };
  }

  export { calculateROI };
