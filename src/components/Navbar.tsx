import { FC } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar: FC = () => {
  return (
    <nav className="bg-zinc-900 border-b border-amber-700 p-4">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <NavLink to="/" className="text-2xl text-amber-100 font-bold mb-4  sm:mb-0">
          VintageTrader
        </NavLink>
        <div className="flex w-full sm:w-auto">
          <Input
            type="search"
            placeholder="Search stocks..."
            className="flex-grow mr-2 bg-zinc-800 border-amber-700 text-amber-100 placeholder-amber-500"
          />
          <Button
            variant="outline"
            className="border-amber-700 text-amber-100 hover:bg-amber-700"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
