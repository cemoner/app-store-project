import React, { useEffect } from 'react';

const Hamburger: React.FC = () => {
  useEffect(() => {
    const menuIcon: HTMLElement | null = document.querySelector(".hamburger-menu-icon");
    const list: HTMLElement | null = document.querySelector(".navigation-list");

    if (menuIcon && list) {
      const handleClick = () => {
        list.classList.toggle("nav-opened");
      };

      menuIcon.addEventListener("click", handleClick);

      return () => {
        menuIcon.removeEventListener("click", handleClick);
      };
    }

    return () => {};
  }, []);

  return (
    <div>
      {}
    </div>
  );
};

export default Hamburger;