import { Outlet } from "react-router-dom";

import { DesktopSidebar } from "./DesktopSidebar";
import { MobileBottomNav } from "./MobileBottomNav";
import { TopNavbar } from "./TopNavbar";
import { GradientBackground } from "../common/GradientBackground";

export function MainLayout() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-text">
      <GradientBackground />

      <DesktopSidebar />

      <div className="lg:pl-64">
        <TopNavbar />

        <main className="mx-auto w-full max-w-[1240px] px-6 pb-32 pt-6 lg:px-8">
          <Outlet />
        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
}
