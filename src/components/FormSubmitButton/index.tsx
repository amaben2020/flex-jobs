"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

const FormSubmitButton = ({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { pending } = useFormStatus();

  return (
    <Button {...props} type="submit" className={cn("mt-4 w-full", className)}>
      {children}
      {pending && <Loader2 size={16} className="animate-spin" />}
    </Button>
  );
};

export default FormSubmitButton;
