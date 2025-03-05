import { NextResponse } from "next/server";

import Account from "@/database/account.model";
import { handleError } from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import DBConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validations";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) throw new NotFoundError("Account");

  try {
    await DBConnect();

    const account = await Account.findById(id);

    if (!account) throw new NotFoundError("Account");

    return NextResponse.json({ success: true, data: account }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) throw new NotFoundError("Account");

  try {
    await DBConnect();

    const account = await Account.findByIdAndDelete(id);

    return NextResponse.json({ success: true, data: account }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) throw new NotFoundError("Account");

  try {
    await DBConnect();

    const body = await request.json();

    const validateData = AccountSchema.partial().safeParse(body);

    if (!validateData.success)
      throw new ValidationError(validateData.error.flatten().fieldErrors);

    const updatedAccount = Account.findByIdAndUpdate(id, validateData, {
      new: true,
    });

    if (!updatedAccount) throw new NotFoundError("Account");

    return NextResponse.json(
      { success: true, data: updatedAccount },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
