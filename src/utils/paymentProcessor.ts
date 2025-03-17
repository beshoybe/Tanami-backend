export async function processMockPayment(userId: number, amount: number) {
    try {
        console.log(`Processing payment for user ${userId}: $${amount}`);
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate processing delay
        console.log(`Payment successful for user ${userId}`);
    } catch (error) {
        console.error(`Payment failed for user ${userId}:`, error);
        throw new Error("Mock payment processing failed");
    }
}
