// Source: 21st.dev - CreditCardForm
// Adapted: monochrome palette (#050505/#FFFFFF/#6B6B6B/#9B9B9B/#E5E5E5),
//          sharp edges (no rounded corners), reduced-motion safe, CSS 3D flip card
//          Dynamic card network logo detection (Visa, Mastercard, Amex, Discover, RuPay, etc.)

"use client";

import React, { useEffect, useMemo, useState } from "react";

type CardState = {
  number: string;
  holder: string;
  month: string;
  year: string;
  cvv: string;
};

type CardValidity = {
  number: boolean;
  holder: boolean;
  month: boolean;
  year: boolean;
  cvv: boolean;
  allValid: boolean;
};

type CreditCardFormProps = {
  defaultNumber?: string;
  defaultHolder?: string;
  defaultMonth?: string;
  defaultYear?: string;
  defaultCVV?: string;
  maskMiddle?: boolean;
  showSubmit?: boolean;
  onChange?: (state: CardState, validity: CardValidity) => void;
  onSubmit?: (state: CardState, validity: CardValidity) => void;
  className?: string;
};

type CardNetwork = 'visa' | 'mastercard' | 'amex' | 'discover' | 'rupay' | 'diners' | 'jcb' | 'unionpay' | 'unknown';

function detectCardNetwork(number: string): CardNetwork {
  const digits = number.replace(/\s/g, '');
  if (!digits) return 'unknown';

  // Amex: starts with 34 or 37
  if (/^3[47]/.test(digits)) return 'amex';
  // Visa: starts with 4
  if (/^4/.test(digits)) return 'visa';
  // Mastercard: starts with 51-55 or 2221-2720
  if (/^5[1-5]/.test(digits) || /^2[2-7]/.test(digits)) return 'mastercard';
  // Discover: starts with 6011, 622126-622925, 644-649, 65
  if (/^6011|^65|^64[4-9]|^622(1[2-9][6-9]|[2-8]\d{2}|9[0-2][0-5])/.test(digits)) return 'discover';
  // RuPay: starts with 60, 65, 81, 82, 508
  if (/^(508|60|65|81|82)/.test(digits)) return 'rupay';
  // Diners Club: starts with 300-305, 36, 38
  if (/^3(0[0-5]|[68])/.test(digits)) return 'diners';
  // JCB: starts with 2131, 1800, 35
  if (/^(2131|1800|35)/.test(digits)) return 'jcb';
  // UnionPay: starts with 62
  if (/^62/.test(digits)) return 'unionpay';

  return 'unknown';
}

function CardNetworkLogo({ network }: { network: CardNetwork }) {
  switch (network) {
    case 'visa':
      return (
        <svg width="48" height="32" viewBox="0 0 48 32" fill="none">
          <text x="4" y="22" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="700" fill="#FFFFFF" letterSpacing="0.5">VISA</text>
        </svg>
      );
    case 'mastercard':
      return (
        <svg width="48" height="32" viewBox="0 0 48 32" fill="none">
          <circle cx="18" cy="16" r="10" fill="rgba(235,0,27,0.8)" />
          <circle cx="30" cy="16" r="10" fill="rgba(255,159,0,0.8)" />
          <path d="M24 8.5a10 10 0 0 1 0 15" fill="rgba(255,95,0,0.7)" />
        </svg>
      );
    case 'amex':
      return (
        <svg width="48" height="32" viewBox="0 0 48 32" fill="none">
          <text x="2" y="22" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="700" fill="#FFFFFF" letterSpacing="0.3">AMEX</text>
        </svg>
      );
    case 'discover':
      return (
        <svg width="48" height="32" viewBox="0 0 48 32" fill="none">
          <text x="2" y="20" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="600" fill="#FFFFFF" letterSpacing="0.2">DISCOVER</text>
          <circle cx="38" cy="16" r="6" fill="rgba(255,102,0,0.8)" />
        </svg>
      );
    case 'rupay':
      return (
        <svg width="48" height="32" viewBox="0 0 48 32" fill="none">
          <text x="2" y="21" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="700" fill="#FFFFFF" letterSpacing="0.3">RuPay</text>
        </svg>
      );
    case 'diners':
      return (
        <svg width="48" height="32" viewBox="0 0 48 32" fill="none">
          <circle cx="24" cy="16" r="12" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
          <line x1="16" y1="16" x2="32" y2="16" stroke="#FFFFFF" strokeWidth="1" />
          <line x1="24" y1="8" x2="24" y2="24" stroke="#FFFFFF" strokeWidth="1" />
        </svg>
      );
    case 'jcb':
      return (
        <svg width="48" height="32" viewBox="0 0 48 32" fill="none">
          <text x="8" y="21" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="700" fill="#FFFFFF" letterSpacing="0.3">JCB</text>
        </svg>
      );
    case 'unionpay':
      return (
        <svg width="48" height="32" viewBox="0 0 48 32" fill="none">
          <rect x="4" y="6" width="16" height="20" rx="2" fill="rgba(0,50,120,0.8)" />
          <rect x="18" y="6" width="16" height="20" rx="2" fill="rgba(200,0,0,0.8)" />
          <rect x="32" y="6" width="12" height="20" rx="2" fill="rgba(0,80,60,0.8)" />
        </svg>
      );
    default:
      // Generic card icon
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="32"
          width="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        >
          <rect x="1" y="4" width="22" height="16" rx="0" ry="0" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
      );
  }
}

function formatNumberSpaces(num: string): string {
  return num.replace(/\s+/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");
}

function clampDigits(value: string, maxLen: number) {
  return value.replace(/\D/g, "").slice(0, maxLen);
}

const CreditCardForm = ({
  defaultNumber = "",
  defaultHolder = "",
  defaultMonth = "",
  defaultYear = "",
  defaultCVV = "",
  maskMiddle = true,
  showSubmit = true,
  onChange,
  onSubmit,
  className = "",
}: CreditCardFormProps) => {
  const [number, setNumber] = useState(clampDigits(defaultNumber, 19));
  const [holder, setHolder] = useState(defaultHolder.toUpperCase());
  const [month, setMonth] = useState(defaultMonth);
  const [year, setYear] = useState(defaultYear);
  const [cvv, setCVV] = useState(clampDigits(defaultCVV, 4));
  const [focusField, setFocusField] = useState<
    null | "number" | "holder" | "expire" | "cvv"
  >(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const flip = focusField === "cvv";
  const years = useMemo(() => {
    const start = new Date().getFullYear();
    return Array.from({ length: 10 }, (_, i) => String(start + i));
  }, []);

  const cardNetwork = useMemo(() => detectCardNetwork(number), [number]);

  const validity: CardValidity = useMemo(() => {
    const numberValid = number.length >= 13;
    const holderValid = holder.trim().length >= 2;
    const monthValid = !!month && +month >= 1 && +month <= 12;
    const yearValid = !!year && +year >= new Date().getFullYear();
    const cvvValid = /^\d{3,4}$/.test(cvv);
    return {
      number: numberValid,
      holder: holderValid,
      month: monthValid,
      year: yearValid,
      cvv: cvvValid,
      allValid:
        numberValid && holderValid && monthValid && yearValid && cvvValid,
    };
  }, [number, holder, month, year, cvv]);

  useEffect(() => {
    onChange?.({ number, holder, month, year, cvv }, validity);
  }, [number, holder, month, year, cvv, validity, onChange]);

  const displayDigits = useMemo(
    () => number.slice(0, 16).split(""),
    [number]
  );

  const displayedSlots = useMemo(() => {
    const arr: { textTop: string; filed: boolean }[] = [];
    for (let i = 0; i < 16; i++) {
      let content = "#";
      if (i < displayDigits.length) {
        const d = displayDigits[i];
        const shouldMask = maskMiddle && i >= 4 && i <= 11;
        content = shouldMask ? "*" : d;
      }
      arr.push({ textTop: content, filed: i < displayDigits.length });
    }
    return arr;
  }, [displayDigits, maskMiddle]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ number, holder, month, year, cvv }, validity);
  };

  const transitionDuration = prefersReducedMotion ? "0s" : "0.8s";
  const slotTransition = prefersReducedMotion ? "none" : "transform 0.2s";

  return (
    <section className={`ccf-root ${className}`}>
      <div className="ccf-wrap">
        {/* CARD VISUAL */}
        <div className="ccf-card-container">
          <div
            className={`ccf-card ${flip ? "ccf-card--flip" : ""}`}
            style={{ transition: `transform ${transitionDuration}` }}
          >
            {/* FRONT */}
            <div className="ccf-card__front">
              {/* Focus highlight */}
              {focusField && focusField !== "cvv" && (
                <div className={`ccf-highlight ccf-highlight--${focusField}`} />
              )}

              <div className="ccf-card__header">
                <div className="ccf-card__brand">VAULT MAISON</div>
                <div className="ccf-card__network-logo">
                  <CardNetworkLogo network={cardNetwork} />
                </div>
              </div>

              <div className="ccf-card__number" aria-label="Card number">
                {displayedSlots.map((slot, idx) => (
                  <span key={idx} className="ccf-slot">
                    <span
                      className={`ccf-digit ${slot.filed ? "ccf-digit--filed" : ""}`}
                      style={{ transition: slotTransition }}
                    >
                      <span className="ccf-row ccf-row--placeholder">#</span>
                      <span className="ccf-row ccf-row--value">
                        {slot.textTop}
                      </span>
                    </span>
                  </span>
                ))}
              </div>

              <div className="ccf-card__footer">
                <div className="ccf-card__holder-block">
                  <div className="ccf-card__section-title">CARD HOLDER</div>
                  <div className="ccf-card__holder-name">
                    {holder || "NAME ON CARD"}
                  </div>
                </div>
                <div className="ccf-card__expires-block">
                  <div className="ccf-card__section-title">EXPIRES</div>
                  <div className="ccf-card__expires-value">
                    <span>{month || "MM"}</span>/<span>{year ? year.slice(-2) : "YY"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* BACK */}
            <div className="ccf-card__back">
              {/* CVV highlight */}
              {focusField === "cvv" && (
                <div className="ccf-highlight ccf-highlight--cvv" />
              )}
              <div className="ccf-card__magstripe" />
              <div className="ccf-card__cvv-area">
                <span className="ccf-card__cvv-label">CVV</span>
                <div className="ccf-card__cvv-field">
                  {"*".repeat(cvv.length)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FORM */}
        <form className="ccf-form" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="ccf-number">Card Number</label>
            <input
              id="ccf-number"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="1234 5678 9012 3456"
              value={formatNumberSpaces(number)}
              onChange={(e) => setNumber(clampDigits(e.target.value, 19))}
              onFocus={() => setFocusField("number")}
              onBlur={() => setFocusField(null)}
              aria-invalid={!validity.number}
            />
            {!validity.number && number.length >= 13 && (
              <small className="ccf-err">Card number looks invalid</small>
            )}
          </div>

          <div>
            <label htmlFor="ccf-holder">Card Holder</label>
            <input
              id="ccf-holder"
              type="text"
              autoComplete="cc-name"
              placeholder="FULL NAME"
              value={holder}
              onChange={(e) => setHolder(e.target.value.toUpperCase())}
              onFocus={() => setFocusField("holder")}
              onBlur={() => setFocusField(null)}
              aria-invalid={!validity.holder}
            />
          </div>

          <div className="ccf-field-group">
            <div>
              <label>Expiration Date</label>
              <div className="ccf-field-date">
                <select
                  id="ccf-exp-month"
                  value={month || ""}
                  onChange={(e) => setMonth(e.target.value)}
                  onFocus={() => setFocusField("expire")}
                  onBlur={() => setFocusField(null)}
                  aria-invalid={!validity.month}
                >
                  <option value="" disabled>
                    Month
                  </option>
                  {Array.from({ length: 12 }, (_, i) =>
                    String(i + 1).padStart(2, "0")
                  ).map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <select
                  id="ccf-exp-year"
                  value={year || ""}
                  onChange={(e) => setYear(e.target.value)}
                  onFocus={() => setFocusField("expire")}
                  onBlur={() => setFocusField(null)}
                  aria-invalid={!validity.year}
                >
                  <option value="" disabled>
                    Year
                  </option>
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="ccf-cvv">CVV</label>
              <input
                id="ccf-cvv"
                inputMode="numeric"
                autoComplete="cc-csc"
                placeholder="***"
                value={cvv}
                onChange={(e) => setCVV(clampDigits(e.target.value, 4))}
                onFocus={() => setFocusField("cvv")}
                onBlur={() => setFocusField(null)}
                aria-invalid={!validity.cvv}
              />
            </div>
          </div>

          {/* Security info */}
          <div className="ccf-security">
            <div className="ccf-security__row">
              <span className="ccf-security__lock">&#128274; Encrypted Checkout</span>
              <span className="ccf-security__ssl">256-bit SSL</span>
            </div>
            <div className="ccf-security__accepted">
              <span className="ccf-security__label">ACCEPTED</span>
              <span>Visa</span>
              <span>Mastercard</span>
              <span>Amex</span>
              <span>Apple Pay</span>
            </div>
          </div>

          {showSubmit && (
            <button
              className="ccf-submit"
              type="submit"
              disabled={!validity.allValid}
              aria-disabled={!validity.allValid}
            >
              {validity.allValid ? "Submit" : "Complete all fields"}
            </button>
          )}
        </form>
      </div>

      <style jsx>{`
        /* ── Root ── */
        .ccf-root {
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 24px;
          background: #ffffff;
          color: #050505;
        }
        .ccf-wrap {
          width: 100%;
          max-width: 700px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          align-items: start;
        }

        /* ── Card Container (3D perspective) ── */
        .ccf-card-container {
          perspective: 1000px;
          width: 100%;
          max-width: 460px;
          margin: 0 auto;
        }
        .ccf-card {
          position: relative;
          width: 100%;
          aspect-ratio: 460 / 260;
          transform-style: preserve-3d;
        }
        .ccf-card--flip {
          transform: rotateY(180deg);
        }

        .ccf-card__front,
        .ccf-card__back {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          padding: 24px 30px;
          background: linear-gradient(135deg, #1a1a1a 0%, #050505 50%, #111 100%);
          box-shadow: 0 20px 40px -10px rgba(5, 5, 5, 0.5);
          color: #ffffff;
          overflow: hidden;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        /* Monochrome accent rings (subtle white glow) */
        .ccf-card__front::before,
        .ccf-card__back::before {
          content: "";
          position: absolute;
          border: 16px solid rgba(255, 255, 255, 0.06);
          border-radius: 100%;
          left: -17%;
          top: -45px;
          height: 300px;
          width: 300px;
          filter: blur(13px);
          pointer-events: none;
        }
        .ccf-card__front::after,
        .ccf-card__back::after {
          content: "";
          position: absolute;
          border: 16px solid rgba(255, 255, 255, 0.04);
          border-radius: 100%;
          width: 300px;
          top: 55%;
          left: -200px;
          height: 300px;
          filter: blur(13px);
          pointer-events: none;
        }

        .ccf-card__back {
          transform: rotateY(180deg);
          padding: 24px 0 0;
        }

        /* ── Highlight overlay ── */
        .ccf-highlight {
          position: absolute;
          border: 1px solid rgba(255, 255, 255, 0.65);
          box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
          border-radius: 0;
          z-index: 2;
          pointer-events: none;
          transition: ${prefersReducedMotion ? "none" : "all 0.3s ease"};
          width: 0;
          height: 0;
          top: 0;
          left: 0;
        }
        .ccf-highlight--number {
          width: calc(100% - 9.6%);
          height: 15.4%;
          top: 32.7%;
          left: 4.8%;
        }
        .ccf-highlight--holder {
          width: 60%;
          height: 18.5%;
          top: 58.1%;
          left: 4.8%;
        }
        .ccf-highlight--expire {
          width: 13.7%;
          height: 21.5%;
          top: 56.5%;
          right: 5.2%;
          left: auto;
        }
        .ccf-highlight--cvv {
          width: calc(100% - 9.6%);
          height: 31.5%;
          top: 41.5%;
          left: 4.8%;
        }

        /* ── Card inner elements ── */
        .ccf-card__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 1;
          margin-bottom: 32px;
        }
        .ccf-card__brand {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        .ccf-card__network-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 48px;
          min-height: 32px;
        }

        .ccf-card__number {
          font-size: clamp(16px, 4vw, 22px);
          position: relative;
          z-index: 1;
          display: flex;
          height: 33px;
          overflow: hidden;
          color: #ffffff;
          margin-bottom: 32px;
        }
        .ccf-slot {
          display: inline-flex;
          margin-right: 0;
        }
        .ccf-slot:nth-child(4n) {
          margin-right: 10px;
        }
        .ccf-digit {
          display: flex;
          flex-direction: column;
          height: 33px;
          line-height: 33px;
        }
        .ccf-digit--filed {
          transform: translateY(-33px);
        }
        .ccf-row {
          height: 33px;
          display: block;
        }

        .ccf-card__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 1;
        }
        .ccf-card__holder-block {
          text-transform: uppercase;
        }
        .ccf-card__section-title {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          opacity: 0.7;
          margin-bottom: 2px;
        }
        .ccf-card__holder-name {
          font-size: 14px;
          margin-top: 2px;
        }
        .ccf-card__expires-block {
          text-align: right;
        }
        .ccf-card__expires-value {
          font-size: 14px;
          margin-top: 2px;
        }

        /* ── Card Back ── */
        .ccf-card__magstripe {
          height: 40px;
          width: 100%;
          background-color: #6b7280;
          position: relative;
          z-index: 1;
          margin-top: 24px;
        }
        .ccf-card__cvv-area {
          position: relative;
          z-index: 1;
          margin-top: 24px;
          padding: 0 32px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .ccf-card__cvv-label {
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 6px;
          color: rgba(255,255,255,0.9);
        }
        .ccf-card__cvv-field {
          background-color: #ffffff;
          border-radius: 0;
          height: 44px;
          width: 100%;
          color: #050505;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 0 12px;
          font-size: 25px;
          letter-spacing: 4px;
          line-height: 21px;
        }

        /* ── Mobile card adjustments ── */
        @media (max-width: 480px) {
          .ccf-card__front,
          .ccf-card__back {
            padding: 16px 18px;
          }
          .ccf-card__header {
            margin-bottom: 24px;
          }
          .ccf-card__number {
            font-size: 16px;
            height: 28px;
            margin-bottom: 24px;
          }
          .ccf-digit {
            height: 28px;
            line-height: 28px;
          }
          .ccf-digit--filed {
            transform: translateY(-28px);
          }
          .ccf-row {
            height: 28px;
          }
          .ccf-slot:nth-child(4n) {
            margin-right: 6px;
          }

          .ccf-card__cvv-area {
            padding: 0 18px;
            margin-top: 16px;
          }
          .ccf-card__cvv-field {
            height: 36px;
            font-size: 20px;
          }
          .ccf-card__magstripe {
            height: 32px;
            margin-top: 16px;
          }
        }

        /* ── Form ── */
        .ccf-form {
          background: #ffffff;
          width: 100%;
          max-width: 700px;
          margin: 0 auto;
          padding: 28px 0 0;
          border: none;
          box-shadow: none;
          display: grid;
          gap: 16px;
          color: #050505;
        }
        .ccf-form label {
          display: block;
          margin: 6px 0 4px;
          color: #050505;
          font-weight: 500;
          font-size: 14px;
        }
        .ccf-form input,
        .ccf-form select {
          height: 52px;
          display: block;
          width: 100%;
          border: 1px solid #9b9b9b;
          padding: 18px 20px;
          transition: ${prefersReducedMotion ? "none" : "outline 200ms ease, box-shadow 200ms ease"};
          outline: none;
          background-color: #ffffff;
          color: #050505;
          font-size: 16px;
        }
        .ccf-form input:focus,
        .ccf-form select:focus {
          border: 1px solid #050505;
          outline: 4px solid rgba(5, 5, 5, 0.1);
        }
        .ccf-form select {
          padding: 0 20px;
        }
        .ccf-field-group {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
          align-items: end;
        }
        @media (max-width: 560px) {
          .ccf-field-group {
            grid-template-columns: 1fr;
          }
        }
        .ccf-field-date {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .ccf-err {
          color: #050505;
          font-size: 12px;
          margin-top: 4px;
        }

        /* ── Security section ── */
        .ccf-security {
          border: 1px solid #E5E5E5;
          padding: 16px 20px;
          margin-top: 8px;
        }
        .ccf-security__row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .ccf-security__lock {
          font-size: 13px;
          font-weight: 500;
          color: #050505;
        }
        .ccf-security__ssl {
          font-size: 12px;
          color: #6B6B6B;
        }
        .ccf-security__accepted {
          display: flex;
          gap: 12px;
          align-items: center;
          font-size: 12px;
          color: #6B6B6B;
          border-top: 1px solid #E5E5E5;
          padding-top: 10px;
        }
        .ccf-security__label {
          font-weight: 600;
          color: #9B9B9B;
          font-size: 10px;
          letter-spacing: 0.08em;
        }

        .ccf-submit {
          margin-top: 8px;
          height: 48px;
          border: none;
          background: #050505;
          color: #ffffff;
          font-weight: 600;
          cursor: pointer;
          opacity: ${validity.allValid ? 1 : 0.6};
          transition: ${prefersReducedMotion ? "none" : "opacity 0.2s"};
        }
        .ccf-submit:hover:not(:disabled) {
          opacity: 0.85;
        }
      `}</style>
    </section>
  );
};

export { CreditCardForm };
export type { CardState, CardValidity };
