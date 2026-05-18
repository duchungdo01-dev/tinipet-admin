'use client';

export default function ShippingPage() {
  const mockShipments = [
    { trackingNo: 'GHTK123456789', orderId: 'SON00153', carrier: 'Giao Hàng Tiết Kiệm', status: 'Đang lấy hàng', fee: 35000 },
    { trackingNo: 'VTP987654321', orderId: 'SON00151', carrier: 'Viettel Post', status: 'Đang giao', fee: 22000 },
    { trackingNo: 'GHN555666777', orderId: 'SON00148', carrier: 'Giao Hàng Nhanh', status: 'Giao thành công', fee: 40000 },
    { trackingNo: 'JNT111222333', orderId: 'SON00145', carrier: 'J&T Express', status: 'Chờ lấy hàng', fee: 30000 },
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Giao thành công': return 'badge-success';
      case 'Đang lấy hàng': 
      case 'Đang giao': return 'badge-info';
      case 'Chờ lấy hàng': return 'badge-warning';
      case 'Giao thất bại': return 'badge-default';
      default: return 'badge-default';
    }
  };

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
        <h1 className="page-title" style={{marginBottom: 0}}>Quản lý Vận chuyển</h1>
        <button className="btn btn-primary" style={{display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px'}}>
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
          Tạo phiếu giao
        </button>
      </div>
      
      <div className="card">
        <div style={{display: 'flex', gap: '16px', marginBottom: '20px'}}>
          <div className="form-group" style={{marginBottom: 0, flex: 1}}>
            <div style={{position: 'relative'}}>
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{position: 'absolute', left: '12px', top: '10px', color: 'var(--text-secondary)'}}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <input type="text" className="form-control" placeholder="Tìm kiếm theo mã vận đơn, mã đơn hàng..." style={{paddingLeft: '36px'}} />
            </div>
          </div>
          <button className="btn btn-outline">Lọc nhà vận chuyển</button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Mã Vận Đơn</th>
                <th>Mã Đơn Hàng</th>
                <th>Đơn vị vận chuyển</th>
                <th>Trạng thái</th>
                <th style={{textAlign: 'right'}}>Phí vận chuyển</th>
              </tr>
            </thead>
            <tbody>
              {mockShipments.map((shipment, idx) => (
                <tr key={idx} style={{cursor: 'pointer'}} className="menu-item-hover">
                  <td style={{fontWeight: 500}}>{shipment.trackingNo}</td>
                  <td style={{color: 'var(--color-primary)'}}>{shipment.orderId}</td>
                  <td>{shipment.carrier}</td>
                  <td><span className={`badge ${getStatusBadge(shipment.status)}`}>{shipment.status}</span></td>
                  <td style={{textAlign: 'right', fontWeight: 500}}>{formatCurrency(shipment.fee)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
