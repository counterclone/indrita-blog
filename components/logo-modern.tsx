interface LogoModernProps {
  size?: number
  className?: string
}

export function LogoModern({ size = 32, className = "" }: LogoModernProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="32" height="32" rx="16" fill="white" />
      <path d="M9 10L23 10" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M9 16L19 16" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M9 22L15 22" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23 16C23 14.8954 23.8954 14 25 14C26.1046 14 27 14.8954 27 16C27 17.1046 26.1046 18 25 18C23.8954 18 23 17.1046 23 16Z"
        fill="#3B82F6"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 22C19 20.8954 19.8954 20 21 20C22.1046 20 23 20.8954 23 22C23 23.1046 22.1046 24 21 24C19.8954 24 19 23.1046 19 22Z"
        fill="#3B82F6"
      />
    </svg>
  )
}
