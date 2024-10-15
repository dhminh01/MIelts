import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-y-4">
      <h1
        className={cn(
          "text-3xl font-semibold text-center text-primary/50",
          font.className
        )}
      >
        MIelts Application
      </h1>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
};
