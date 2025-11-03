import { useState, useEffect } from 'react';
import { getTodayString, formatDateLong } from '../utils/date';
import { saveData, getDataForDate } from '../utils/storage';
import './DailyInput.css';

export default function DailyInput({ onSave }) {
  const today = getTodayString();
  const [values, setValues] = useState({
    energy: 5,
    clarity: 5,
    mood: 5
  });
  const [saved, setSaved] = useState(false);

  // Load today's data on mount
  useEffect(() => {
    const todayData = getDataForDate(today);
    if (todayData) {
      setValues({
        energy: todayData.energy,
        clarity: todayData.clarity,
        mood: todayData.mood
      });
    }
  }, [today]);

  const handleChange = (param, value) => {
    setValues(prev => ({
      ...prev,
      [param]: parseInt(value)
    }));
    setSaved(false);
  };

  const handleSave = () => {
    const success = saveData(today, values);
    if (success) {
      setSaved(true);
      onSave?.();
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <div className="daily-input">
      <div className="date-header">
        <h2>Today</h2>
        <p className="date-text">{formatDateLong(today)}</p>
      </div>

      <div className="input-group">
        <div className="input-item">
          <div className="input-label">
            <span className="label-text">Energy</span>
            <span className="label-value">{values.energy}</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={values.energy}
            onChange={(e) => handleChange('energy', e.target.value)}
            className="slider"
          />
          <div className="slider-labels">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>

        <div className="input-item">
          <div className="input-label">
            <span className="label-text">Clarity</span>
            <span className="label-value">{values.clarity}</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={values.clarity}
            onChange={(e) => handleChange('clarity', e.target.value)}
            className="slider"
          />
          <div className="slider-labels">
            <span>Foggy</span>
            <span>Clear</span>
          </div>
        </div>

        <div className="input-item">
          <div className="input-label">
            <span className="label-text">Mood</span>
            <span className="label-value">{values.mood}</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={values.mood}
            onChange={(e) => handleChange('mood', e.target.value)}
            className="slider"
          />
          <div className="slider-labels">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>
      </div>

      <button 
        className={`save-button ${saved ? 'saved' : ''}`}
        onClick={handleSave}
      >
        {saved ? '✓ Saved' : 'Save'}
      </button>
    </div>
  );
}