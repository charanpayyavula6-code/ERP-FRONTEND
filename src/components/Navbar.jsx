import React from 'react';
import { 
  Search, 
  Sun, 
  Moon, 
  Radio, 
  Bell, 
  Database, 
  RefreshCw 
} from 'lucide-react';

export default function Navbar({ 
  searchQuery, 
  setSearchQuery, 
  theme, 
  toggleTheme, 
  apiConfig, 
  onOpenApiSettings, 
  onRefreshData,
  isLoading 
}) {
  return (
    <header className="top-navbar">
      {/* Search Bar with live HTTP query binding */}
      <div className="nav-left">
        <div className="search-input-box">
          <Search size={17} />
          <input 
            type="text"
            placeholder="Search student by name, roll no, department, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Action Controls & API Status Indicator */}
      <div className="nav-right">
        {/* Refresh Data button */}
        <button 
          className="icon-btn" 
          title="Refresh Student Records"
          onClick={onRefreshData}
          disabled={isLoading}
        >
          <RefreshCw size={17} className={isLoading ? 'animate-spin' : ''} style={{ animation: isLoading ? 'spin 1s linear infinite' : 'none' }} />
        </button>

        {/* Database Status Pill */}
        <button 
          className="api-status-pill"
          onClick={onOpenApiSettings}
          title="System & Database Settings"
        >
          <span className="pulse-dot" />
          <Database size={14} color="#6366f1" />
          <span>System Online</span>
        </button>

        {/* Theme Toggle */}
        <button 
          className="icon-btn" 
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <Sun size={17} color="#fbbf24" /> : <Moon size={17} color="#6366f1" />}
        </button>

        {/* Notifications Icon */}
        <button 
          className="icon-btn" 
          title="Notifications"
          onClick={() => alert('All systems operational. HTTP REST Client ready.')}
        >
          <Bell size={17} />
        </button>
      </div>
    </header>
  );
}
