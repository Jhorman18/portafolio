const ScrollSectionStack = ({ children }) => {
  return (
    <div className="relative w-full flex flex-col gap-16 md:gap-24">
      {Array.isArray(children)
        ? children.map((child, index) => (
            <div
              key={index}
              className="w-full transition-all duration-300 rounded-[28px] sm:rounded-[36px] bg-white/70 dark:bg-[#0B0D14]/70 backdrop-blur-sm border border-slate-200/80 dark:border-[#1A1E2E] shadow-sm dark:shadow-[0_10px_40px_rgba(0,0,0,0.3)] overflow-hidden p-2 sm:p-4 md:p-6"
            >
              {child}
            </div>
          ))
        : children}
    </div>
  );
};

export default ScrollSectionStack;
