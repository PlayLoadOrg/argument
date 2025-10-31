import React, { useState } from 'react';
import { Menu, Feather } from 'lucide-react';
import HamburgerMenu from './HamburgerMenu';

export default function Header({ scenarioIndex, totalScenarios }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <header className="header">
        <div className="header-content">
          <button
            onClick={() => setShowMenu(true)}
            className="menu-button"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
          
          <div className="header-center">
            <Feather className="icon-amber" size={24} />
            <div className="header-title">
              <h1>ARGUMENT</h1>
              <p className="header-subtitle">Logic in the Founding Era</p>
            </div>
          </div>
          
          <div className="header-right">
            Scenario {scenarioIndex + 1} of {totalScenarios}
          </div>
        </div>
      </header>

      <HamburgerMenu isOpen={showMenu} onClose={() => setShowMenu(false)} />
    </>
  );
}