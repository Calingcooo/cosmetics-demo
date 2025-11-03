import React from "react";

type TabHeaderProps = {
  title: string;
  subtitle: string;
};

const TabHeader: React.FC<TabHeaderProps> = ({ title, subtitle }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm text-[theme(--muted-foreground)]">{subtitle}</p>
    </div>
  );
};

export default TabHeader;
