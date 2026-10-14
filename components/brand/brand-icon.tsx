/**
 * Audit Cockpits symbol on black (brand kit: 01-logos/com-fundo/ac-simbolo_fundo-preto.svg),
 * inline to avoid a request. Two parallel bars: the cockpit and the audit moving together.
 */
export function BrandIcon({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="1024" height="1024" fill="#0a0907" />
      <path d="M362 302 L542 302 L392 722 L212 722 Z M632 302 L812 302 L662 722 L482 722 Z" fill="#c9a43a" />
    </svg>
  );
}
