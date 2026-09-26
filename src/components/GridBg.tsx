export function GridBg({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-svh overflow-hidden bg-black text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(126,184,220,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(126,184,220,0.045) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#7EB8DC]/10 to-transparent" />
      <div className="relative">{children}</div>
    </div>
  )
}
