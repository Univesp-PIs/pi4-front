export function SkeletonOrder() {
  return (
    <div className="w-full animate-pulse flex flex-col gap-4 items-center">
      <div className="py-6 w-full rounded-md bg-slate-300" />

      {Array.from({ length: 2 }).map((_, index) => (
        <div
          className="w-full flex gap-4 items-start justify-center"
          key={index}
        >
          <div className="h-48 w-4 rounded-md bg-slate-300 relative">
            <div className="w-80 absolute left-8 top-0 flex flex-col gap-2">
              <div className="w-full h-4 rounded-md bg-slate-300" />
              <div className="w-4/5 h-4 rounded-md bg-slate-300" />
              <div className="w-3/5 h-4 rounded-md bg-slate-300" />
              <div className="w-2/5 h-4 rounded-md bg-slate-300" />
              <div className="w-1/5 h-4 rounded-md bg-slate-300" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
