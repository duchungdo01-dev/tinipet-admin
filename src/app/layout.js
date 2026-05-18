import './globals.css';
import Link from 'next/link';

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
          <aside className="sidebar">
            <div className="sidebar-brand">TINIPET</div>
            <button className="quick-action-btn">Bán hàng</button>
            <div className="sidebar-menu">
              <Link href="/" className="menu-item active">Tổng quan</Link>
              <div className="menu-item">Đơn hàng</div>
              <div className="menu-item">Vận chuyển</div>
              <Link href="/products" className="menu-item">Sản phẩm</Link>
              <div className="menu-item">Quản lý kho</div>
              <div className="menu-item">Khách hàng</div>
              
              <div className="menu-group" style={{marginTop: '24px'}}>
                <div className="menu-title">KẾ TOÁN VÀ THUẾ</div>
                <Link href="/invoices" className="menu-item">Sapo Invoice</Link>
                <div className="menu-item">Sapo Accounting</div>
              </div>
            </div>
          </aside>

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
