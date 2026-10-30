import React from 'react';
import { PaymentResultType } from '../types/store';

interface DestinationStatusBoxProps {
  uid: string;
  shopName: string;
  status: PaymentResultType;
  timeDate: string;
  className?: string;
}

export const DestinationStatusBox: React.FC<DestinationStatusBoxProps> = ({
  uid,
  shopName,
  status,
  timeDate,
  className = '',
}) => {
  return (
    <div
      className={`dest-box ${className}`}
      style={{
        background: '#000',
        border: '1px dashed #ffcc00',
        borderRadius: '12px',
        padding: '12px',
        fontFamily: 'sans-serif',
        margin: '10px 0',
      }}
    >
      {/* Row 1: Destination UID */}
      <div
        className="dest-row"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div className="dest-label" style={{ color: '#6b789e', fontSize: '11px' }}>
          Destination UID:
        </div>
        <div
          className="dest-value font-mono"
          id="destUid"
          style={{ color: '#fff', fontSize: '12px', fontWeight: 700 }}
        >
          {uid || '5829104821'}
        </div>
      </div>

      {/* Row 2: PlayerShop Name */}
      <div
        className="dest-row"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '6px',
        }}
      >
        <div className="dest-label" style={{ color: '#6b789e', fontSize: '11px' }}>
          PlayerShop Name:
        </div>
        <div
          className="dest-name"
          id="destName"
          style={{
            color: '#ffcc00',
            fontSize: '11px',
            fontWeight: 600,
            textAlign: 'right',
          }}
        >
          {shopName || 'BinRao Gaming'}
        </div>
      </div>

      {/* Row 3: Status Badge */}
      <div
        className="dest-row"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '8px',
          borderTop: '1px dashed #222',
          paddingTop: '8px',
        }}
      >
        <div className="dest-label" style={{ color: '#6b789e', fontSize: '11px' }}>
          Status:
        </div>
        <div id="statusBadge">
          {status === 'success' && (
            <span
              className="status-success"
              style={{
                background: '#0a2a1a',
                color: '#00ff88',
                border: '1px solid #00ff88',
                padding: '2px 8px',
                borderRadius: '6px',
                fontSize: '10px',
                fontWeight: 800,
                display: 'inline-block',
              }}
            >
              ✅ SUCCESS
            </span>
          )}
          {status === 'failed' && (
            <span
              className="status-failed"
              style={{
                background: '#4a0a1a',
                color: '#ff3333',
                border: '1px solid #ff3333',
                padding: '2px 8px',
                borderRadius: '6px',
                fontSize: '10px',
                fontWeight: 800,
                display: 'inline-block',
              }}
            >
              ❌ FAILED
            </span>
          )}
          {status === 'pending' && (
            <span
              style={{
                background: '#332700',
                color: '#ffcc00',
                border: '1px solid #ffcc00',
                padding: '2px 8px',
                borderRadius: '6px',
                fontSize: '10px',
                fontWeight: 800,
                display: 'inline-block',
              }}
            >
              ⏳ PENDING
            </span>
          )}
        </div>
      </div>

      {/* Time Date */}
      <div
        className="time-date"
        id="timeDate"
        style={{
          color: '#555',
          fontSize: '10px',
          textAlign: 'right',
          marginTop: '6px',
        }}
      >
        {timeDate}
      </div>
    </div>
  );
};
