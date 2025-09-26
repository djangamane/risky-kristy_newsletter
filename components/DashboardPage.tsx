import React from 'react';
import { Calendar } from './Icons';

interface DashboardPageProps {
  onViewBriefing: () => void;
}

const pastBriefings = [
  { date: 'July 22, 2024', summary: 'Analysis of recent phishing attacks targeting DeFi users.' },
  { date: 'July 15, 2024', summary: 'Deep dive into new social engineering tactics on social media.' },
  { date: 'July 8, 2024', summary: 'Report on compromised browser extensions stealing private keys.' },
];

const DashboardPage: React.FC<DashboardPageProps> = ({ onViewBriefing }) => {
  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-200">Welcome to the Watchtower</h2>
        <p className="text-gray-400 mt-2">Access the latest threat intelligence or review past briefings from the archive.</p>
      </div>

      <div className="text-center mb-12">
        <button
          onClick={onViewBriefing}
          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold text-lg rounded-lg shadow-xl transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
        >
          Generate This Week's Briefing
        </button>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-gray-300 mb-6 border-b border-gray-700 pb-2">
          Intelligence Archive
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastBriefings.map((briefing, index) => (
            <div key={index} className="bg-gray-800/50 rounded-lg p-5 border border-gray-700/50 hover:border-blue-500/50 transition-colors cursor-pointer">
              <div className="flex items-center text-blue-400 mb-3">
                <Calendar className="w-5 h-5 mr-3" />
                <span className="font-semibold">{briefing.date}</span>
              </div>
              <p className="text-gray-400 text-sm">{briefing.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
