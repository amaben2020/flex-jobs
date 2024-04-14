"use client";
import { cn } from "@/lib/utils";
import { Loader, Loader2 } from "lucide-react";
import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

const LoadingButton = ({
  className,
  children,
  loading,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { loading: boolean }) => {
  return (
    <Button {...props} className={cn("mt-4 w-full", className)}>
      <span className="flex items-center gap-x-2">
        <p> {children} </p>
        {loading && <Loader size={16} className="animate-spin" />}
      </span>
    </Button>
  );
};

export default LoadingButton;
