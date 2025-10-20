import clsx from "clsx";
import { LuX } from "react-icons/lu";
import type { ToastData, ToastVariant } from "@/app/context/ToastContext";

const ToastTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="text-sm font-semibold text-[theme(--card-foreground)]">
    {children}
  </div>
);

const ToastDescription: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="text-sm text-[theme(--muted-foreground)] leading-snug">
    {children}
  </div>
);

const ToastClose: React.FC<{
  onClose: () => void;
  variant: ToastVariant;
}> = ({ onClose, variant }) => (
  <button
    onClick={onClose}
    className={clsx(
      "absolute right-3 top-3 rounded-full p-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 cursor-pointer",
      {
        "text-[theme(--primary)] hover:text-[theme(--primary-hover)] focus:ring-[theme(--primary)]":
          variant === "default",
        "text-[theme(--destructive-foreground)] hover:text-white focus:ring-[theme(--destructive)]":
          variant === "destructive",
      }
    )}
  >
    <LuX className="h-4 w-4" />
  </button>
);

const Toast: React.FC<{ toast: ToastData; onClose: () => void }> = ({
  toast,
  onClose,
}) => {
  const { title, description, variant = "default", action } = toast;

  const toastClasses = clsx(
    // Layout
    "group relative flex w-full items-start gap-3 overflow-hidden rounded-[theme(--radius)] border p-4 shadow-lg",
    "animate-fade-in animate-slide-up transition-transform duration-300 ease-out",
    // Variant styles
    {
      // 🩰 Soft pastel default (Blush & Cream)
      "border-[theme(--border)] bg-[theme(--card)] text-[theme(--card-foreground)] shadow-[theme(--shadow-soft)]":
        variant === "default",

      // 💔 Destructive version — elegant red tone
      "border-[theme(--destructive)] bg-[theme(--destructive)] text-[theme(--destructive-foreground)]":
        variant === "destructive",
    }
  );

  return (
    <div className={toastClasses}>
      <div className="flex-1 grid gap-1">
        {title && <ToastTitle>{title}</ToastTitle>}
        {description && <ToastDescription>{description}</ToastDescription>}
      </div>

      {action && <div className="ml-2 flex items-center">{action}</div>}

      <ToastClose onClose={onClose} variant={variant} />
    </div>
  );
};

export default Toast;
