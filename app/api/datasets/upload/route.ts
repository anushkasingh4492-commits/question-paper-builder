import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("Dataset received:", body);

    return NextResponse.json({
      success: true,
      message: "Dataset uploaded successfully",
    });
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}