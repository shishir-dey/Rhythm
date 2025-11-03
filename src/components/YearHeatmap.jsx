import { useState, useEffect } from 'react';
import { getDatesInYear, getCurrentYear, formatDateLong, getDayOfWeek } from '../utils/date';
import { loadData, calculateAverage } from '../utils/storage';
import './YearHeatmap.css';

export default function YearHeatmap({ refreshTrigger }) {
  const [year] = useState(getCurrentYear());
  const [data, setData] = useState({});
  const [hoveredDate, setHoveredDate] = useState(null);
  const [hoveredPosition, setHoveredPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setData(loadData());
  }, [refreshTrigger]);

  const dates = getDatesInYear(year);
  
  // Group dates by month
  const monthGroups = [];
  for (let month = 0; month < 12; month++) {
    const monthDates = dates.filter(date => {
      const d = new Date(date + 'T00:00:00');
      return d.getMonth() === month;
    });
    monthGroups.push(monthDates);
  }

  const getColorForScore = (score) => {
    if (score === 0) return 'var(--cell-empty)';
    
    // Gradient from light blue (low) to red (high)
    if (score <= 3) return 'var(--cell-low)';
    if (score <= 5) return 'var(--cell-medium-low)';
    if (score <= 7) return 'var(--cell-medium)';
    if (score <= 8.5) return 'var(--cell-medium-high)';
    return 'var(--cell-high)';
  };

  const handleCellHover = (date, event) => {
    setHoveredDate(date);
    const rect = event.currentTarget.getBoundingClientRect();
    setHoveredPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
  };

  const handleCellLeave = () => {
    setHoveredDate(null);
  };

  const isToday = (date) => {
    const today = new Date();
    const checkDate = new Date(date + 'T00:00:00');
    return checkDate.toDateString() === today.toDateString();
  };

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  return (
    <div className="year-heatmap">
      <div className="heatmap-header">
        <h2>{year}</h2>
        <div className="legend">
          <span className="legend-label">Less</span>
          <div className="legend-colors">
            <div className="legend-cell" style={{ background: 'var(--cell-empty)' }}></div>
            <div className="legend-cell" style={{ background: 'var(--cell-low)' }}></div>
            <div className="legend-cell" style={{ background: 'var(--cell-medium-low)' }}></div>
            <div className="legend-cell" style={{ background: 'var(--cell-medium)' }}></div>
            <div className="legend-cell" style={{ background: 'var(--cell-medium-high)' }}></div>
            <div className="legend-cell" style={{ background: 'var(--cell-high)' }}></div>
          </div>
          <span className="legend-label">More</span>
        </div>
      </div>

      <div className="months-grid">
        {monthGroups.map((monthDates, monthIndex) => (
          <div key={monthIndex} className="month-container">
            <div className="month-label">{monthNames[monthIndex]}</div>
            <div className="month-grid">
              {/* Add empty cells for days before the first day of month */}
              {monthIndex === 0 && Array.from({ length: getDayOfWeek(monthDates[0]) }).map((_, i) => (
                <div key={`empty-${i}`} className="day-cell empty"></div>
              ))}
              
              {monthDates.map(date => {
                const dayData = data[date];
                const average = dayData ? calculateAverage(dayData) : 0;
                const color = getColorForScore(average);
                
                return (
                  <div
                    key={date}
                    className={`day-cell ${isToday(date) ? 'today' : ''}`}
                    style={{ background: color }}
                    onMouseEnter={(e) => handleCellHover(date, e)}
                    onMouseLeave={handleCellLeave}
                    title={date}
                  ></div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {hoveredDate && (
        <div 
          className="tooltip"
          style={{
            left: `${hoveredPosition.x}px`,
            top: `${hoveredPosition.y}px`,
          }}
        >
          <div className="tooltip-date">{formatDateLong(hoveredDate)}</div>
          {data[hoveredDate] ? (
            <div className="tooltip-values">
              <div className="tooltip-row">
                <span>Energy:</span>
                <span className="tooltip-value">{data[hoveredDate].energy}</span>
              </div>
              <div className="tooltip-row">
                <span>Clarity:</span>
                <span className="tooltip-value">{data[hoveredDate].clarity}</span>
              </div>
              <div className="tooltip-row">
                <span>Mood:</span>
                <span className="tooltip-value">{data[hoveredDate].mood}</span>
              </div>
              <div className="tooltip-row average">
                <span>Average:</span>
                <span className="tooltip-value">{calculateAverage(data[hoveredDate]).toFixed(1)}</span>
              </div>
            </div>
          ) : (
            <div className="tooltip-empty">No data</div>
          )}
        </div>
      )}
    </div>
  );
}