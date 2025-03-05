import { NextResponse } from "next/server";

import Account from "@/database/account.model";
import { handleError } from "@/lib/handlers/error";
import { ForbiddenError, ValidationError } from "@/lib/http-errors";
import DBConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validations";

export async function GET() {
  try {
    await DBConnect();

    const accounts = await Account.find();

    return NextResponse.json(
      { success: true, data: accounts },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

// Create User
export async function POST(request: Request) {
  try {
    await DBConnect();
    const body = await request.json();
    const validateData = AccountSchema.safeParse(body);

    if (!validateData.success) {
      throw new ValidationError(validateData.error.flatten().fieldErrors);
    }

    const { provider, providerAccountId } = validateData.data;

    const existingAccount = await Account.findOne({
      provider,
      providerAccountId,
    });
    if (existingAccount) throw new ForbiddenError("Account already exists");

    const newAccount = await Account.create(validateData.data);

    return NextResponse.json(
      { success: true, data: newAccount },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
