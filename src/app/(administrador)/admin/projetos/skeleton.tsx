export function SkeletonProject() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-screen-xl animate-pulse flex flex-col gap-16 items-center justify-center px-4 xl:px-0 py-4 lg:py-20">
        <div className="w-full max-w-screen-md flex flex-col gap-4">
          <div className="w-1/5 h-5 rounded-md bg-slate-300" />
          <div className="w-full h-10 rounded-md bg-slate-300" />
          <div className="flex gap-8">
            <div className="w-full md:w-1/2 flex flex-col gap-4">
              <div className="w-1/3 h-5 rounded-md bg-slate-300" />
              <div className="w-full h-10 rounded-md bg-slate-300" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-4">
              <div className="w-1/3 h-5 rounded-md bg-slate-300" />
              <div className="w-full h-10 rounded-md bg-slate-300" />
            </div>
          </div>
        </div>
        <div className="w-full flex gap-4 flex-wrap items-start">
          {Array.from({ length: 3 }).map((_, index) => (
            <div className="flex flex-col gap-4 w-3/12" key={index}>
              <div className="w-full h-10 rounded-md bg-slate-300" />
              <div className="w-full h-10 rounded-md bg-slate-300" />
              <div className="w-full h-10 rounded-md bg-slate-300" />
              <div className="w-full h-32 rounded-md bg-slate-300" />
            </div>
          ))}
          <div className="w-10 h-10 rounded-full bg-slate-300" />
        </div>
      </div>
    </div>
  )
}
