import React from 'react';
import {Link } from 'react-router-dom';
const Footer = () => {
  return (
    <div className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Molytrix Petrochem</h3>
            <p className="text-gray-400">
              Your trusted partner in industrial lubricants and solutions.
            </p>
          </div>
          <div>
            <Link to={'/products'}><h4 className="text-lg font-semibold mb-4">Products</h4></Link>
            
            <ul className="space-y-2 text-gray-400">
              <li>Hydromax AW series 
</li>
              <li>Hydromax HVI series 
</li>
              <li>Polyplex HT 460 
</li>
              <li>Lithomax EP2 Grease 
</li>
              <li>Lithplex 220 Blue</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
            <a href="#about">About Us</a>
            </li>
            <Link to={'/contact'}>
             <li>
                Contact
            </li>
            </Link>
             
            </ul>
            </div>
          </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Molytrix Petrochem. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
