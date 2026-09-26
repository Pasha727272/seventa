export function BrandMark({
  size = 32,
  className = '',
}: {
  size?: number
  className?: string
}) {
  return (
    <img
      src="/logo.png"
      alt="Seventa"
      width={size}
      height={size}
      className={`rounded-xl object-cover ${className}`}
      style={{ width: size, height: size }}
    />
  )
}
