export function BrandMark({
  size = 32,
  className = '',
  fill = false,
}: {
  size?: number
  className?: string
  /** Stretch to parent — ignores fixed pixel size */
  fill?: boolean
}) {
  return (
    <img
      src="/crystal.png?v=6"
      alt="Seventa"
      width={fill ? undefined : size}
      height={fill ? undefined : size}
      className={`${fill ? 'h-full w-full object-contain' : 'object-contain'} ${className}`}
      style={fill ? undefined : { width: size, height: size }}
    />
  )
}
