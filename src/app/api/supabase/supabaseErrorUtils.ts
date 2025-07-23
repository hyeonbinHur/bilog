export enum ErrorCode {
  USER_NOT_FOUND = 4001,
  USER_ALREADY_EXISTS = 4002,
  INVALID_EMAIL = 4003,
  MISSING_REQUIRED_FIELDS = 4004,
  DATABASE_ERROR = 5001,
  NETWORK_ERROR = 5002,
  UNKNOWN_ERROR = 5000,
}

export class ApiError extends Error {
  public code: number;
  public statusCode: number;

  constructor(code: ErrorCode, message: string, statusCode: number = 500) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
  }
}
export function createErrorResponse(error: ApiError) {
  return Response.json(
    {
      error: {
        code: error.code,
        message: error.message,
      },
    },
    { status: error.statusCode }
  );
}
