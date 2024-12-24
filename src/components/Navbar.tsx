import { FC, useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { NavLink, useNavigate } from "react-router-dom";
import Fuse from 'fuse.js';
import { Button } from "@/components/ui/button";

const marketnames = [
  "RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "BHARTIARTL.NS", "ICICIBANK.NS",
  "INFY.NS", "SBIN.NS", "HINDUNILVR.NS", "ITC.NS", "LT.NS", "HCLTECH.NS",
  "SUNPHARMA.NS", "ONGC.NS", "BAJFINANCE.NS", "NTPC.NS", "MARUTI.NS",
  "TATAMOTORS.NS", "ADANIENT.NS", "KOTAKBANK.NS", "AXISBANK.NS",
  "ADANIPORTS.NS", "M&M.NS", "ULTRACEMCO.NS", "COALINDIA.NS", "POWERGRID.NS",
  "ASIANPAINT.NS", "TITAN.NS", "BAJAJ-AUTO.NS", "WIPRO.NS", "BAJAJFINSV.NS",
  "NESTLEIND.NS", "JSWSTEEL.NS", "TATASTEEL.NS", "GRASIM.NS", "SBILIFE.NS",
  "LTIM.NS", "HDFCLIFE.NS", "BPCL.NS", "TECHM.NS", "BRITANNIA.NS",
  "HINDALCO.NS", "DIVISLAB.NS", "EICHERMOT.NS", "CIPLA.NS", "TATACONSUM.NS",
  "DRREDDY.NS", "SHRIRAMFIN.NS", "HEROMOTOCO.NS", "INDUSINDBK.NS",
  "APOLLOHOSP.NS", "LICI.NS", "DMART.NS", "HAL.NS", "ADANIGREEN.NS",
  "ADANIPOWER.NS", "IOC.NS", "SIEMENS.NS", "IRFC.NS", "ZOMATO.NS", "BEL.NS",
  "DLF.NS", "JIOFIN.NS", "VBL.NS", "TRENT.NS", "VEDL.NS", "ABB.NS", "INDIGO.NS",
  "PFC.NS", "PIDILITIND.NS", "AMBUJACEM.NS", "RECLTD.NS", "GODREJCP.NS",
  "GAIL.NS", "TATAPOWER.NS", "ADANIENSOL.NS", "ZYDUSLIFE.NS", "PNB.NS",
  "BANKBARODA.NS", "MOTHERSON.NS", "TVSMOTOR.NS", "CHOLAFIN.NS", "HAVELLS.NS",
  "DABUR.NS", "TORNTPHARM.NS", "UNITDSPR.NS", "ICICIPRULI.NS", "BAJAJHLDNG.NS",
  "CANBK.NS", "JINDALSTEL.NS", "ATGL.NS", "BOSCHLTD.NS", "ICICIGI.NS",
  "COLPAL.NS", "NAUKRI.NS", "SHREECEM.NS", "MARICO.NS", "SRF.NS", "IRCTC.NS",
  "SBICARD.NS", "BERGEPAINT.NS"
];

const Navbar: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const fuse = useRef<Fuse<string>>();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fuse.current = new Fuse(marketnames, {
      threshold: 0.3,
      distance: 100,
    });
  }, []);

  useEffect(() => {
    if (searchTerm && fuse.current) {
      const results = fuse.current.search(searchTerm).slice(0, 6).map(result => result.item);
      setSearchResults(results);
      setIsOpen(results.length > 0);
    } else {
      setSearchResults([]);
      setIsOpen(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectStock = (stock: string) => {
    setSearchTerm(stock);
    setIsOpen(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
    navigate(`/stock/${stock}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' && searchResults.length > 0) {
      e.preventDefault();
      const firstButton = dropdownRef.current?.querySelector('button');
      if (firstButton instanceof HTMLButtonElement) {
        firstButton.focus();
      }
    }
  };

  const handleDropdownKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextButton = dropdownRef.current?.querySelector(`button:nth-child(${index + 2})`);
      if (nextButton instanceof HTMLButtonElement) {
        nextButton.focus();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (index === 0) {
        inputRef.current?.focus();
      } else {
        const prevButton = dropdownRef.current?.querySelector(`button:nth-child(${index})`);
        if (prevButton instanceof HTMLButtonElement) {
          prevButton.focus();
        }
      }
    }
  };

  return (
    <nav className="bg-zinc-900 border-b border-amber-700 p-4">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <NavLink to="/" className="text-2xl text-amber-100 font-bold mb-4 sm:mb-0">
          VintageTrader
        </NavLink>
        <div className="flex w-full sm:w-auto relative">
          <div className="flex w-full">
            <Input
              ref={inputRef}
              type="search"
              placeholder="Search stocks..."
              className="flex-grow mr-2 bg-zinc-800 border-amber-700 text-amber-100 placeholder-amber-500"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />

          </div>
          {isOpen && (
            <div
              ref={dropdownRef}
              className="absolute top-full left-0 w-full bg-zinc-800 border border-amber-700 rounded-md shadow-lg z-10 mt-1"
            >
              <ul className="py-2">
                {searchResults.map((result, index) => (
                  <li key={index}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left text-amber-100 hover:bg-amber-700 hover:text-amber-100"
                      onClick={() => handleSelectStock(result)}
                      onKeyDown={(e) => handleDropdownKeyDown(e, index)}
                    >
                      {result}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

