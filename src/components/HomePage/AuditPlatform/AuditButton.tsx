import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "tertiary";
  pill?: boolean;
  large?: boolean;
  color?: string;
}

export default function AuditButton({
  children,
  onClick,
  size = "md",
  variant = "primary",
  className = "",
  pill = false,
  large = false,
  color = "theme",
  ...props
}: ButtonProps) {
  const base = "font-semibold font-sans transition duration-300 flex items-center justify-center transform hover:-translate-y-0.5 hover:shadow-md";
  const rounded = pill ? "rounded-full" : "rounded-lg";
  
  let sizeClass = "";
  if (large) {
    sizeClass = "text-lg px-8 py-3";
  } else if (size === "lg") {
    sizeClass = "lg:px-6 lg:py-3 px-4 py-2";
  } else if (size === "sm") {
    sizeClass = "px-3 py-1 text-sm";
  } else {
    sizeClass = "px-4 py-2";
  }

  let colorClass = "";
  if (variant === "primary") colorClass = `bg-primary text-white shadow-md hover:bg-primary/90`;
  if (variant === "secondary") colorClass = `bg-accent text-primary shadow-sm hover:bg-accent/85`;
  if (variant === "tertiary") colorClass = `text-gray-600 hover:text-gray-800`;

  return (
    <button
      onClick={onClick}
      className={`${base} ${rounded} ${sizeClass} ${colorClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
