import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await prisma.dataset.create({
      data: {
        board:
          body.board ??
          body.collection?.curriculum ??
          "Unknown",

        class:
          body.class?.toString() ??
          body.collection?.class?.toString() ??
          "Unknown",

        subject:
          body.subject ??
          body.collection?.subject ??
          "Unknown",

        schema:
          body.schema_version ?? "1.0.0",

        questionCount:
          body.record_count ??
          body.records?.length ??
          0,
      },
    });

    return NextResponse.json({
      success: true,
    });

  } catch (e) {
    console.error(e);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}