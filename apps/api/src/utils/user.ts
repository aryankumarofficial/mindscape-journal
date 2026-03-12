import type { SafeUser, SelectUser } from "@repo/types/db"

export const generateSafeUser = (user: SelectUser):SafeUser=>{
  const safeUser: SafeUser = {
    id: user.id,
    email: user.email,
    name: user.name,
    isVerified: user.isVerified || false,
    createdAt: user.createdAt,
    updatedAt:user.updatedAt
  }

  return safeUser;
}
