import { NextResponse } from "next/server";

import Account from "@/database/account.model";
import { handleError } from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import DBConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const { providerId } = await request.json();

  try {
    await DBConnect();

    const validateData = AccountSchema.partial().safeParse({ providerId });

    if (!validateData.success)
      throw new ValidationError(validateData.error.flatten().fieldErrors);

    const account = await Account.findOne({ providerId });
    if (!account) throw new NotFoundError("Account");

    return NextResponse.json({ success: true, data: account }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
