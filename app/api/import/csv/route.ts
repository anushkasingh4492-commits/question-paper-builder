import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "CSV import API working",
  });
}