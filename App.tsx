import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import DashboardPage from './components/DashboardPage';
import BriefingPage from './components/BriefingPage';
import Header from './components/Header';
import Footer from './components/Footer';

type Page = 'landing' | 'dashboard' | 'briefing';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('landing');
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    // Check if the user is "subscribed" on initial load
    const subscribed = localStorage.getItem('cryptoScamWatchtowerSubscribed');
    if (subscribed === 'true') {
      setPage('dashboard');
    }
    setIsInitialized(true);
  }, []);

  const handleSubscribe = (email: string) => {
    // In a real app, you'd send this to a server.
    // Here, we'll just save it to localStorage to simulate a session.
    console.log(`Subscribed with email: ${email}`);
    localStorage.setItem('cryptoScamWatchtowerSubscribed', 'true');
    setPage('dashboard');
  };

  const renderPage = () => {
    switch (page) {
      case 'landing':
        return <LandingPage onSubscribe={handleSubscribe} />;
      case 'dashboard':
        return <DashboardPage onViewBriefing={() => setPage('briefing')} />;
      case 'briefing':
        return <BriefingPage onBack={() => setPage('dashboard')} />;
      default:
        return <LandingPage onSubscribe={handleSubscribe} />;
    }
  };

  if (!isInitialized) {
    return null; // Or a loading spinner for the whole app
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
