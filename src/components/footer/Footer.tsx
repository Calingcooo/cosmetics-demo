import Link from "next/link";
import { LuInstagram, LuFacebook, LuTwitter } from "react-icons/lu";

const Footer = () => {
  return (
    <footer className="border-t bg-[theme(--muted)]/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3
              className="text-2xl font-bold bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--gradient-primary)" }}
            >
              Demo
            </h3>
            <p className="text-sm text-[theme(--muted-foreground)]">
              Luxury cosmetics for the modern woman. Crafted with care, designed
              with elegance.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-[theme(--muted-foreground)] hover:text-[theme(--primary)] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-[theme(--muted-foreground)] hover:text-[theme(--primary)] transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[theme(--muted-foreground)] hover:text-[theme(--primary)] transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="font-semibold">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-[theme(--muted-foreground)] hover:text-[theme(--primary)] transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[theme(--muted-foreground)] hover:text-[theme(--primary)] transition-colors"
                >
                  Shipping Info
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[theme(--muted-foreground)] hover:text-[theme(--primary)] transition-colors"
                >
                  Returns
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-[theme(--muted-foreground)] hover:text-[theme(--primary)] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-[theme(--muted-foreground)] hover:text-[theme(--primary)] transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="font-semibold">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-[theme(--muted-foreground)] hover:text-[theme(--primary)] transition-colors"
              >
                <LuInstagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-[theme(--muted-foreground)] hover:text-[theme(--primary)] transition-colors"
              >
                <LuFacebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-[theme(--muted-foreground)] hover:text-[theme(--primary)] transition-colors"
              >
                <LuTwitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-[theme(--muted-foreground)]">
          <p>© 2025 E-commerce demo. All rights reserved.</p>
          <p>
            Developed by{" "}
            <a
              target="_blank"
              href="https://my-portfolio-v2-jade.vercel.app"
              className="text-blue-500 hover:text-blue-600 underline-offset-2 hover:underline"
            >
              Jhon Edmir Calingco
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
