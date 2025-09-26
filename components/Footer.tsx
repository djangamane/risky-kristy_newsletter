
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-4 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} CryptoScam Watchtower. All rights reserved.</p>
        <p className="text-xs mt-1">Information is AI-generated and for educational purposes only. Always do your own research.</p>
      </div>
    </footer>
  );
};

export default Footer;
