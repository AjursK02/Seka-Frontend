import { useNavigate } from "react-router-dom";

import { useAuth } from "../../auth/AuthContext";
import Button from "../common/LandingButton";
import Container from "../common/LandingContainer";
import logo from "../../assets/images/Seka_logo (1).png";
import useScrollThreshold from "../../hooks/useScrollThreshold";

const Navbar = () => {
  const scroll = useScrollThreshold(30);
  const navigate = useNavigate();
  const { accessToken, user } = useAuth();

  const handleTryNow = () => {
    if (accessToken && user) {
      navigate("/today");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${scroll
          ? "bg-white/80 backdrop-blur-lg shadow-md"
          : "bg-transparent"
        }`}
    >
      <Container className="flex h-20 items-center justify-between">
        <a
          href="/"
          className="group inline-flex cursor-pointer items-center gap-3"
          aria-label="Go to home page"
        >
          <img
            src={logo}
            alt="Seka logo"
            className="h-10 w-auto transition group-hover:opacity-80"
          />

          <span className="flex flex-col">
            <span className="text-2xl font-bold text-primary transition group-hover:opacity-80">
              Seka
            </span>

            <span className="text-xs uppercase tracking-widest transition group-hover:text-primary">
              AI Care Manager
            </span>
          </span>
        </a>

        {/* <div className="hidden gap-10 text-sm font-medium text-gray-700 md:flex">
          <a className="transition hover:text-primary" href="#how">
            How it works
          </a>
          <a className="transition hover:text-primary" href="#learn">
            Learn
          </a>
          <a className="transition hover:text-primary" href="#approach">
            Our Approach
          </a>
          <a className="transition hover:text-primary" href="#community">
            Community
          </a>
        </div> */}

        <div className="hidden md:block">
          <Button className="px-6 py-3 text-sm" onClick={handleTryNow}>
            Try Now
          </Button>
        </div>

        <Button
          className="!px-3 !py-1.5 !text-[8px] !tracking-[0.04em] leading-none shadow-md md:hidden"
          onClick={handleTryNow}
        >
          Try Now
        </Button>
      </Container>
    </nav>
  );
};

export default Navbar;
