export  class ApiError extends Error {
    public readonly statusCode: number;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
      Error.captureStackTrace(this, this.constructor);
    }
  }

  
  export class EmailNotRegisteredError extends ApiError {
    constructor() {
      super("errors.emailNotRegistred", 404);
    }
  }

  export class InvalidPasswordError extends ApiError {
    constructor() {
        super("errors.invalidPassword", 401);
    }
}

export class EmailAlreadyExistsError extends ApiError {
    constructor() {
        super("errors.emailAlreadyExists", 403);
    }
}

export class InvalidOtpError extends ApiError {
    constructor() {
        super("errors.invalidOTP", 401);
    }
}

export class ExpiredOtpError extends ApiError {
    constructor() {
        super("errors.expiredOTP", 410);
    }
}

export class InvestmenNotFoundError extends ApiError {
    constructor() {
        super("errors.investmentNotFound", 404);
    }
}

export class PaymentNotFoundError extends ApiError {
    constructor() {
        super("errors.paymentNotFound", 404);
    }
}

export class PaymentAlreadyCompletedError extends ApiError {
    constructor() {
        super("errors.paymentAlreadyCompleted", 400);
    }
}

export class PaymentFailedError extends ApiError {

    constructor() {
        super("errors.paymentFailed", 400);
    }
}