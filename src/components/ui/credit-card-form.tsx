// Source: 21st.dev - CreditCardForm
// Adapted: monochrome palette (#050505/#FFFFFF/#6B6B6B/#9B9B9B/#E5E5E5),
//          sharp edges (no rounded corners), reduced-motion safe, CSS 3D flip card

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

  const highlightClass = (() => {
    switch (focusField) {
      case "number":
        return "ccf-highlight--number";
      case "holder":
        return "ccf-highlight--holder";
      case "expire":
        return "ccf-highlight--expire";
      case "cvv":
        return "ccf-highlight--cvv";
      default:
        return "ccf-highlight--hidden";
    }
  })();

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
        <section
          className={`ccf-card ${flip ? "ccf-card--flip" : ""}`}
          style={{ transition: transitionDuration }}
        >
          <div className={`ccf-highlight ${highlightClass}`} />

          {/* FRONT */}
          <section className="ccf-card__front">
            <div className="ccf-card__header">
              <div className="ccf-card__brand">VAULT MAISON</div>
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
                <div className="ccf-card__section-title">Card Holder</div>
                <div className="ccf-card__holder-name">
                  {holder || "NAME ON CARD"}
                </div>
              </div>
              <div className="ccf-card__expires-block">
                <div className="ccf-card__section-title">Expires</div>
                <span>{month || "MM"}</span>/
                <span>{year ? year.slice(-2) : "YY"}</span>
              </div>
            </div>
          </section>

          {/* BACK */}
          <section className="ccf-card__back">
            <div className="ccf-card__magstripe" />
            <div className="ccf-card__cvv-area">
              <span>CVV</span>
              <div className="ccf-card__cvv-field">
                {"*".repeat(cvv.length)}
              </div>
            </div>
          </section>
        </section>

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
          max-width: 1000px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          align-items: start;
        }
        @media (max-width: 920px) {
          .ccf-wrap {
            grid-template-columns: 1fr;
          }
        }

        /* ── Highlight overlay ── */
        .ccf-highlight {
          position: absolute;
          border: 1px solid #ffffff;
          z-index: 1;
          width: 0;
          height: 0;
          top: 0;
          left: 0;
          box-shadow: 0 0 5px rgba(255, 255, 255, 0.4);
          transition: ${prefersReducedMotion ? "none" : "0.3s"};
        }
        .ccf-highlight--number {
          width: 346px;
          height: 40px;
          top: 92px;
          left: 18px;
        }
        .ccf-highlight--holder {
          width: 264px;
          height: 56px;
          top: 156px;
          left: 18px;
        }
        .ccf-highlight--expire {
          width: 86px;
          height: 56px;
          top: 156px;
          left: 323px;
        }
        .ccf-highlight--cvv {
          width: 381px;
          height: 91px;
          top: 83px;
          left: 18px;
        }
        .ccf-highlight--hidden {
          display: none;
        }

        /* ── Card ── */
        .ccf-card {
          position: relative;
          width: 100%;
          max-width: 420px;
          margin: 0 auto;
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        .ccf-card--flip {
          transform: rotateY(180deg);
        }

        .ccf-card__front,
        .ccf-card__back {
          width: 100%;
          max-width: 420px;
          height: 233px;
          padding: 24px 30px 30px;
          background: linear-gradient(to right bottom, #050505, #1a1a1a);
          box-shadow: 0 33px 50px -15px rgba(5, 5, 5, 0.5);
          color: #ffffff;
          overflow: hidden;
          margin: 0 auto;
          backface-visibility: hidden;
          position: relative;
        }
        @media (max-width: 450px) {
          .ccf-card__front,
          .ccf-card__back {
            padding: 12px 14px 16px;
            height: 206px;
          }
          .ccf-highlight--number {
            width: 300px;
            left: 14px;
          }
          .ccf-highlight--holder {
            width: 220px;
            left: 14px;
          }
          .ccf-highlight--expire {
            left: 280px;
          }
          .ccf-highlight--cvv {
            width: 330px;
            left: 14px;
          }
        }

        .ccf-card__back {
          position: absolute;
          top: 0;
          left: 0;
          transform: rotateY(180deg);
          padding: 24px 0 0;
        }

        /* Monochrome accent rings (subtle white glow) */
        .ccf-card__front::before,
        .ccf-card__back::before {
          content: "";
          position: absolute;
          border: 16px solid rgba(255, 255, 255, 0.08);
          border-radius: 100%;
          left: -17%;
          top: -45px;
          height: 300px;
          width: 300px;
          filter: blur(13px);
        }
        .ccf-card__front::after,
        .ccf-card__back::after {
          content: "";
          position: absolute;
          border: 16px solid rgba(255, 255, 255, 0.05);
          border-radius: 100%;
          width: 300px;
          top: 55%;
          left: -200px;
          height: 300px;
          filter: blur(13px);
        }

        /* ── Card inner elements ── */
        .ccf-card__magstripe {
          height: 40px;
          width: 100%;
          background-color: #6b6b6b;
          position: relative;
          z-index: 1;
        }
        .ccf-card__cvv-area {
          position: relative;
          z-index: 1;
          margin-top: 24px;
          padding: 0 32px;
          display: flex;
          flex-direction: column;
          align-items: end;
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .ccf-card__cvv-field {
          margin-top: 6px;
          background-color: #ffffff;
          height: 44px;
          width: 100%;
          color: #050505;
          display: flex;
          align-items: center;
          justify-content: end;
          padding: 0 12px;
          font-size: 25px;
          line-height: 21px;
        }
        .ccf-card__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-weight: 600;
          margin-bottom: 32px;
          position: relative;
          z-index: 1;
        }
        .ccf-card__brand {
          font-size: 14px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        .ccf-card__number {
          font-size: 22px;
          margin-bottom: 32px;
          position: relative;
          z-index: 1;
          display: flex;
          height: 33px;
          overflow: hidden;
          color: #ffffff;
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
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .ccf-card__holder-name {
          font-size: 14px;
          margin-top: 4px;
        }
        .ccf-card__expires-block {
          font-size: 14px;
        }

        /* ── Form ── */
        .ccf-form {
          background: #ffffff;
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          padding: 24px;
          border: 1px solid #e5e5e5;
          box-shadow: 0 0 40px rgba(5, 5, 5, 0.08);
          display: grid;
          gap: 12px;
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
