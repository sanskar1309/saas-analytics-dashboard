import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { fetchUsers } from "@/services/api/users";
import type { UsersQueryParams } from "@/types/users";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const params: UsersQueryParams = {
    page:      Number(searchParams.get("page")     ?? 1),
    pageSize:  Number(searchParams.get("pageSize") ?? 10),
    search:    searchParams.get("search")  ?? "",
    plan:      (searchParams.get("plan")   ?? "All") as UsersQueryParams["plan"],
    sortBy:    (searchParams.get("sortBy") ?? "joinedAt") as UsersQueryParams["sortBy"],
    sortOrder: (searchParams.get("sortOrder") ?? "desc") as "asc" | "desc",
  };

  const data = await fetchUsers(params);
  return NextResponse.json(data);
}
