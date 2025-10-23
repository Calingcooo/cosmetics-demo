"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { LuCheck, LuShoppingCart, LuArrowLeft } from "react-icons/lu";

import { useCart } from "@/app/hooks/useCart";
import { useProduct } from "@/app/hooks/useProduct";

import ProductPreview from "@/components/product/ProductPreview";

const ProductDetail = () => {
  const pathname = usePathname();
  const router = useRouter();
  const id = pathname?.split("/").pop();
  const { product, handleFetchSingleProduct } = useProduct();

  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedVariations, setSelectedVariations] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    if (id) handleFetchSingleProduct(id);
  }, [id, handleFetchSingleProduct]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      selectedVariations,
    });
  };

  if (!product) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <button
          onClick={() => router.push("/products")}
          className="inline-flex items-center justify-center gap-2 h-10 px-4 py-2 rounded-md text-sm font-medium ring-offset-[theme(--background)] transition-colors bg-[theme(--primary)] text-[theme(--primary-foreground)] hover:bg-[theme(--primary)]/90 cursor-pointer"
        >
          <LuArrowLeft className="mr-2 h-4 w-4" /> Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col container mx-auto px-4 py-8">
      {/* Back Button */}
      <div>
        <button
          onClick={() => router.push("/products")}
          className="mb-6 h-10 px-4 py-2 hover:bg-[theme(--accent)] hover:text-[theme(--accent-foreground)] inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-[theme(--background)] transition-colors cursor-pointer"
        >
          <LuArrowLeft className="mr-2 h-4 w-4" /> Back to Products
        </button>
      </div>

      {/* Product Detail Layout */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 animate-fade-in">
        {/* Product Image */}
        <div>
          <ProductPreview images={product.images} threshold={4} />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center space-y-6">
          <span className="inline-block w-fit px-4 py-1.5 text-sm font-medium bg-[theme(--primary)]/10 text-[theme(--primary)] rounded-full">
            {product.category}
          </span>

          <h1 className="text-4xl md:text-5xl font-bold">{product.name}</h1>

          <p className="text-3xl font-bold text-[theme(--primary)]">
            ₱{product.price}
          </p>

          <p className="text-[theme(--muted-foreground)] text-lg leading-relaxed">
            {product.description}
          </p>

          {/* Product Variations */}
          {product.variations && product.variations.length > 0 && (
            <div className="space-y-4">
              {product.variations.map((variation) => (
                <div key={variation.name} className="space-y-3">
                  <p className="text-sm font-medium">{variation.name}:</p>

                  <div className="flex flex-wrap gap-2">
                    {variation.options.map((option) => {
                      const isSelected =
                        selectedVariations[variation.name] === option.name;

                      return (
                        <div key={option.name} className="flex items-center">
                          <input
                            type="radio"
                            name={variation.name}
                            id={`${variation.name}-${option.name}`}
                            value={option.name}
                            checked={isSelected}
                            onChange={() =>
                              setSelectedVariations((prev) => ({
                                ...prev,
                                [variation.name]: option.name,
                              }))
                            }
                            className="peer sr-only"
                          />

                          <label
                            htmlFor={`${variation.name}-${option.name}`}
                            className={clsx(
                              "flex items-center justify-center gap-2 px-4 py-2 border rounded-md cursor-pointer transition-all hover:border-primary",
                              isSelected &&
                                !option.color &&
                                "bg-[theme(--primary)] text-[theme(--primary-foreground)]",
                              option.color && "relative"
                            )}
                            style={
                              option.color && isSelected
                                ? {
                                    backgroundColor: option.color,
                                    color: "#ffffff",
                                  }
                                : undefined
                            }
                          >
                            {option.color && (
                              <span
                                className="relative w-8 h-8 rounded-full border-2 border-[theme(--border)] flex items-center justify-center"
                                style={{ backgroundColor: option.color }}
                              >
                                {isSelected && (
                                  <LuCheck className="w-4 h-4 text-white" />
                                )}
                              </span>
                            )}
                            <span>{option.name}</span>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Quantity:</span>
            <div className="flex items-center border rounded-md">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="h-10 w-10 hover:bg-[theme(--accent)] hover:text-[theme(--accent-foreground)] inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors cursor-pointer"
              >
                -
              </button>
              <span className="px-6 py-2 font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="h-10 w-10 hover:bg-[theme(--accent)] hover:text-[theme(--accent-foreground)] inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="w-full md:w-auto h-11 rounded-md px-8 bg-[theme(--primary)] text-[theme(--primary-foreground)] hover:bg-[theme(--primary)]/90 inline-flex items-center justify-center gap-2 text-sm font-medium transition-colors cursor-pointer"
          >
            <LuShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
