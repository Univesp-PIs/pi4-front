export function SkeletonDashboard() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-screen-xl animate-pulse flex flex-col gap-16 px-4 xl:px-0 py-4 lg:py-20">
        {/* Gráficos */}
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          <div className="w-full h-64 bg-slate-300 rounded-md" />
          <div className="w-full h-64 bg-slate-300 rounded-md" />
        </div>

        {/* Cards de estatísticas + botão + ícone de reload */}
        <div className="flex flex-wrap justify-between items-center gap-6 w-full">
          <div className="w-full sm:w-[180px] h-24 bg-slate-300 rounded-xl" />
          <div className="w-full sm:w-[180px] h-24 bg-slate-300 rounded-xl" />
          <div className="w-12 h-12 bg-slate-300 rounded-full" />
          <div className="w-full sm:w-[180px] h-24 bg-slate-300 rounded-xl" />
          <div className="w-full sm:w-[180px] h-24 bg-slate-300 rounded-xl" />
        </div>

        {/* Botão "Ver projetos" */}
        <div className="w-[120px] h-10 bg-slate-300 rounded-md mx-auto" />
      </div>
    </div>
  )
}
