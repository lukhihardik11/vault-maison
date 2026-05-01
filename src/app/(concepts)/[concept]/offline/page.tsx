export default function OfflinePage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        backgroundColor: '#FDFBF7',
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
        textAlign: 'center',
      }}
    >
      {/* Decorative gold line */}
      <div
        style={{
          width: '48px',
          height: '1px',
          backgroundColor: '#C9A96E',
          marginBottom: '32px',
        }}
      />

      <h1
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(28px, 5vw, 42px)',
          fontWeight: 300,
          color: '#2C2420',
          marginBottom: '16px',
          letterSpacing: '0.02em',
        }}
      >
        You&apos;re Offline
      </h1>

      <p
        style={{
          fontSize: '14px',
          color: '#6B5E54',
          lineHeight: 1.7,
          maxWidth: '320px',
          marginBottom: '32px',
        }}
      >
        It appears you&apos;ve lost your connection. Please check your network
        and try again. Your wishlist and cart are saved locally.
      </p>

      <button
        onClick={() => window.location.reload()}
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          padding: '14px 32px',
          backgroundColor: '#2C2420',
          color: '#FFFFFF',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Try Again
      </button>

      {/* Bottom decorative line */}
      <div
        style={{
          width: '24px',
          height: '1px',
          backgroundColor: '#C9A96E',
          marginTop: '48px',
        }}
      />
    </div>
  )
}
