import React from "react";

const Testimonials = () => {
  return (
    <section className="bg-[theme(--muted)]/30 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            What Our Customers Say
          </h2>
          <p className="text-[theme(--muted-foreground)]">
            Real reviews from real people
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              text: "Best lipstick I've ever used! The color stays all day and feels amazing.",
              name: "Jane D.",
            },
            {
              text: "This serum transformed my skin in just 2 weeks. Absolutely love it!",
              name: "Sarah M.",
            },
            {
              text: "Premium quality products at great prices. Will definitely order again!",
              name: "Emily R.",
            },
          ].map((review, index) => (
            <div key={index} className="bg-card p-6 rounded-lg shadow-sm">
              <div className="text-primary mb-3">★★★★★</div>
              <p className="text-sm mb-4 italic">&quot;{review.text}&quot;</p>
              <p className="font-semibold text-sm">&ndash; {review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
