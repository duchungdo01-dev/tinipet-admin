'use client';

export default function CustomersPage() {
  const mockCustomers = [
    { id: 'KH001', name: 'Nguyễn Văn A', phone: '0901234567', group: 'VIP', totalSpend: 5400000 },
    { id: 'KH002', name: 'Trần Thị B', phone: '0912345678', group: 'Khách sỉ', totalSpend: 12500000 },
    { id: 'KH003', name: 'Lê Văn C', phone: '0987654321', group: 'Khách lẻ', totalSpend: 350000 },
    { id: 'KH004', name: 'Phạm Thị D', phone: '0977665544', group: 'Khách lẻ', totalSpend: 850000 },
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const getGroupBadge = (group) => {
    switch (group) {
      case 'VIP': return 'badge-success';
      case 'Khách sỉ': return 'badge-info';
      default: return 'badge-default';
    }
  };

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
        <h1 className="page-title" style={{marginBottom: 0}}>Quản lý Khách hàng</h1>
        <button className="btn btn-primary" style={{display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px'}}>
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
          Thêm khách hàng
        </button>
      </div>
      
      <div className="card">
        <div style={{display: 'flex', gap: '16px', marginBottom: '20px'}}>
          <div className="form-group" style={{marginBottom: 0, flex: 1}}>
            <div style={{position: 'relative'}}>
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{position: 'absolute', left: '12px', top: '10px', color: 'var(--text-secondary)'}}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <input type="text" className="form-control" placeholder="Tìm kiếm theo mã, tên, SĐT khách hàng..." style={{paddingLeft: '36px'}} />
            </div>
          </div>
          <button className="btn btn-outline">Nhóm khách hàng</button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Mã KH</th>
                <th>Tên Khách hàng</th>
                <th>Số điện thoại</th>
                <th>Nhóm khách hàng</th>
                <th style={{textAlign: 'right'}}>Tổng chi tiêu</th>
              </tr>
            </thead>
            <tbody>
              {mockCustomers.map((customer, idx) => (
                <tr key={idx} style={{cursor: 'pointer'}} className="menu-item-hover">
                  <td style={{color: 'var(--color-primary)', fontWeight: 500}}>{customer.id}</td>
                  <td style={{fontWeight: 500}}>{customer.name}</td>
                  <td>{customer.phone}</td>
                  <td><span className={`badge ${getGroupBadge(customer.group)}`}>{customer.group}</span></td>
                  <td style={{textAlign: 'right', fontWeight: 500}}>{formatCurrency(customer.totalSpend)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
