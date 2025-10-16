"use client";

import React from "react";

// Component: Single color block
const ColorBlock = ({ name, varName }: { name: string; varName: string }) => (
  <div className="flex items-center justify-between border rounded-lg p-4 bg-[theme(--card)] shadow-sm">
    <div className="flex items-center space-x-4">
      <div
        className="w-10 h-10 rounded-lg border"
        style={{ backgroundColor: `var(${varName})` }}
      />
      <span className="font-medium text-[theme(--foreground)]">{name}</span>
    </div>
    <span className="text-sm text-[theme(--muted-foreground)]">{varName}</span>
  </div>
);

// Component: Gradient block
const GradientBlock = ({
  name,
  varName,
}: {
  name: string;
  varName: string;
}) => (
  <div className="flex flex-col border rounded-lg overflow-hidden shadow-sm">
    <div className="h-16" style={{ backgroundImage: `var(${varName})` }}></div>
    <div className="p-3 flex justify-between items-center bg-[theme(--card)]">
      <span className="font-medium text-[theme(--foreground)]">{name}</span>
      <span className="text-sm text-[theme(--muted-foreground)]">
        {varName}
      </span>
    </div>
  </div>
);

const ThemePage = () => {
  const colorGroups = [
    {
      title: "Base",
      vars: [
        "--background",
        "--foreground",
        "--card",
        "--card-foreground",
        "--popover",
        "--popover-foreground",
      ],
    },
    {
      title: "Primary",
      vars: ["--primary", "--primary-foreground", "--primary-hover"],
    },
    {
      title: "Secondary",
      vars: ["--secondary", "--secondary-foreground"],
    },
    {
      title: "Accent",
      vars: ["--accent", "--accent-foreground"],
    },
    {
      title: "Muted",
      vars: ["--muted", "--muted-foreground"],
    },
    {
      title: "Destructive",
      vars: ["--destructive", "--destructive-foreground"],
    },
    {
      title: "Borders & Inputs",
      vars: ["--border", "--input", "--ring"],
    },
  ];

  const gradients = ["--gradient-primary", "--gradient-hero"];

  return (
    <main className="min-h-screen bg-[theme(--background)] p-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1
            className="text-4xl font-bold bg-clip-text text-transparent"
            style={{ backgroundImage: "var(--gradient-primary)" }}
          >
            Cosmetics Demo Design System
          </h1>
          <p className="text-[theme(--muted-foreground)] text-lg">
            Explore all theme tokens, colors, and gradients defined in your
            design system.
          </p>
        </header>

        {/* Color Groups */}
        <section className="space-y-10">
          {colorGroups.map((group) => (
            <div key={group.title}>
              <h2 className="text-2xl font-semibold mb-3 text-[theme(--foreground)]">
                {group.title}
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {group.vars.map((v) => (
                  <ColorBlock key={v} name={v.replace("--", "")} varName={v} />
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Gradient Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-3 text-[theme(--foreground)]">
            Gradients
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {gradients.map((v) => (
              <GradientBlock key={v} name={v.replace("--", "")} varName={v} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ThemePage;
