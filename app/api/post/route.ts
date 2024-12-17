import { executeQuery } from "@/lib/mysqlClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const typeParam = req.nextUrl.searchParams.get("type");
    const pathType = typeParam === "blog" ? "BLOG" : "ARTICLE";
    const sql = "SELECT * FROM Post WHERE type = ? ORDER BY post_id DESC";
    const result = await executeQuery(sql, [pathType]);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "unknown error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      subtitle,
      thumbnail,
      thumbnail_alt,
      content,
      status,
      createdAt,
      category_id,
      category_name,
      type,
    } = body;
    const values = [
      title,
      subtitle,
      thumbnail,
      thumbnail_alt,
      content,
      status,
      0,
      createdAt,
      category_id,
      category_name,
      type,
      false,
    ];
    const sql =
      "INSERT INTO Post (title,subtitle, thumbnail, thumbnail_alt, content, status, comments, createdAt, category_id, category_name, type, isUpdated) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
    const result = await executeQuery(sql, values);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "unknown error" }, { status: 500 });
  }
}
