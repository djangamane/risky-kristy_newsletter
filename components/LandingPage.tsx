import React, { useState } from 'react';
import { Mail } from './Icons';

interface LandingPageProps {
  onSubscribe: (email: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSubscribe }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    onSubscribe(email);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center h-full -mt-16">
      <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
        Stay Ahead of Crypto Threats
      </h2>
      <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-8">
        Get weekly, AI-powered intelligence briefings on the latest scams and vulnerabilities in the digital currency world. Protect your assets by staying informed.
      </p>
      
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="flex items-center bg-gray-800 border border-gray-700 rounded-lg p-2 shadow-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
          <Mail className="w-6 h-6 text-gray-500 mx-3" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            className="w-full bg-transparent text-gray-200 placeholder-gray-500 focus:outline-none"
            aria-label="Email Address"
          />
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Get Access
          </button>
        </div>
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        <p className="text-xs text-gray-500 mt-3">Join the watch. We respect your privacy.</p>
      </form>
    </div>
  );
};

export default LandingPage;
