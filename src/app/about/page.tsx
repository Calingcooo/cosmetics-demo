import Image from "next/image";
import aboutBanner from "../../../public/assets/products/about-banner.jpg";

const AboutPage = () => {
  return (
    <div className="flex flex-1 flex-col">
      {/* Banner */}
      <section className="relative h-[300px] md:h-[400px] overflow-hidden">
        <Image
          src={aboutBanner}
          alt="About E-Commerce Demo"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[theme(--background)]/20 to-[theme(--background)]/80 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <h1 className="text-4xl text-center md:text-5xl font-bold">
              About E-Commerce Demo
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto space-y-6 text-[theme(--muted-foreground)]">
          <p className="text-lg leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>

          <p className="text-lg leading-relaxed">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>

          <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-[theme(--foreground)]">
                Our Mission
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                euismod, nisl eget ultricies aliquam, nunc sapien aliquet nunc,
                quis aliquam nisl nunc vel nisl.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-[theme(--foreground)]">
                Our Values
              </h3>
              <p>
                Sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip.
              </p>
            </div>
          </div>

          <div className="pt-8 space-y-4">
            <h3 className="text-2xl font-semibold text-[theme(--foreground)]">
              Why Choose Us?
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-[theme(--primary)] text-xl">✓</span>
                <span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[theme(--primary)] text-xl">✓</span>
                <span>
                  Duis aute irure dolor in reprehenderit in voluptate velit.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[theme(--primary)] text-xl">✓</span>
                <span>Excepteur sint occaecat cupidatat non proident.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[theme(--primary)] text-xl">✓</span>
                <span>
                  Sed do eiusmod tempor incididunt ut labore et dolore.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
