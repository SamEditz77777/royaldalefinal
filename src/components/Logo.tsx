export const LOGO_ICON_SRC = '/royaldale-icon.png';

type LogoProps = {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  /** Show “Manufacturing Since 2018” under the wordmark */
  showTagline?: boolean;
  /** Light text for bronze/dark sections */
  onDark?: boolean;
};

const iconClip = {
  sm: 'h-9 w-10 sm:h-10 sm:w-11',
  md: 'h-11 w-12 sm:h-12 sm:w-14',
  lg: 'h-14 w-16 sm:h-16 sm:w-[4.5rem]',
};

const wordmarkSize = {
  sm: 'text-[1.05rem] sm:text-xl',
  md: 'text-xl sm:text-2xl',
  lg: 'text-2xl sm:text-[1.75rem]',
};

export default function Logo({
  className = '',
  size = 'md',
  showTagline = false,
  onDark = false,
}: LogoProps) {
  const wordmarkColor = onDark ? 'text-white' : 'text-bronze-600';
  const taglineColor = onDark ? 'text-ivory-100/80' : 'text-brown-600';

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 min-w-0 ${className}`}>
      {/* Icon mark only — crop stacked wordmark from source asset */}
      <div className={`${iconClip[size]} overflow-hidden flex-shrink-0 relative`} aria-hidden>
        <img
          src={LOGO_ICON_SRC}
          alt=""
          className="absolute top-0 left-0 h-[168%] w-auto max-w-none object-contain object-left-top pointer-events-none select-none"
          width={88}
          height={88}
          decoding="async"
        />
      </div>

      <div className="flex flex-col min-w-0 leading-none">
        <span
          className={`font-serif font-semibold tracking-[0.22em] uppercase ${wordmarkSize[size]} ${wordmarkColor}`}
        >
          ROYALDALE
          <sup className="text-[0.42em] font-normal tracking-normal align-super ml-0.5 opacity-80">®</sup>
        </span>
        {showTagline && (
          <span className={`text-[10px] sm:text-xs tracking-[0.14em] mt-1.5 hidden sm:block ${taglineColor}`}>
            Manufacturing Since 2018
          </span>
        )}
      </div>
    </div>
  );
}
