import React, { useState, useEffect, useCallback } from 'react';
import { NewsletterReport } from '../types';
import { fetchNewsletterReport } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';
import { AlertTriangle, RefreshCw, ArrowLeft } from './Icons';
import InsightCard from './InsightCard';
import SourcesList from './SourcesList';

interface BriefingPageProps {
  onBack: () => void;
}

const BriefingPage: React.FC<BriefingPageProps> = ({ onBack }) => {
  const [report, setReport] = useState<NewsletterReport | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getReport = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setReport(null);
    try {
      const newReport = await fetchNewsletterReport();
      // Sort insights by threat level: High > Medium > Low
      newReport.insights.sort((a, b) => {
        const order = { High: 0, Medium: 1, Low: 2 };
        return order[a.threatLevel] - order[b.threatLevel];
      });
      setReport(newReport);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch the latest intelligence report. The digital shadows are restless. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="text-gray-400 hover:text-white transition-colors p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/70"
              aria-label="Back to Archive"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                This Week's Threat Briefing
            </h2>
        </div>
        <button
          onClick={getReport}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg shadow-md transition-transform transform hover:scale-105 disabled:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          {isLoading ? (
            <LoadingSpinner className="w-5 h-5" />
          ) : (
            <RefreshCw className="w-5 h-5" />
          )}
          <span>{isLoading ? 'Scanning...' : 'Regenerate'}</span>
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
           <div className="text-center">
            <LoadingSpinner className="w-12 h-12 mx-auto mb-4" />
            <p className="text-lg text-gray-400">Searching for the latest threats...</p>
          </div>
        </div>
      ) : error ? (
        <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg flex items-center gap-4">
          <AlertTriangle className="w-8 h-8" />
          <div>
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        </div>
      ) : report && report.insights.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {report.insights.map((insight, index) => (
              <InsightCard key={index} insight={insight} />
            ))}
          </div>
          {report.sources && report.sources.length > 0 && (
            <SourcesList sources={report.sources} />
          )}
        </>
      ) : (
        <div className="text-center text-gray-500 py-10">
          <p>No new threat insights could be generated at this time.</p>
        </div>
      )}
    </div>
  );
};

export default BriefingPage;
