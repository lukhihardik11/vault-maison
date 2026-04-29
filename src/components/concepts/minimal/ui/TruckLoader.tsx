'use client'

import React from 'react'

const font = "'Inter', 'Helvetica Neue', sans-serif"

interface TruckLoaderProps {
  message?: string
}

export const TruckLoader: React.FC<TruckLoaderProps> = ({
  message = 'Preparing your order...',
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
      <div className="vm-truck-wrapper" style={{
        width: '200px',
        height: '100px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'flex-end',
        overflowX: 'hidden',
      }}>
        {/* Truck body */}
        <svg className="vm-truck-body" style={{ width: '130px', marginBottom: '6px' }} viewBox="0 0 198 93" fill="none">
          <path d="M135 22.5H177.264C178.295 22.5 179.22 23.133 179.6 24.0939L192.345 56.8443C192.458 57.1332 192.5 57.4434 192.5 57.7587V84C192.5 85.3807 191.381 86.5 190 86.5H135C133.619 86.5 132.5 85.3807 132.5 84V25C132.5 23.6193 133.619 22.5 135 22.5Z" stroke="#050505" strokeWidth="2"/>
          <path d="M146 33.5H181.459C182.46 33.5 183.361 34.0986 183.77 35.0245L192.74 55.5H146V33.5Z" fill="#050505" fillOpacity="0.15" stroke="#050505" strokeWidth="2"/>
          <rect x="0.5" y="0.5" width="131" height="90" rx="3.5" stroke="#050505" strokeWidth="2"/>
          <rect x="8" y="8" width="116" height="74" rx="2" fill="#050505" fillOpacity="0.06"/>
          {/* Gift box icon */}
          <rect x="48" y="28" width="36" height="28" rx="2" stroke="#050505" strokeWidth="1.5" fill="none"/>
          <line x1="66" y1="28" x2="66" y2="56" stroke="#050505" strokeWidth="1.5"/>
          <line x1="48" y1="38" x2="84" y2="38" stroke="#050505" strokeWidth="1.5"/>
          <path d="M58 28C58 24 62 22 66 28" stroke="#050505" strokeWidth="1.5" fill="none"/>
          <path d="M74 28C74 24 70 22 66 28" stroke="#050505" strokeWidth="1.5" fill="none"/>
        </svg>
        {/* Tires */}
        <div style={{
          width: '130px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 10px 0 15px',
          position: 'absolute',
          bottom: 0,
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#050505" strokeWidth="2"/>
            <circle cx="12" cy="12" r="4" stroke="#050505" strokeWidth="1.5"/>
            <circle cx="12" cy="12" r="1" fill="#050505"/>
          </svg>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#050505" strokeWidth="2"/>
            <circle cx="12" cy="12" r="4" stroke="#050505" strokeWidth="1.5"/>
            <circle cx="12" cy="12" r="1" fill="#050505"/>
          </svg>
        </div>
        {/* Road */}
        <div className="vm-truck-road" style={{
          width: '100%',
          height: '1.5px',
          backgroundColor: '#E5E5E5',
          position: 'relative',
          bottom: 0,
          alignSelf: 'flex-end',
          borderRadius: 0,
        }} />
      </div>
      <p style={{
        fontFamily: font,
        fontSize: '13px',
        fontWeight: 400,
        color: '#9B9B9B',
        letterSpacing: '0.05em',
      }}>{message}</p>
      <style>{`
        .vm-truck-body {
          animation: vmTruckMotion 1.6s ease-in-out infinite;
        }
        @keyframes vmTruckMotion {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(2px); }
        }
        .vm-truck-road::before {
          content: '';
          position: absolute;
          width: 20px;
          height: 100%;
          background-color: #E5E5E5;
          right: -50%;
          border-radius: 3px;
          animation: vmRoadAnim 2s linear infinite;
          border-left: 10px solid white;
        }
        .vm-truck-road::after {
          content: '';
          position: absolute;
          width: 10px;
          height: 100%;
          background-color: #E5E5E5;
          right: -65%;
          border-radius: 3px;
          animation: vmRoadAnim 2s linear infinite;
          border-left: 4px solid white;
        }
        @keyframes vmRoadAnim {
          0% { transform: translateX(0); }
          100% { transform: translateX(-350px); }
        }
      `}</style>
    </div>
  )
}

export default TruckLoader
