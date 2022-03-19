import React from "react";
import { Link } from "react-router-dom";
import BoxIcon from "../icons/BoxIcon";
import FormIcon from "../icons/FormIcon";
import GearIcon from "../icons/GearIcon";
import { Portal } from "react-portal";

const FloatingNavigation = () => {
  const [menuOpen, setMenuOpen] = React.useState();

  const openMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <React.Fragment>
      <div
        className="floating-nav"
        onMouseEnter={openMenu}
        style={{ height: menuOpen ? 240 : "" }}
      >
        <div className="floating-nav-menu">
          <HoverLink to="/forms" label="Forms" style={{ bottom: 215 }}>
            <FormIcon />
          </HoverLink>
          <HoverLink to="/records" label="Records" style={{ bottom: 155 }}>
            <BoxIcon />
          </HoverLink>
          <HoverLink to="/admin" label="Settings" style={{ bottom: 95 }}>
            <GearIcon />
          </HoverLink>
        </div>
        <NavIcon menuOpen={menuOpen} />
      </div>
      <div className="floating-nav-exit" onMouseLeave={closeMenu} />
    </React.Fragment>
  );
};

export default FloatingNavigation;

const HoverLink = ({ to, children, label, style }) => {
  const [showLabel, setShowLabel] = React.useState(false);

  return (
    <React.Fragment>
      <Portal>
        <div className="hover-label" style={style} data-show-label={showLabel}>
          {label}
        </div>
      </Portal>
      <Link
        to={to}
        onMouseEnter={() => setShowLabel(true)}
        onMouseLeave={() => setShowLabel(false)}
      >
        {children}
      </Link>
    </React.Fragment>
  );
};

const NavIcon = ({ menuOpen }) => (
  <div className="nav-icon-wrapper" data-menu-open={menuOpen}>
    <div className="bar" />
    <div className="bar" />
    <div className="bar" />
  </div>
);
