import { NextResponse } from "next/server";
import { fetchAnalyticsData } from "@/services/api/analytics";

export async function GET() {
  const data = await fetchAnalyticsData();
  return NextResponse.json(data);
}
