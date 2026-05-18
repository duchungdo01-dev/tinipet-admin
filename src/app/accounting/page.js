'use client';

export default function AccountingPage() {
  const mockTransactions = [
    { id: 'PT00153', type: 'Thu', date: '2023-10-25 14:30', amount: 5000000, status: 'Hoàn thành' },
    { id: 'PC00089', type: 'Chi', date: '2023-10-25 10:15', amount: 1500000, status: 'Hoàn thành' },
    { id: 'PT00152', type: 'Thu', date: '2023-10-24 16:45', amount: 250000, status: 'Đang xử lý' },
    { id: 'PC00088', type: 'Chi', date: '2023-10-24 09:00', amount: 3000000, status: 'Từ chối' },
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Hoàn thành': return 'badge-success';
      case 'Đang xử lý': return 'badge-warning';
      case 'Từ chối': return 'badge-default';
      default: return 'badge-default';
    }
  };

  const getTypeColor = (type) => {
    return type === 'Thu' ? '#059669' : '#dc2626';
  };

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
        <h1 className="page-title" style={{marginBottom: 0}}>Quản lý Kế toán</h1>
        <div style={{display: 'flex', gap: '12px'}}>
          <button className="btn btn-outline" style={{display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', color: '#dc2626', borderColor: '#fca5a5'}}>
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4M4 12l6-6m-6 6l6 6"></path></svg>
            Tạo phiếu chi
          </button>
          <button className="btn btn-primary" style={{display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px'}}>
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            Tạo phiếu thu
          </button>
        </div>
      </div>
      
      <div className="card">
        <div style={{display: 'flex', gap: '16px', marginBottom: '20px'}}>
          <div className="form-group" style={{marginBottom: 0, flex: 1}}>
            <div style={{position: 'relative'}}>
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{position: 'absolute', left: '12px', top: '10px', color: 'var(--text-secondary)'}}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <input type="text" className="form-control" placeholder="Tìm kiếm theo mã phiếu..." style={{paddingLeft: '36px'}} />
            </div>
          </div>
          <button className="btn btn-outline">Lọc thời gian</button>
          <button className="btn btn-outline">Loại phiếu</button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Mã Phiếu</th>
                <th>Loại</th>
                <th>Thời gian</th>
                <th>Trạng thái</th>
                <th style={{textAlign: 'right'}}>Số tiền</th>
              </tr>
            </thead>
            <tbody>
              {mockTransactions.map((transaction, idx) => (
                <tr key={idx} style={{cursor: 'pointer'}} className="menu-item-hover">
                  <td style={{color: 'var(--color-primary)', fontWeight: 500}}>{transaction.id}</td>
                  <td style={{color: getTypeColor(transaction.type), fontWeight: 600}}>{transaction.type}</td>
                  <td>{transaction.date}</td>
                  <td><span className={`badge ${getStatusBadge(transaction.status)}`}>{transaction.status}</span></td>
                  <td style={{textAlign: 'right', fontWeight: 500}}>{formatCurrency(transaction.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
