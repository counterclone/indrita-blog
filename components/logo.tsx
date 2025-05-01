interface LogoProps {
  size?: number
  className?: string
}

export function Logo({ size = 32, className = "" }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="32" height="32" rx="4" fill="white" />
      <path d="M7 10H25" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M7 16H21" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M7 22H17" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M25 16L27 14L25 12" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
