const HeroBackground = () => {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(182,33,42,0.14),_transparent_42%),linear-gradient(135deg,_#fff7f6_0%,_#fffdfd_50%,_#fef2f2_100%)]" />
      <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle,_rgba(227,190,187,0.5)_1px,_transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute -left-16 top-10 hidden h-72 w-72 rounded-full bg-red-200/70 blur-3xl sm:block" />
      <div className="absolute right-0 top-0 hidden h-[30rem] w-[30rem] rounded-full bg-pink-200/50 blur-3xl sm:block" />
      <div className="absolute bottom-0 left-1/3 hidden h-72 w-72 rounded-full bg-rose-100/80 blur-3xl sm:block" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0)_40%,rgba(255,255,255,0.35)_100%)]" />
    </>
  );
};

export default HeroBackground;
