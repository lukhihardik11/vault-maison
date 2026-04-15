'use client'

interface SizeGuideProps {
  onClose: () => void
  accentColor?: string
  bgColor?: string
  textColor?: string
}

const sizeData = [
  { us: '4', uk: 'H', eu: '46.8', diameter: '14.9mm', circumference: '46.8mm' },
  { us: '4.5', uk: 'I', eu: '47.8', diameter: '15.3mm', circumference: '47.8mm' },
  { us: '5', uk: 'J', eu: '49.3', diameter: '15.7mm', circumference: '49.3mm' },
  { us: '5.5', uk: 'K', eu: '50.3', diameter: '16.1mm', circumference: '50.3mm' },
  { us: '6', uk: 'L', eu: '51.8', diameter: '16.5mm', circumference: '51.8mm' },
  { us: '6.5', uk: 'M', eu: '52.8', diameter: '16.9mm', circumference: '52.8mm' },
  { us: '7', uk: 'N', eu: '54.4', diameter: '17.3mm', circumference: '54.4mm' },
  { us: '7.5', uk: 'O', eu: '55.4', diameter: '17.7mm', circumference: '55.4mm' },
  { us: '8', uk: 'P', eu: '57.0', diameter: '18.1mm', circumference: '57.0mm' },
  { us: '8.5', uk: 'Q', eu: '58.0', diameter: '18.5mm', circumference: '58.0mm' },
  { us: '9', uk: 'R', eu: '59.5', diameter: '18.9mm', circumference: '59.5mm' },
]

export function SizeGuide({ onClose, accentColor = '#D4AF37', bgColor = '#0A0A0A', textColor = '#EAEAEA' }: SizeGuideProps) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8"
        style={{ backgroundColor: bgColor, border: `1px solid ${accentColor}20` }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center"
          style={{ color: textColor }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 4L16 16M16 4L4 16" />
          </svg>
        </button>

        <h2 className="text-xl tracking-widest uppercase mb-2" style={{ color: textColor }}>
          Ring Size Guide
        </h2>
        <p className="text-sm mb-6" style={{ color: `${textColor}80` }}>
          Find your perfect fit using the measurements below.
        </p>

        {/* How to measure */}
        <div className="mb-8 p-4" style={{ backgroundColor: `${accentColor}08`, border: `1px solid ${accentColor}15` }}>
          <h3 className="text-xs tracking-widest uppercase mb-3 font-semibold" style={{ color: accentColor }}>
            How to Measure
          </h3>
          <ol className="space-y-2 text-sm" style={{ color: `${textColor}CC` }}>
            <li>1. Wrap a thin strip of paper around your finger at the base.</li>
            <li>2. Mark where the paper overlaps.</li>
            <li>3. Measure the length in millimeters.</li>
            <li>4. Match the circumference to the table below.</li>
          </ol>
        </div>

        {/* Size table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${accentColor}30` }}>
                {['US', 'UK', 'EU', 'Diameter', 'Circumference'].map(h => (
                  <th
                    key={h}
                    className="py-3 px-3 text-left text-xs tracking-widest uppercase font-normal"
                    style={{ color: accentColor }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sizeData.map((row, i) => (
                <tr
                  key={row.us}
                  style={{
                    borderBottom: `1px solid ${textColor}10`,
                    backgroundColor: i % 2 === 0 ? 'transparent' : `${textColor}05`,
                  }}
                >
                  <td className="py-2.5 px-3 font-medium" style={{ color: textColor }}>{row.us}</td>
                  <td className="py-2.5 px-3" style={{ color: `${textColor}CC` }}>{row.uk}</td>
                  <td className="py-2.5 px-3" style={{ color: `${textColor}CC` }}>{row.eu}</td>
                  <td className="py-2.5 px-3" style={{ color: `${textColor}CC` }}>{row.diameter}</td>
                  <td className="py-2.5 px-3" style={{ color: `${textColor}CC` }}>{row.circumference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs mt-6" style={{ color: `${textColor}60` }}>
          If you are between sizes, we recommend choosing the larger size. All Vault Maison rings include one complimentary resizing within 30 days of purchase.
        </p>
      </div>
    </div>
  )
}
