
import React from 'react';
import { ShieldAlert } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50 shadow-lg sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center text-center">
        <ShieldAlert className="w-10 h-10 mr-4 text-blue-400"/>
        <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                CryptoScam <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Watchtower</span>
            </h1>
            <p className="text-gray-400 mt-1 text-sm md:text-base">Your AI-powered sentinel against digital currency threats.</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
