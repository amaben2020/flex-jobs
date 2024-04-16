import { User } from "@clerk/nextjs/server";

export const isAdmin = (user: User) => {
  return user.publicMetadata?.role === "admin";
};
