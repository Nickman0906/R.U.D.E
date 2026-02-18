export const StatusPill = ({ online = true }: { online?: boolean }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs">
    <span className={`h-2 w-2 rounded-full ${online ? "bg-emerald-400" : "bg-red-400"}`} />
    {online ? "online" : "offline"}
  </span>
);
