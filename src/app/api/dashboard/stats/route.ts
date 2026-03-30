import { NextResponse } from "next/server";
import { fetchDashboardStats } from "@/services/api/dashboard";

export async function GET() {
  const data = await fetchDashboardStats();
  return NextResponse.json(data);
}
