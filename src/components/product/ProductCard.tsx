"use client";

import { LuShoppingCart, LuEye } from "react-icons/lu";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/hooks/useCart";
import { Product } from "@/app/types";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const router = useRouter();

  const image = product.images[0].url;
  const { id, name, price, category } = product;

  console.log(image);
  

  const handleAddToCart = () => {
    // addToCart({
    //   id,
    //   name,
    //   price,
    //   image,
    //   category: category ?? "Uncategorized",
    // });
  };

  return (
    <div className="group rounded-lg border bg-[theme(--card)] text-[theme(--card-foreground)] shadow-sm overflow-hidden border-[theme(--border)]/40 hover:border-[theme(--primary)]/40 transition-all duration-300 hover:shadow-[theme(--card)]">
      <div className="p-0">
        {/* Image */}
        <div
          className="relative aspect-square overflow-hidden bg-[theme(--muted)]/30 cursor-pointer"
          //   onClick={() => navigate(`/product/${id}`)}
        >
          <Image
            src={`${image}`}
            alt={name}
            fill
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {category && (
            <span className="absolute top-2 left-2 px-3 py-1 text-xs font-medium bg-[theme(--primary)]/90 text-[theme(--primary-foreground)] rounded-full">
              {category}
            </span>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <button
              className="opacity-0 h-9 rounded-md px-3 group-hover:opacity-100 transition-opacity duration-300 bg-[theme(--secondary)] text-[theme(--secondary-foreground)] hover:bg-[theme(--secondary)]/80 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/product/${id}`);
              }}
            >
              <LuEye className="mr-2 h-4 w-4" />
              View Details
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-sm line-clamp-1">{name}</h3>
            <p className="text-lg font-bold text-[theme(--primary)] mt-1">
              ${price}
            </p>
          </div>

          <button
            className="w-full group/btn h-9 rounded-md px-3 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors bg-[theme(--primary)] text-[theme(--primary-foreground)] hover:bg-[theme(--primary)]/90 cursor-pointer"
            onClick={handleAddToCart}
          >
            <LuShoppingCart className="mr-2 h-4 w-4 transition-transform group-hover/btn:scale-110" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
