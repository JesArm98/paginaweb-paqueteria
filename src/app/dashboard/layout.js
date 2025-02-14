"use client";

import { useState } from "react";
import Sidebar from "@/ui/components/Sidebar/Sidebar";
import DashboardNavbar from "@/ui/components/DashboardNavbar/DashboardNavbar";
import Footer from "@/ui/sections/Footer/Footer";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="es">
      <body>
        <div className="dashboard-layout" style={{ display: "flex", minHeight: "100vh" }}>
          {/* Sidebar con control de apertura */}
          <Sidebar isOpen={isSidebarOpen} />

          {/* Contenedor principal, se ajusta según el estado del Sidebar */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              transition: "margin 0.3s ease", // Transición suave
            }}
          >
            <DashboardNavbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
            <main style={{ flex: 1, padding: "20px" }}>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
