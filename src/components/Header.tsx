import { useEffect, useState } from 'react';
import Nav from '@/components/Nav';
import { AlignLeft, X } from 'lucide-react';

const Header = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  const toggleNavClick = () => {
    setIsClicked(!isClicked);
  };

  // Change header background color on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;

      if (scroll > 100) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`${
        scrolling
          ? 'bg-background shadow-xl duration-500 animate-in'
          : 'duration-500 animate-out'
      } fixed top-0 z-[500] w-full text-foreground`}
    >
      <div className="container flex items-center justify-between py-6 md:px-0">
        {/* Logo */}
        <div>
          <a className="text-lg z-10 font-600" href="/">
            Ryan Chase
          </a>
        </div>

        {/* Navbar */}
        <Nav isClicked={isClicked} toggleNavClick={toggleNavClick} />

        <div className="z-10 flex items-center gap-4 md:hidden">
          {/* Menu buttons */}
          <div
            className={` ml-4 inline-block md:hidden`}
            onClick={toggleNavClick}
          >
            {isClicked ? (
              <button className="text-300">
                <X
                  name="Close Menu"
                  className="translate-y-1"
                  cursor="pointer"
                  size={28}
                />
              </button>
            ) : (
              <button className="text-300">
                <AlignLeft
                  className="translate-y-1"
                  name="Open Menu"
                  cursor="pointer"
                  size={28}
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
