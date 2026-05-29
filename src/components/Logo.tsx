export const LOGO_ICON_SRC = '/royaldale-icon.png';

type LogoProps = {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  onDark?: boolean;
};

const iconSize = {
  sm: 'h-12 w-12 sm:h-14 sm:w-14',
  md: 'h-16 w-16 sm:h-18 sm:w-18',
  lg: 'h-20 w-20 sm:h-24 sm:w-24',
};

const wordmarkSize = {
  sm: 'text-lg sm:text-xl',
  md: 'text-2xl sm:text-3xl',
  lg: 'text-3xl sm:text-4xl',
};

export default function Logo({
  className = '',
  size = 'md',
  showTagline = false,
  onDark = false,
}: LogoProps) {
  const wordmarkColor = onDark ? 'text-white' : 'text-secondary-700';
  const taglineColor = onDark ? 'text-primary-100/80' : 'text-secondary-600';

  return (
    <div className={`flex items-center gap-3 min-w-0 ${className}`}>
      <img
        src={LOGO_ICON_SRC}
        alt="ROYALDALE icon"
        className={`${iconSize[size]} flex-shrink-0`}
        decoding="async"
      />

      <div className="flex flex-col min-w-0 leading-none">
        <span className={`font-serif font-semibold tracking-[0.18em] uppercase ${wordmarkSize[size]} ${wordmarkColor}`}>
          ROYAL DALE
        </span>
        {showTagline && (
          <span className={`text-[10px] sm:text-xs tracking-[0.14em] mt-1 text-left ${taglineColor}`}>
            Production Since 2018
          </span>
        )}
      </div>
    </div>
  );
}
