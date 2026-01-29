import React from "react";
import clsx from "clsx";

type HeaderProps = {
  title: string;
  size?: "sm" | "md" | "lg";
};

const Header: React.FC<HeaderProps> = ({ title, size = "md" }) => {
  return (
    <div className="mb-8">
      <h2
        className={clsx("font-bold capitalize", {
          "text-xl md:text-2xl": size === "sm",
          "text-3xl md:text-4xl": size === "md",
          "text-5xl md:text-6xl": size === "lg",
        })}
      >
        {title}
      </h2>
    </div>
  );
};

export default Header;
