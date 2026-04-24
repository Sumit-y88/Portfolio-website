export const SectionTitle = ({ eyebrow, title, description, align = "center" }) => (
  <div className={`mx-auto mb-12 max-w-3xl ${align === "center" ? "text-center" : "text-left"}`}>
    {eyebrow && (
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-blue-600 dark:text-cyan-300">
        {eyebrow}
      </p>
    )}
    <h2 className="text-3xl font-black tracking-tight text-slate-950 md:text-5xl dark:text-white">
      {title}
    </h2>
    {description && (
      <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg dark:text-slate-300">
        {description}
      </p>
    )}
  </div>
);
