import { NextRequest, NextResponse } from "next/server";

export default function handleError(err: unknown) {
  console.error(err);
  if (err instanceof Error) {
    return NextResponse.json(
      { message: `Unknown error: ${err.message}` },
      { status: 500 }
    );
  } else {
    return NextResponse.json({ message: "Unknown error" }, { status: 500 });
  }
}
