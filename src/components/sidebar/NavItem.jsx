import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export const NavItem = ({ 
  icon, 
  title, 
  items = [], 
  isActive = false, 
  isCollapsible = false,
  to = '#'
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = (e) => {
    if (isCollapsible) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <li className={`nav-item ${isActive ? 'active' : ''}`}>
      <NavLink
        to={to}
        className={({ isActive }) => 
          `nav-link ${isCollapsible ? 'collapsed' : ''} ${isActive ? 'active' : ''}`
        }
        onClick={toggleCollapse}
        style={{ cursor: isCollapsible ? 'pointer' : 'default' }}
      >
        <i className={`fas fa-fw ${icon}`}></i>
        <span>{title}</span>
        {isCollapsible && (
          <i className={`fas fa-angle-down float-right mt-1 ${isOpen ? 'rotate-180' : ''}`}></i>
        )}
      </NavLink>

      {isCollapsible && items.length > 0 && (
        <div className={`collapse ${isOpen ? 'show' : ''}`}>
          <div className="bg-white py-2 collapse-inner rounded">
            {items.map((item, index) => (
              <NavLink 
                key={index} 
                to={item.to} 
                className="collapse-item"
              >
                {item.title}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </li>
  );
};

NavItem.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      to: PropTypes.string
    })
  ),
  isActive: PropTypes.bool,
  isCollapsible: PropTypes.bool,
  to: PropTypes.string
};