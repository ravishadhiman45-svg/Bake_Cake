import { useState } from "react";
import { ShoppingCart, User, MapPin, Search, Menu, X } from "lucide-react";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [location, setLocation] = useState("Location");

  // Get Current Location
  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(
            `${position.coords.latitude.toFixed(
              2,
            )}, ${position.coords.longitude.toFixed(2)}`,
          );
          setShowModal(false);
        },
        () => {
          alert("Unable to fetch location");
        },
      );
    }
  };

  return (
    <>
      <nav className="bg-[#fd3f5a] text-white px-4 md:px-6">
        <div className="container mx-auto flex justify-between items-center gap-4 md:gap-8 h-20">
          {/* LEFT SIDE */}
          <div className="flex shrink-0 gap-3 md:gap-4 items-center">
            {/* BIGGER LOGO */}
            <img
              src="/assets/whiteLogo1.png"
              alt="Logo"
              className="h-22 w-32 md:h-24 md:w-48 object-cover scale-110"
            />

            {/* LOCATION */}
            <div
              onClick={() => setShowModal(true)}
              className="hidden sm:flex items-center gap-2 cursor-pointer"
            >
              <MapPin />
              <span className="hover:text-gray-300 text-sm md:text-lg font-semibold whitespace-nowrap">
                {location}
              </span>
            </div>
          </div>

          {/* SEARCH BAR */}
          <div className="hidden md:block flex-1 max-w-2xl">
            <div className="flex items-center bg-white text-gray-800 rounded-md px-4 py-2">
              <Search />
              <input
                type="text"
                placeholder="Search for cakes, Flavours and much more"
                className="ml-3 w-full outline-none bg-transparent text-md font-semibold"
              />
            </div>
          </div>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex space-x-9 ml-auto">
            <li className="flex items-center gap-2">
              <ShoppingCart />
              <a
                href="#cart"
                className="hover:text-gray-300 text-lg font-semibold"
              >
                Cart
              </a>
            </li>

            <li className="flex items-center gap-2">
              <User />
              <a
                href="#about"
                className="hover:text-gray-300 text-lg font-semibold"
              >
                About
              </a>
            </li>
          </ul>

          {/* MOBILE MENU BUTTON */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        {/* MOBILE SEARCH */}
        <div className="md:hidden pb-4">
          <div className="flex items-center bg-white text-gray-800 rounded-md px-4 py-2">
            <Search />
            <input
              type="text"
              placeholder="Search cakes..."
              className="ml-3 w-full outline-none bg-transparent"
            />
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden bg-[#fd3f5a] rounded-md p-4 mb-4 space-y-4">
            <div
              onClick={() => setShowModal(true)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <MapPin />
              <span>{location}</span>
            </div>

            <div className="flex items-center gap-3">
              <ShoppingCart />
              <span>Cart</span>
            </div>

            <div className="flex items-center gap-3">
              <User />
              <span>About</span>
            </div>
          </div>
        )}
      </nav>

      {/* WAVY DIVIDER */}
      <div className="w-full relative z-10">
        <div className="absolute top-0 left-0 w-full z-50 rotate-180">
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="w-full h-7 md:h-9"
          >
            <path
              fill="#fd3f5a"
              d="
        M0,60
        C25,35 50,35 75,60
        C100,85 125,85 150,60
        C175,35 200,35 225,60
        C250,85 275,85 300,60
        C325,35 350,35 375,60
        C400,85 425,85 450,60
        C475,35 500,35 525,60
        C550,85 575,85 600,60
        C625,35 650,35 675,60
        C700,85 725,85 750,60
        C775,35 800,35 825,60
        C850,85 875,85 900,60
        C925,35 950,35 975,60
        C1000,85 1025,85 1050,60
        C1075,35 1100,35 1125,60
        C1150,85 1175,85 1200,60
        C1225,35 1250,35 1275,60
        C1300,85 1325,85 1350,60
        C1375,35 1400,35 1440,60

        L1440,120
        L0,120
        Z
      "
            />
          </svg>
        </div>
      </div>

      {/* LOCATION MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
          <div className="bg-white w-full max-w-md rounded-xl p-6 relative text-black">
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4"
            >
              <X />
            </button>

            <h2 className="text-2xl font-bold mb-5">Select Your Location</h2>

            {/* INPUT */}
            <input
              type="text"
              placeholder="Enter your city"
              className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-red-500"
            />

            {/* BUTTON */}
            <button
              onClick={handleCurrentLocation}
              className="w-full bg-[#fd3f5a] text-white py-3 rounded-md mt-4 font-semibold"
            >
              Use Current Location
            </button>

            <button
              onClick={() => setShowModal(false)}
              className="w-full border border-gray-300 py-3 rounded-md mt-3 font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
