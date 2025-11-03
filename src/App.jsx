import { useState, useEffect } from 'react';
import DailyInput from './components/DailyInput';
import YearHeatmap from './components/YearHeatmap';
import Modal from './components/Modal';
import { clearAllData, getDataForDate } from './utils/storage';
import { getTodayString } from './utils/date';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load theme preference and check if today's data exists
  useEffect(() => {
    const savedTheme = localStorage.getItem('rhythm_theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Open modal on startup if today's data is not set
    const today = getTodayString();
    const todayData = getDataForDate(today);
    if (!todayData) {
      setIsModalOpen(true);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('rhythm_theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleSave = () => {
    // Trigger heatmap refresh and close modal
    setRefreshTrigger(prev => prev + 1);
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to delete all your data? This cannot be undone.')) {
      if (clearAllData()) {
        setRefreshTrigger(prev => prev + 1);
        alert('All data has been cleared.');
      }
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <h1>Rhythm</h1>
          </div>
          <div className="header-actions">
            <button
              className="icon-button"
              onClick={openModal}
              aria-label="Add today's entry"
              title="Add today's entry"
            >
              <span className="material-icons">add_circle</span>
            </button>
            <button
              className="icon-button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              <span className="material-icons">
                {theme === 'light' ? 'dark_mode' : 'light_mode'}
              </span>
            </button>
            <button
              className="icon-button"
              onClick={handleReset}
              aria-label="Reset all data"
              title="Reset all data"
            >
              <span className="material-icons">delete_forever</span>
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <YearHeatmap refreshTrigger={refreshTrigger} />
      </main>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <DailyInput onSave={handleSave} />
      </Modal>
    </div>
  );
}

export default App;