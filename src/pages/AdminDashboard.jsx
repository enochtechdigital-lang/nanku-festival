import {
  LayoutDashboard,
  Users,
  Vote,
  CreditCard,
  UserRound,
  Settings,
  Menu,
  X,
  Crown,
  LogOut,
} from 'lucide-react';

import { useState } from 'react';
import './AdminDashboard.css';

const adminNavigation = [
  {
    label: 'Overview',
    icon: LayoutDashboard,
  },
  {
    label: 'Contestants',
    icon: Users,
  },
  {
    label: 'Votes',
    icon: Vote,
  },
  {
    label: 'Payment Verification',
    icon: CreditCard,
  },
  {
    label: 'Voters',
    icon: UserRound,
  },
  {
    label: 'Settings',
    icon: Settings,
  },
];

function AdminDashboard() {
  const [activePage, setActivePage] = useState('Overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="admin-dashboard">
      {/* Sidebar */}
      <aside
        className={`admin-sidebar ${
          sidebarOpen ? 'admin-sidebar-open' : ''
        }`}
      >
        <div className="admin-brand">
          <div className="admin-brand-icon">
            <Crown size={25} />
          </div>

          <div className="admin-brand-text">
            <h2>NANKU</h2>
            <span>FESTIVAL ADMIN</span>
          </div>

          <button
            type="button"
            className="admin-close-sidebar"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation menu"
          >
            <X size={22} />
          </button>
        </div>

        <div className="admin-sidebar-label">
          MANAGEMENT
        </div>

        <nav className="admin-navigation">
          {adminNavigation.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.label;

            return (
              <button
                type="button"
                key={item.label}
                className={`admin-nav-item ${
                  isActive ? 'admin-nav-active' : ''
                }`}
                onClick={() => {
                  setActivePage(item.label);
                  setSidebarOpen(false);
                }}
              >
                <Icon size={19} strokeWidth={1.8} />

                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="admin-sidebar-bottom">
          <div className="admin-profile">
            <div className="admin-avatar">A</div>

            <div className="admin-profile-info">
              <strong>Festival Admin</strong>
              <span>Administrator</span>
            </div>
          </div>

          <button
            type="button"
            className="admin-logout"
            onClick={() => {
              alert(
                'Logout will be connected to authentication later.'
              );
            }}
          >
            <LogOut size={18} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <button
          type="button"
          className="admin-sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close navigation menu"
        />
      )}

      {/* Main content */}
      <section className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              type="button"
              className="admin-menu-toggle"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu size={23} />
            </button>

            <div>
              <p className="admin-topbar-eyebrow">
                NKANU CULTURAL HERITAGE FESTIVAL
              </p>

              <h1>{activePage}</h1>
            </div>
          </div>

          <div className="admin-topbar-badge">
            <span className="admin-status-dot" />
            Admin Panel
          </div>
        </header>

        <div className="admin-content">
          {activePage === 'Overview' ? (
            <>
              <section className="admin-welcome">
                <div>
                  <span>ADMINISTRATION PANEL</span>

                  <h2>
                    Welcome to the <span>Dashboard</span>
                  </h2>

                  <p>
                    Manage festival activities and monitor your
                    competition from one place.
                  </p>
                </div>

                <div className="admin-welcome-crown">
                  <Crown size={48} strokeWidth={1.2} />
                </div>
              </section>

              <section className="admin-stats">
                <article className="admin-stat-card">
                  <div className="admin-stat-icon">
                    <Users size={22} />
                  </div>

                  <p>Total Contestants</p>
                  <h3>0</h3>

                  <span>Registered contestants</span>
                </article>

                <article className="admin-stat-card">
                  <div className="admin-stat-icon">
                    <Vote size={22} />
                  </div>

                  <p>Total Votes</p>
                  <h3>0</h3>

                  <span>Verified votes</span>
                </article>

                <article className="admin-stat-card">
                  <div className="admin-stat-icon">
                    <CreditCard size={22} />
                  </div>

                  <p>Pending Payments</p>
                  <h3>0</h3>

                  <span>Awaiting review</span>
                </article>

                <article className="admin-stat-card">
                  <div className="admin-stat-icon">
                    <UserRound size={22} />
                  </div>

                  <p>Registered Voters</p>
                  <h3>0</h3>

                  <span>Total voter accounts</span>
                </article>
              </section>

              <section className="admin-panel-card">
                <div className="admin-panel-heading">
                  <div>
                    <h2>Festival Management</h2>

                    <p>
                      Choose a section from the sidebar to continue.
                    </p>
                  </div>
                </div>

                <div className="admin-quick-actions">
                  <button
                    type="button"
                    onClick={() =>
                      setActivePage('Contestants')
                    }
                  >
                    <Users size={20} />
                    <span>Manage Contestants</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setActivePage('Payment Verification')
                    }
                  >
                    <CreditCard size={20} />
                    <span>Review Payments</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActivePage('Votes')}
                  >
                    <Vote size={20} />
                    <span>Monitor Votes</span>
                  </button>
                </div>
              </section>
            </>
          ) : (
            <section className="admin-panel-card admin-placeholder">
              <div className="admin-placeholder-icon">
                {(() => {
                  const selectedItem = adminNavigation.find(
                    (item) => item.label === activePage
                  );

                  const Icon = selectedItem?.icon || Settings;

                  return <Icon size={30} />;
                })()}
              </div>

              <h2>{activePage}</h2>

              <p>
                This section is ready for development. We will
                implement its functionality in the next stages.
              </p>

              <button
                type="button"
                onClick={() => setActivePage('Overview')}
              >
                Return to Overview
              </button>
            </section>
          )}
        </div>

        <footer className="admin-footer">
          <p>
            © {new Date().getFullYear()} Nanku Cultural Heritage
            Festival
          </p>

          <span>Administration Panel</span>
        </footer>
      </section>
    </main>
  );
}

export default AdminDashboard;