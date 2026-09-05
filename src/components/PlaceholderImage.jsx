const PlaceholderImage = ({ Icon, label, index, className = "" }) => {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-[#141724] dark:to-[#0B0D14] ${className}`}
    >
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(100,116,139,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,116,139,0.08)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]"
        aria-hidden="true"
      />

      {Icon && (
        <Icon
          className="w-10 h-10 sm:w-12 sm:h-12 text-[#1A2FFB]/20 dark:text-[#3B54FF]/25 relative z-10"
          aria-hidden="true"
        />
      )}

      <span className="absolute top-2.5 right-3 z-10 font-mono text-[9px] px-2 py-0.5 rounded-full bg-white/70 dark:bg-black/40 text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-white/10 whitespace-nowrap">
        Vista previa próximamente
      </span>

      {label && (
        <span className="absolute bottom-2.5 left-3 right-3 z-10 font-mono text-[10px] text-slate-500 dark:text-slate-500 truncate">
          {typeof index === "number" ? `IMG_${String(index + 1).padStart(2, "0")} // ` : ""}
          {label}
        </span>
      )}
    </div>
  );
};

export default PlaceholderImage;
