// src/components/Sidebar.tsx
import { NavLink, Outlet } from 'react-router-dom'
import '@/styles/sidebar.css'
import logo from '@/assets/logo.svg'

// NavLink
const getNavLink = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'layout_link is-active' : 'layout_link'

export default function Sidebar() {
  return (
    <div className="layout">
      <aside className="layout_sidebar">
        <div className="layout_brand">
          <img src={logo} alt="logo" className="layout_brandIcon" />
          <div className="layout_brandText">Performance Test</div>
        </div>
        <div className="layout_divider"></div>
        <nav>
          <ul>
            <li>
              <NavLink to="dashboard" className={getNavLink} end>
                대시보드
              </NavLink>
            </li>
            <li>
              <NavLink to="impr" className={getNavLink} end>
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
  )
}
