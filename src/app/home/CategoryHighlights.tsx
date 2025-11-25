"use client"

import React from "react";

const CategoryHighlights = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          Shop by Category
        </h2>
        <p className="text-muted-foreground">Find exactly what you need</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { name: "Skincare", icon: "✨", filter: "Skincare" },
          { name: "Makeup", icon: "💄", filter: "Makeup" },
          { name: "Fragrance", icon: "🌸", filter: "Fragrance" },
          { name: "Tools", icon: "🖌️", filter: "Tools" },
        ].map((category) => (
          <a
            key={category.name}
            href={`/products?category=${category.filter}`}
            className="group p-6 rounded-lg hover:shadow-[theme(--card)] transition-all duration-300 text-center"
            style={{ backgroundImage: "var(--gradient-subtle)" }}
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
              {category.icon}
            </div>
            <h3 className="font-semibold">{category.name}</h3>
          </a>
        ))}
      </div>
    </section>
  );
};

export default CategoryHighlights;
