'use client';

import React from 'react';

interface DarkNeumorphicInputProps {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
  name?: string;
}

export function DarkNeumorphicInput({
  placeholder = 'Search...',
  value,
  defaultValue,
  onChange,
  type = 'text',
  className,
  name,
}: DarkNeumorphicInputProps) {
  return (
    <>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        className={`vault-neu-input ${className || ''}`}
      />
      <style>{`
        .vault-neu-input {
          background: #0A0A0A;
          border: none;
          outline: none;
          width: 100%;
          padding: 14px 24px;
          font-size: 0.85rem;
          font-family: Inter, sans-serif;
          letter-spacing: 0.05em;
          border-radius: 9999px;
          box-shadow: inset 2px 5px 10px rgb(5, 5, 5);
          color: #EAEAEA;
          transition: box-shadow 0.3s ease;
        }
        .vault-neu-input::placeholder {
          color: #555;
          letter-spacing: 0.1em;
        }
        .vault-neu-input:focus {
          box-shadow: inset 2px 5px 10px rgb(5, 5, 5), 0 0 0 1px rgba(212,175,55,0.2);
        }
      `}</style>
    </>
  );
}
