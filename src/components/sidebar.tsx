// src/components/Sidebar.tsx
import { NavLink, Outlet } from 'react-router-dom'
import '../styles/sidebar.css'

export default function Sidebar() {
  return (
    <div className="layout">
      <aside className="layout__sidebar">
        <h2>Sidebar</h2>
        <nav>
          <ul>
            <li>
              <NavLink to="dashboard" end>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="impr" end>Impr</NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <section className="layout__content">
        <Outlet />
      </section>
    </div>
  )
}
