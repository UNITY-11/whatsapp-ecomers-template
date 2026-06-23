export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-8 p-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-[#1a2e28] to-[#0F4A3A] bg-clip-text text-transparent">Dashboard</h1>
        <p className="text-brand-text/70 mt-2 text-brand-h3">
          Welcome to your custom admin panel.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        <div className="group rounded-global border-global border-brand-border-global bg-brand-surface p-6 transition-all duration-300 hover:bg-brand-secondary-hover hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06),0_0_20px_rgba(15,74,58,0.1)] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <svg className="w-12 h-12 text-brand-text" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
          </div>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <h3 className="tracking-tight text-brand-body font-medium text-brand-text/70">Total Products</h3>
          </div>
          <div className="text-4xl font-bold text-brand-text mt-2 relative z-10 group-hover:text-brand-primary transition-colors">12</div>
        </div>

        <div className="group rounded-global border-global border-brand-border-global bg-brand-surface p-6 transition-all duration-300 hover:bg-brand-secondary-hover hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06),0_0_20px_rgba(15,74,58,0.1)] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <svg className="w-12 h-12 text-brand-text" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          </div>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <h3 className="tracking-tight text-brand-body font-medium text-brand-text/70">Active Categories</h3>
          </div>
          <div className="text-4xl font-bold text-brand-text mt-2 relative z-10 group-hover:text-brand-primary transition-colors">4</div>
        </div>
      </div>
    </div>
  );
}
