"use client";

import { useEffect, useState } from "react";
import { Bell, Maximize, Minimize, Search } from "lucide-react";

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
    <header className="rounded-global border-global border-brand-border-global bg-brand-surface shadow-brand-header relative z-20 flex h-16 shrink-0 items-center gap-x-4 px-4 sm:gap-x-6 sm:px-6 lg:px-8">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1 items-center">
          <h1 className="text-brand-h2 text-brand-text font-bold tracking-wider">
            CALIRA<span className="text-brand-accent drop-shadow-brand">.</span>
          </h1>
        </div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button
            type="button"
            onClick={toggleFullscreen}
            className="text-brand-text/70 hover:text-brand-primary -m-2.5 p-2.5 transition-colors"
            title="Toggle Fullscreen"
          >
            <span className="sr-only">Toggle fullscreen</span>
            {isFullscreen ? (
              <Minimize
                className="h-5 w-5 transition-transform hover:scale-110"
                aria-hidden="true"
              />
            ) : (
              <Maximize
                className="h-5 w-5 transition-transform hover:scale-110"
                aria-hidden="true"
              />
            )}
          </button>

          <button
            type="button"
            className="text-brand-text/70 hover:text-brand-primary -m-2.5 p-2.5 transition-colors"
          >
            <span className="sr-only">View notifications</span>
            <Bell className="h-5 w-5 hover:animate-bounce" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div
            className="lg:bg-brand-border-global hidden lg:block lg:h-6 lg:w-px"
            aria-hidden="true"
          />

          {/* Profile dropdown */}
          <div className="group hover:bg-brand-secondary-hover rounded-global flex cursor-pointer items-center gap-x-4 p-1.5 transition-all">
            <img
              className="rounded-global group-hover:ring-brand-accent/50 h-8 w-8 bg-white ring-2 ring-transparent transition-all"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <span className="hidden lg:flex lg:items-center">
              <span
                className="text-brand-body text-brand-text group-hover:text-brand-primary leading-6 font-semibold transition-colors"
                aria-hidden="true"
              >
                Admin User
              </span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
