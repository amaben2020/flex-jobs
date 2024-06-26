import Image from "next/image";
import Link from "next/link";
import { Button } from "../../ui/button";
import logo from "./../../../app/assets/logo.png";
const Navbar = () => {
  return (
    <header>
      <nav className="flex items-center justify-between">
        <Button asChild variant="ghost">
          <Link href="/">
            <Image priority src={logo} alt="" height={70} width={80} />
          </Link>
        </Button>

        <Button asChild>
          <Link href="/jobs/new"> Post Jobs</Link>
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;
