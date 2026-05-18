'use client';

export default function InventoryPage() {
  const mockInventory = [
    { sku: 'SP001', name: 'Thức ăn hạt cho chó Royal Canin Poodle Adult 1.5kg', inStock: 150, available: 145, shipping: 5 },
    { sku: 'SP002', name: 'Cát vệ sinh cho mèo Maneki Neko 5L', inStock: 300, available: 290, shipping: 10 },
    { sku: 'SP003', name: 'Sữa tắm cho chó lông trắng Joyce & Dolls 400ml', inStock: 50, available: 50, shipping: 0 },
    { sku: 'SP004', name: 'Pate cho mèo Whiskas vị cá ngừ 85g', inStock: 500, available: 450, shipping: 50 },
  ];

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
        <h1 className="page-title" style={{marginBottom: 0}}>Quản lý Kho</h1>
        <div style={{display: 'flex', gap: '12px'}}>
          <button className="btn btn-outline" style={{display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px'}}>
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
            Nhập file
          </button>
          <button className="btn btn-primary" style={{display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px'}}>
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            Nhập kho
          </button>
        </div>
      </div>
      
      <div className="card">
        <div style={{display: 'flex', gap: '16px', marginBottom: '20px'}}>
          <div className="form-group" style={{marginBottom: 0, flex: 1}}>
            <div style={{position: 'relative'}}>
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{position: 'absolute', left: '12px', top: '10px', color: 'var(--text-secondary)'}}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <input type="text" className="form-control" placeholder="Tìm kiếm theo mã SKU, tên sản phẩm..." style={{paddingLeft: '36px'}} />
            </div>
          </div>
          <button className="btn btn-outline">Lọc chi nhánh</button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Mã SKU</th>
                <th>Tên Sản Phẩm</th>
                <th style={{textAlign: 'right'}}>Tồn kho</th>
                <th style={{textAlign: 'right'}}>Có thể bán</th>
                <th style={{textAlign: 'right'}}>Đang giao</th>
              </tr>
            </thead>
            <tbody>
              {mockInventory.map((item, idx) => (
                <tr key={idx} style={{cursor: 'pointer'}} className="menu-item-hover">
                  <td style={{color: 'var(--color-primary)', fontWeight: 500}}>{item.sku}</td>
                  <td>{item.name}</td>
                  <td style={{textAlign: 'right', fontWeight: 500}}>{item.inStock}</td>
                  <td style={{textAlign: 'right', color: '#059669', fontWeight: 500}}>{item.available}</td>
                  <td style={{textAlign: 'right', color: '#d97706', fontWeight: 500}}>{item.shipping}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
