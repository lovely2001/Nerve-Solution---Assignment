import React, { useState, useMemo } from 'react';
import './App.css';

const dateArray = ['24-Apr-2024', '02-May-2024', '09-May-2024', '31-May-2024', '21-Jun-2024'];
const strategyArray = [
  {
    View: 'Bullish',
    Value: {
      '24-Apr-2024': ['Bull Call Spread', 'Bull Put Spread', 'Bull Put Spread', 'Long Call', 'Bull Put Spread', 'Bull Call Spread', 'Strategy1', 'Bull Call Spread', 'Strategy1', 'Strategy1', 'Spread-Strategy', 'Bull Call Spread'],
      '02-May-2024': ['Bull Call Spread', 'Bull Call Spread', 'Bull Put Spread', 'Long Call', 'Long Call', 'Long Call', 'Bull Put Spread', 'Bull Call Spread', 'Strategy1', 'Bull Call Spread', 'Strategy2', 'Strategy1', 'Strategy2', 'Bull Call Spread'],
      '09-May-2024': ['Strategy Put', 'Strategy Call', 'Strategy Call', 'Strategy Call', 'Strategy Put'],
    }
  },
  {
    View: 'Bearish',
    Value: {
      '24-Apr-2024': ['Bear Call Spread', 'Bear Call Spread', 'Bear Call Spread', 'Long Put', 'Long Put', 'Long Put', 'Bear Call Spread'],
      '31-May-2024': ['Long Put', 'Long Put', 'Long Put', 'Long Put', 'Long Put'],
      '21-Jun-2024': ['Strategy3', 'Strategy3', 'Bear Put Spread', 'Strategy3', 'Long Put', 'Long Put'],
    }
  },
  {
    View: 'RangeBound',
    Value: {
      '24-Apr-2024': ['Short Straddle', 'Short Strangle', 'Short Strangle', 'Iron Butterfly', 'Short Strangle', 'Short Straddle', 'Strategy1', 'Short Straddle', 'Strategy1', 'Strategy1', 'Spread-Strategy', 'Short Straddle'],
      '02-May-2024': ['Short Straddle', 'Short Straddle', 'Short Strangle', 'Iron Butterfly', 'Iron Butterfly', 'Iron Butterfly', 'Short Strangle', 'Short Straddle', 'Strategy1', 'Short Straddle', 'Strategy2', 'Strategy1', 'Strategy2', 'Short Straddle'],
      '21-Jun-2024': ['Iron Condor', 'Iron Butterfly', 'Iron Butterfly', 'Iron Butterfly', 'Iron Condor'],
    }
  },
  {
    View: 'Volatile',
    Value: {
      '02-May-2024': ['Long Straddle', 'Long Strangle', 'Long Strangle', 'Long Strangle', 'Long Straddle', 'Strategy1', 'Long Straddle', 'Strategy1', 'Strategy1', 'Spread-Strategy', 'Long Straddle'],
      '09-May-2024': ['Long Straddle', 'Long Straddle', 'Long Strangle', 'Long Strangle', 'Long Straddle', 'Strategy1', 'Long Straddle', 'Strategy2', 'Strategy1', 'Strategy2', 'Long Straddle'],
      '31-May-2024': ['Long Straddle', 'Long Strangle', 'Long Strangle', 'Long Strangle', 'Long Straddle'],
    }
  }
];

const App = () => {
  const [selectedView, setSelectedView] = useState('Bullish');
  const [selectedDate, setSelectedDate] = useState(dateArray[0]);

  const { strategies, strategyCount } = useMemo(() => {
    const view = strategyArray.find(v => v.View === selectedView);
    const strategies = view?.Value[selectedDate] || [];
    const strategyCount = strategies.reduce((acc, strategy) => {
      acc[strategy] = (acc[strategy] || 0) + 1;
      return acc;
    }, {});
    return { strategies, strategyCount };
  }, [selectedView, selectedDate]);

  return (
    <div className="App">
      <div className="toggle-container">
        {['Bullish', 'Bearish', 'RangeBound', 'Volatile'].map(view => (
          <button
            key={view}
            className={`toggle-button ${selectedView === view ? 'selected' : ''}`}
            onClick={() => setSelectedView(view)}
          >
            {view}
          </button>
        ))}
      </div>

      <div className="dropdown-container">
        <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
          {dateArray.map(date => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>

      <div className="cards-container">
        {Object.keys(strategyCount).length === 0 ? (
          <div className="empty-state">There are no strategies for <span style={{fontWeight: '500'}}>{selectedDate}.</span></div>
        ) : (
          Object.keys(strategyCount).map(strategy => (
            <div key={strategy} className="card">
              <h3>{strategy}</h3>
              <p style={{color: 'gray'}}>{strategyCount[strategy]} {strategyCount[strategy] > 1 ? 'Strategies' : 'Strategy'}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
