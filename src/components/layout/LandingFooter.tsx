import { Heart, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../common/LandingContainer";
import logo from "../../assets/images/Seka_logo (1).png";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <Container>
        <div className="py-10 sm:py-14">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-3">
                <img
                  src={logo}
                  alt="Seka logo"
                  className="h-12 w-auto"
                />

                <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                  Seka
                </h2>
              </div>

              <p className="mt-4 max-w-md text-base leading-7 text-gray-400">
                Your AI Care Manager for PCOS and hormonal health.
                Personalized guidance, intelligent insights, and compassionate
                support every day.
              </p>
            </div>

            <div />

            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-white/70">
                Contact
              </h3>

              <div className="space-y-3 text-sm text-gray-300">
                <a
                  href="mailto:founderoffice@ajursinsights.com"
                  className="flex items-center gap-3 transition-colors hover:text-primary"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5">
                    <Mail size={16} />
                  </span>
                  <span>founderoffice@ajursinsights.com</span>
                </a>

                <a
                  href="https://www.instagram.com/sekacares?igsh=bzk1Nzk4czVmc3F0"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 transition-colors hover:text-primary"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      aria-hidden="true"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
                      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
                      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
                    </svg>
                  </span>
                  <span>@sekacares</span>
                </a>
              </div>
            </div>
          </div>

          <div className="my-12 border-t border-white/10" />

          <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-400 md:flex-row">
            <p>© 2026 Seka. All rights reserved.</p>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <Link to="/terms-of-service" className="hover:text-primary">
                Terms of Service
              </Link>
              <Link to="/privacy-policy" className="hover:text-primary">
                Privacy Policy
              </Link>
            </div>

            <p className="flex items-center gap-2">
              Made with
              <Heart size={16} className="fill-red-500 text-red-500" />
              for Women's Health
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
