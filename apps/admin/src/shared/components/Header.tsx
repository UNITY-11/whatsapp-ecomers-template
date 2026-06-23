"use client";

import { useState, useEffect } from "react";
import { Bell, Search, Maximize, Minimize } from "lucide-react";

export function Header() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <header className="flex h-16 shrink-0 items-center gap-x-4 rounded-global border-global border-brand-border-global bg-brand-surface px-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] sm:gap-x-6 sm:px-6 lg:px-8 relative z-20">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form className="relative flex flex-1 items-center" action="#" method="GET">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <div className="relative w-full max-w-lg group">
            <Search
              className="pointer-events-none absolute inset-y-0 left-3 h-full w-5 text-brand-text/50 group-focus-within:text-brand-primary transition-colors"
              aria-hidden="true"
            />
            <input
              id="search-field"
              className="block h-10 w-full rounded-global border-0 bg-brand-input-bg py-0 pl-10 pr-3 text-brand-text placeholder:text-brand-text/50 focus:ring-2 focus:ring-brand-accent/50 focus:bg-brand-secondary-hover transition-all duration-300 sm:text-brand-body"
              placeholder="Search products, orders..."
              type="search"
              name="search"
            />
          </div>
        </form>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button 
            type="button" 
            onClick={toggleFullscreen}
            className="-m-2.5 p-2.5 text-brand-text/70 hover:text-brand-primary transition-colors duration-200"
            title="Toggle Fullscreen"
          >
            <span className="sr-only">Toggle fullscreen</span>
            {isFullscreen ? (
              <Minimize className="h-5 w-5 hover:scale-110 transition-transform" aria-hidden="true" />
            ) : (
              <Maximize className="h-5 w-5 hover:scale-110 transition-transform" aria-hidden="true" />
            )}
          </button>
          
          <button type="button" className="-m-2.5 p-2.5 text-brand-text/70 hover:text-brand-primary transition-colors duration-200">
            <span className="sr-only">View notifications</span>
            <Bell className="h-5 w-5 hover:animate-bounce" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-brand-border-global" aria-hidden="true" />

          {/* Profile dropdown */}
          <div className="flex items-center gap-x-4 cursor-pointer group hover:bg-brand-secondary-hover p-1.5 rounded-global transition-all duration-200">
            <img
              className="h-8 w-8 rounded-global bg-white ring-2 ring-transparent group-hover:ring-brand-accent/50 transition-all duration-300"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <span className="hidden lg:flex lg:items-center">
              <span className="text-brand-body font-semibold leading-6 text-brand-text group-hover:text-brand-primary transition-colors" aria-hidden="true">
                Admin User
              </span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
