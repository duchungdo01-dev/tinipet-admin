import './globals.css';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';

export const metadata = {
  title: 'Tinipet | Tổng quan',
  description: 'Admin Dashboard for Tinipet',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <div className="layout-container">
          
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <main className="main-wrapper">
            
            {/* Header */}
            <header className="header">
              <div className="header-search">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <input type="text" placeholder="Tìm kiếm (Ctrl + K)" />
              </div>
              <div className="header-actions">
                <span>Trợ giúp</span>
                <span>🔔</span>
                <div className="user-profile">
                  <div className="avatar">Ti</div>
                  <span>Admin Tinipet</span>
                </div>
              </div>
            </header>

            {/* Scrollable Content */}
            <div className="content-area">
              {children}
            </div>

          </main>
        </div>
      </body>
    </html>
  );
}
