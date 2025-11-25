import { useRouter } from "next/navigation";

export const EmptyCart = () => {
  const router = useRouter();

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="text-center max-w-md mx-auto space-y-4 px-4">
        <h1 className="text-3xl font-bold">Your Cart is Empty</h1>
        <p className="text-[theme(--muted-foreground)]">
          Add some beautiful products to get started!
        </p>
        <button
          className="h-11 rounded-md px-8 bg-[theme(--primary)] text-[theme(--primary-foreground)] hover:bg-[theme(--primary)]/90 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors cursor-pointer"
          onClick={() => router.push("/products")}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};