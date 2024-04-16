import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";
import AdminNavbar from "./components/AdminNavbar";

export const metadata = {
  title: "Admin",
};
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <ClerkProvider>
      <AdminNavbar />
      {children}
    </ClerkProvider>
  );
};

export default Layout;
