import React from 'react';
import './header.scss';

const Header = () => {
  return (
    <header>
      <div className="logo">
        Logo
      </div>
      <nav>
        <ul>
          <li><a href="/">Header</a></li>
          <li><a href="/">Navigation</a></li>
          <li><a href="/">Links</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
