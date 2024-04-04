import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function GET() {
  const blob = await list();

  return NextResponse.json(blob);
}
