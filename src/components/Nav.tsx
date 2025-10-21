import { useEffect, useState } from 'react';

const navigation = [
  { name: 'Home', href: 'home' },
  { name: 'Services', href: 'services' },
  { name: 'Results', href: 'results' },
  { name: 'About', href: 'about' },
  { name: 'Contact', href: 'contact' },
];

export interface NavBarProps {
  isClicked: boolean;
  scrolling: boolean;
  toggleNavClick: () => void;
  isBlogDetailsPage?: boolean;
}

const Nav = ({
  isClicked,
  scrolling,
  toggleNavClick,
  isBlogDetailsPage,
}: NavBarProps) => {
  const [activeLink, setActiveLink] = useState('home');

  useEffect(() => {
    if (isBlogDetailsPage) {
      setActiveLink('');
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections = document.querySelectorAll('section[id]');

      sections.forEach((section) => {
        if (section instanceof HTMLElement) {
          const sectionTop = section.offsetTop - 100;
          const sectionHeight = section.offsetHeight;
          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            setActiveLink(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkColorClass =
    isBlogDetailsPage && !scrolling
      ? 'text-white hover:text-primary'
      : scrolling
      ? 'text-foreground hover:text-primary'
      : 'text-foreground dark:text-white hover:text-primary';

  return (
    <>
      {/* Mobile Nav */}
      <nav
        className={`${
          isClicked ? 'translate-x-0' : '-translate-x-[190.25rem]'
        } fixed left-0 top-0 flex h-screen w-full items-center justify-start transition-all duration-500 lg:hidden`}
      >
        <ul className="h-full w-[50%] border-r border-muted bg-background pl-4 pt-[9rem]">
          {navigation?.map((item) => (
            <li key={item.name} className="mb-4 text-xl font-500 capitalize">
              <a
                className={`transition-colors duration-300 hover:text-primary ${
                  activeLink === item.href ? 'text-primary' : ''
                }`}
                href={`/#${item.href}`}
                onClick={() => {
                  toggleNavClick();
                }}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop Nav */}
      <nav className="hidden md:inline-flex">
        <ul className="flex gap-10 capitalize">
          {navigation?.map((item) => (
            <li key={item.name} className="inline-block text-[1rem] font-500">
              <a
                className={`relative transition-colors duration-300 after:absolute after:bottom-[-0.2rem] after:left-0 after:h-[3px] after:w-[20px] after:rounded-xl after:transition-all after:duration-300 after:ease-in hover:after:w-full hover:after:bg-primary ${linkColorClass} ${
                  activeLink === item.href
                    ? 'relative text-primary after:absolute after:bottom-[-0.2rem] after:left-0 after:h-[3px] after:w-full after:rounded-xl after:bg-primary after:transition-all after:duration-500 after:ease-in'
                    : ''
                }`}
                href={`/#${item.href}`}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Nav;
