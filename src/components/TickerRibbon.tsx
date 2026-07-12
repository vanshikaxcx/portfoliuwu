interface TickerRibbonProps {
  items: string[]
  reverse?: boolean
  light?: boolean
}

export default function TickerRibbon({ items, reverse, light }: TickerRibbonProps) {
  const color = light ? 'text-[#0C0C0C]' : 'text-[#D7E2EA]'
  const half = (
    <>
      {items.map((item, i) => (
        <span
          key={i}
          className={`${color} font-black uppercase tracking-tight inline-flex items-center`}
          style={{ fontSize: 'clamp(1.5rem, 4vw, 3.5rem)' }}
        >
          {item}
          <span className="mx-5 text-[#B600A8]" aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </>
  )

  return (
    <div
      className={`overflow-hidden py-6 ${light ? 'bg-white' : 'bg-[#0C0C0C]'}`}
      aria-hidden="true"
    >
      <div className={`ticker-track ${reverse ? 'reverse' : ''}`}>
        <span className="inline-flex">{half}</span>
        <span className="inline-flex">{half}</span>
      </div>
    </div>
  )
}
