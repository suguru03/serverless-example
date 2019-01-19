export class CustomError extends Error {
  statusCode = 500;
}

export class AuthError extends CustomError {
  statusCode = 401;
}
