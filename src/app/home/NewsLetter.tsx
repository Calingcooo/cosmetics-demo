import React from "react";

const NewsLetter = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div
        className="max-w-2xl mx-auto text-center bg-[theme(--gradient-hero)] p-8 rounded-lg"
        style={{ backgroundImage: "var(--gradient-hero)" }}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Stay in the Glow
        </h2>
        <p className="text-[theme(--muted-foreground)] mb-6">
          Subscribe to get exclusive offers and beauty tips delivered to your
          inbox
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className=" bg-[theme(--muted)]/50 flex h-10 w-full rounded-md border border-input px-3 py-2 text-base ring-offset-[theme(--background)] file:border-0 file:bg-transparent placeholder:text-[theme(--muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[theme(--ring)] focus-visible:ring-offset-2 md:text-sm"
          />
          <button className="px-6 py-2 bg-[theme(--primary)] text-[theme(--primary-foreground)] rounded-md hover:bg-[theme(--primary)]/90 transition-colors font-medium">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
