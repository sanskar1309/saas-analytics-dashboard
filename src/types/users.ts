export type Plan = "Free" | "Pro" | "Enterprise";
export type UserStatus = "active" | "inactive" | "churned";

export interface User {
  id: string;
  name: string;
  email: string;
  plan: Plan;
  status: UserStatus;
  mrr: number;
  joinedAt: string;
  lastActive: string;
  country: string;
  avatarInitials: string;
}

export interface UsersResponse {
  data: User[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface UsersQueryParams {
  page: number;
  pageSize: number;
  search: string;
  plan: Plan | "All";
  sortBy: keyof User;
  sortOrder: "asc" | "desc";
}
