import { Link } from 'react-router-dom'

type Props = {
  className?: string
  withIcon?: boolean
  href?: string | null
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: { wordH: 18, iconSize: 24, gap: 8, fontSize: 22 },
  md: { wordH: 22, iconSize: 32, gap: 10, fontSize: 26 },
  lg: { wordH: 28, iconSize: 40, gap: 12, fontSize: 34 },
}

function IconMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="wm-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#059669" />
          <stop offset="1" stopColor="#10B981" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill="url(#wm-grad)" />
      <text
        x="20"
        y="28"
        textAnchor="middle"
        fontFamily="Outfit, system-ui, sans-serif"
        fontWeight={800}
        fontSize={18}
        fill="#FFFFFF"
        letterSpacing="-0.5"
      >
        gr
      </text>
    </svg>
  )
}

export default function Wordmark({ className = '', withIcon = true, href = '/', size = 'md' }: Props) {
  const s = sizes[size]
  const content = (
    <span
      className={`inline-flex items-center select-none ${className}`}
      style={{ gap: s.gap }}
      aria-label="getranked"
    >
      {withIcon && <IconMark size={s.iconSize} />}
      <span
        className="font-outfit font-extrabold leading-none tracking-tight"
        style={{ fontSize: s.fontSize, letterSpacing: '-0.04em' }}
      >
        <span style={{ color: 'var(--accent-amber)' }}>get</span>
        <span style={{ color: 'currentColor' }}>ranked</span>
      </span>
    </span>
  )
  if (href) return <Link to={href} className="inline-flex items-center">{content}</Link>
  return content
}
