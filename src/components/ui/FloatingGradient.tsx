export function FloatingGradient() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute left-1/2 top-[-10%] h-[36rem] w-[36rem] -translate-x-1/2 animate-float rounded-full bg-accent/25 blur-[120px]" />
      <div className="absolute bottom-[-15%] right-[-10%] h-[30rem] w-[30rem] animate-float-delayed rounded-full bg-accent-secondary/20 blur-[120px]" />
      <div className="absolute -left-1/4 bottom-[10%] h-[24rem] w-[24rem] animate-float rounded-full bg-accent/10 blur-[100px]" />
    </div>
  );
}
