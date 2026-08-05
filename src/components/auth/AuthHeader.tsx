import { Link } from "react-router-dom";
import SekaLogo from "../../assets/images/Seka_logo (1).png";

export function AuthHeader() {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-2 transition-opacity hover:opacity-80"
    >
      <img
        src={SekaLogo}
        alt="Seka Logo"
        className="h-10 w-10 object-contain sm:h-12 sm:w-12"
      />
      <span className="text-xl font-bold tracking-tight text-gray-950 sm:text-2xl">
        Seka
      </span>
    </Link>
  );
}
