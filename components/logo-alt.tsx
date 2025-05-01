interface LogoAltProps {
  size?: number
  className?: string
}

export function LogoAlt({ size = 32, className = "" }: LogoAltProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="32" height="32" rx="6" fill="white" />
      <path
        d="M8 8H24C25.1046 8 26 8.89543 26 10V10C26 11.1046 25.1046 12 24 12H8C6.89543 12 6 11.1046 6 10V10C6 8.89543 6.89543 8 8 8Z"
        fill="#EBF5FF"
        stroke="#3B82F6"
        strokeWidth="1.5"
      />
      <path
        d="M8 14H20C21.1046 14 22 14.8954 22 16V16C22 17.1046 21.1046 18 20 18H8C6.89543 18 6 17.1046 6 16V16C6 14.8954 6.89543 14 8 14Z"
        fill="#EBF5FF"
        stroke="#3B82F6"
        strokeWidth="1.5"
      />
      <path
        d="M8 20H16C17.1046 20 18 20.8954 18 22V22C18 23.1046 17.1046 24 16 24H8C6.89543 24 6 23.1046 6 22V22C6 20.8954 6.89543 20 8 20Z"
        fill="#EBF5FF"
        stroke="#3B82F6"
        strokeWidth="1.5"
      />
      <path d="M24 16L26 16" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="24" cy="22" r="2" fill="#3B82F6" />
    </svg>
  )
}
