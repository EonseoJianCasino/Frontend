// src/components/Sidebar.tsx
import { NavLink, Outlet } from "react-router-dom";
import "../styles/sidebar.css";

export default function Sidebar() {
  return (
    <div className="layout">
      <aside className="layout_sidebar">
        <div className="layout_brand">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/c23528196faf0c43a2f9444740f85535c37967c1?placeholderIfAbsent=true"
            alt="Performance icon"
            className="layout_brandIcon"
          />
          <div className="layout_brandText">Performance Test</div>
        </div>
        <div className="layout_divider"></div>
        <nav>
          <ul>
            <li>
              <NavLink
                to="dashboard"
                className={({ isActive }) => (isActive ? "layout_link is-active" : "layout_link")}
                end
              >
                대시보드
              </NavLink>
            </li>
            <li>
              <NavLink
                to="impr"
                className={({ isActive }) => (isActive ? "layout_link is-active" : "layout_link")}
                end
              >
                개선방안 & 효과
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <section className="layout_content">
        <Outlet />
      </section>
    </div>
  );
}
