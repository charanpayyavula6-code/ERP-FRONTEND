import React, { useState } from 'react';
import { X, Server, Check, RotateCcw, Globe } from 'lucide-react';
import { getApiConfig, setApiConfig, studentApi } from '../services/api';

export default function ApiSettingsModal({
  isOpen,
  onClose,
  onConfigSaved,
  onResetDatabase
}) {
  const [config, setConfig] = useState(getApiConfig());

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    setApiConfig(config);
    onConfigSaved(config);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Server size={18} color="var(--primary)" />
            <h2>System & Database Settings</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label className="form-label" style={{ marginBottom: '8px', display: 'block' }}>Data Storage Mode</label>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="button"
                  className={`btn ${config.isMock ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ flex: 1 }}
                  onClick={() => setConfig(prev => ({ ...prev, isMock: true }))}
                >
                  <Server size={15} />
                  <span>Local Storage Mode</span>
                </button>
                <button
                  type="button"
                  className={`btn ${!config.isMock ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ flex: 1 }}
                  onClick={() => setConfig(prev => ({ ...prev, isMock: false }))}
                >
                  <Globe size={15} />
                  <span>Connected Server</span>
                </button>
              </div>
            </div>

            {!config.isMock && (
              <div className="form-group">
                <label className="form-label">Server Connection URL</label>
                <input 
                  type="url"
                  className="form-input"
                  placeholder="e.g. https://api.university.edu"
                  value={config.baseUrl}
                  onChange={(e) => setConfig(prev => ({ ...prev, baseUrl: e.target.value }))}
                  required
                />
              </div>
            )}

            <div>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ width: '100%', color: 'var(--warning-text)' }}
                onClick={() => {
                  onResetDatabase();
                  onClose();
                }}
              >
                <RotateCcw size={15} />
                <span>Reset Sample Student Records</span>
              </button>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Check size={16} />
              <span>Save Configuration</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
