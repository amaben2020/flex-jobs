import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({});

export const config = {
  // hey, any route with /admin must be authenticated
  matcher: ["/(admin)(.*)"],
};
