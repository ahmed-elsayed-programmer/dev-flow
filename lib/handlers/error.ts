import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { RequestError, ValidationError } from "../http-errors";
import logger from "../logger";

export type ResponseType = "api" | "server";

const formatRespose = (
  responseType: ResponseType,
  status: number,
  message: string,
  errors: Record<string, string[]> | undefined
) => {
  const responseContent = {
    success: false,
    error: {
      message,
      details: errors,
    },
  };

  return responseType === "api"
    ? NextResponse.json(responseContent, { status })
    : { status, ...responseContent };
};

export const handleError = (
  error: unknown,
  responseType: ResponseType = "server"
) => {
  if (error instanceof RequestError) {
    logger.error(
      { err: error },
      `${responseType.toUpperCase} Error: ${error.message}`
    );
    return formatRespose(
      responseType,
      error.statusCode,
      error.message,
      error.errors
    );
  }

  if (error instanceof ZodError) {
    const validationError = new ValidationError(
      error.flatten().fieldErrors as Record<string, string[]>
    );
    logger.error(
      { err: error },
      `ValidationError Error: ${validationError.message}`
    );
    return formatRespose(
      responseType,
      validationError.statusCode,
      validationError.message,
      validationError.errors
    );
  }

  if (error instanceof Error) {
    logger.error(error.message);
    return formatRespose(responseType, 500, error.message, undefined);
  }

  logger.error({ err: error }, "An unexpected error occurred");

  return formatRespose(
    responseType,
    500,
    "An unexpected error occurred",
    undefined
  );
};
