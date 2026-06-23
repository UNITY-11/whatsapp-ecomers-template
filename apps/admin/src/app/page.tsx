export default function AdminDashboard() {
  return (
    <div className="max-w-brand mx-auto flex flex-col gap-8 p-8">
      <div>
        <h1 className="bg-gradient-to-r from-[#1a2e28] to-[#0F4A3A] bg-clip-text text-4xl font-bold tracking-tight text-transparent">
          Dashboard
        </h1>
        <p className="text-brand-text/70 text-brand-h3 mt-2">Welcome to your custom admin panel.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        <div className="group rounded-global border-global border-brand-border-global bg-brand-surface hover:bg-brand-secondary-hover hover:shadow-brand-card-hover relative overflow-hidden p-6 transition-all hover:-translate-y-1">
          <div className="absolute top-0 right-0 p-4 opacity-5 transition-opacity group-hover:opacity-10">
            <svg
              className="text-brand-text h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <div className="relative z-10 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-brand-body text-brand-text/70 font-medium tracking-tight">
              Total Products
            </h3>
          </div>
          <div className="text-brand-text group-hover:text-brand-primary relative z-10 mt-2 text-4xl font-bold transition-colors">
            12
          </div>
        </div>

        <div className="group rounded-global border-global border-brand-border-global bg-brand-surface hover:bg-brand-secondary-hover hover:shadow-brand-card-hover relative overflow-hidden p-6 transition-all hover:-translate-y-1">
          <div className="absolute top-0 right-0 p-4 opacity-5 transition-opacity group-hover:opacity-10">
            <svg
              className="text-brand-text h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <div className="relative z-10 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-brand-body text-brand-text/70 font-medium tracking-tight">
              Active Categories
            </h3>
          </div>
          <div className="text-brand-text group-hover:text-brand-primary relative z-10 mt-2 text-4xl font-bold transition-colors">
            4
          </div>
        </div>
      </div>
    </div>
  );
}
