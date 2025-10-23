import React from "react";

type HeaderProps = {
  title: string;
  subtitle: string;
};

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm text-[theme(--muted-foreground)]">{subtitle}</p>
    </div>
  );
};

export default Header;
