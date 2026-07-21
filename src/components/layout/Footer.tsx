import { Heart } from "lucide-react";
import Container from "../common/Container";
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

            

           
          </div>

          <div className="my-12 border-t border-white/10" />

          <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-400 md:flex-row">
            <p>© 2026 Seka. All rights reserved.</p>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <a href="#" className="hover:text-primary">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary">
                Terms of Service
              </a>
              
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
