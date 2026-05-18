'use client';

export default function OrdersPage() {
  const mockOrders = [
    { id: 'SON00153', customer: 'Nguyễn Văn A', paymentStatus: 'Đã thanh toán', fulfillmentStatus: 'Đang giao', total: 150000 },
    { id: 'SON00152', customer: 'Trần Thị B', paymentStatus: 'Chưa thanh toán', fulfillmentStatus: 'Chưa giao', total: 320000 },
    { id: 'SON00151', customer: 'Lê Văn C', paymentStatus: 'Đã thanh toán', fulfillmentStatus: 'Đã giao', total: 850000 },
    { id: 'SON00150', customer: 'Phạm Thị D', paymentStatus: 'Đã hoàn tiền', fulfillmentStatus: 'Đã huỷ', total: 120000 },
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const getPaymentBadge = (status) => {
    switch (status) {
      case 'Đã thanh toán': return 'badge-success';
      case 'Chưa thanh toán': return 'badge-warning';
      case 'Đã hoàn tiền': return 'badge-info';
      default: return 'badge-default';
    }
  };

  const getFulfillmentBadge = (status) => {
    switch (status) {
      case 'Đã giao': return 'badge-success';
      case 'Đang giao': return 'badge-warning';
      case 'Chưa giao': return 'badge-default';
      case 'Đã huỷ': return 'badge-default';
      default: return 'badge-default';
    }
  };

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
        <h1 className="page-title" style={{marginBottom: 0}}>Danh sách Đơn hàng</h1>
        <button className="btn btn-primary" style={{display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px'}}>
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
          Tạo đơn hàng
        </button>
      </div>
      
      <div className="card">
        <div style={{display: 'flex', gap: '16px', marginBottom: '20px'}}>
          <div className="form-group" style={{marginBottom: 0, flex: 1}}>
            <div style={{position: 'relative'}}>
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{position: 'absolute', left: '12px', top: '10px', color: 'var(--text-secondary)'}}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <input type="text" className="form-control" placeholder="Tìm kiếm đơn hàng theo mã, tên khách hàng..." style={{paddingLeft: '36px'}} />
            </div>
          </div>
          <button className="btn btn-outline">Bộ lọc</button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Mã Đơn Hàng</th>
                <th>Khách hàng</th>
                <th>Trạng thái thanh toán</th>
                <th>Trạng thái giao hàng</th>
                <th style={{textAlign: 'right'}}>Tổng tiền</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order) => (
                <tr key={order.id} style={{cursor: 'pointer'}} className="menu-item-hover">
                  <td style={{color: 'var(--color-primary)', fontWeight: 500}}>{order.id}</td>
                  <td>{order.customer}</td>
                  <td><span className={`badge ${getPaymentBadge(order.paymentStatus)}`}>{order.paymentStatus}</span></td>
                  <td><span className={`badge ${getFulfillmentBadge(order.fulfillmentStatus)}`}>{order.fulfillmentStatus}</span></td>
                  <td style={{textAlign: 'right', fontWeight: 500}}>{formatCurrency(order.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
