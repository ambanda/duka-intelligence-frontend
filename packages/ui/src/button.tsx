import type { ButtonHTMLAttributes } from "react";

import { cn } from "./cn";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "quiet";
}

export function Button({ className, type = "button", variant = "primary", ...props }: ButtonProps) {
  return <button className={cn("duka-button", `duka-button--${variant}`, className)} type={type} {...props} />;
}
