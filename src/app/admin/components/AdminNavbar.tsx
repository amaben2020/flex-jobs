"use client";
import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AdminNavbar = () => {
  const router = useRouter();
  const { user, signOut } = useClerk();
  return (
    <nav className="flex items-center justify-between px-3">
      <Link href="/admin">Admin Dashboard</Link>

      <span>
        {user?.primaryEmailAddress?.emailAddress
          ? user.primaryEmailAddress.emailAddress
          : ""}
      </span>

      <Button
        onClick={async () => {
          await signOut();
          router.push("/");
        }}
      >
        Log Out
      </Button>
    </nav>
  );
};

export default AdminNavbar;
