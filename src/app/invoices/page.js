'use client';
import { useState } from 'react';

export default function Invoices() {
  const [items, setItems] = useState([
    { id: 1, sku: '', name: '', qty: 1, cost: 0 }
  ]);
  
  const handleAddItem = () => {
    setItems([...items, { id: Date.now(), sku: '', name: '', qty: 1, cost: 0 }]);
  };
  
  const handleRemoveItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };
  
  const handleItemChange = (id, field, value) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const totalQty = items.reduce((sum, item) => sum + Number(item.qty || 0), 0);
  const totalAmount = items.reduce((sum, item) => sum + (Number(item.qty || 0) * Number(item.cost || 0)), 0);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  return (
    <div>
      <h1 className="page-title">Hoá đơn Kê khai (Invoice)</h1>
      
      <div className="grid-2-col" style={{ gridTemplateColumns: '2fr 1fr' }}>
        <div className="card">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
            <h2 className="card-title" style={{marginBottom: 0}}>Chi tiết hàng hoá</h2>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{width: '100%', borderCollapse: 'collapse', marginBottom: '20px'}}>
              <thead>
                <tr style={{borderBottom: '1px solid var(--border-light)'}}>
                  <th style={{padding: '12px 8px', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 500}}>Mã SKU</th>
                  <th style={{padding: '12px 8px', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 500}}>Tên SP</th>
                  <th style={{padding: '12px 8px', textAlign: 'center', color: 'var(--text-secondary)', fontWeight: 500, width: '90px'}}>Số lượng</th>
                  <th style={{padding: '12px 8px', textAlign: 'right', color: 'var(--text-secondary)', fontWeight: 500, width: '130px'}}>Đơn giá (Gốc)</th>
                  <th style={{padding: '12px 8px', textAlign: 'right', color: 'var(--text-secondary)', fontWeight: 500, width: '130px'}}>Thành tiền</th>
                  <th style={{padding: '12px 8px', width: '40px'}}></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} style={{borderBottom: '1px solid var(--border-light)'}}>
                    <td style={{padding: '12px 4px'}}><input type="text" className="form-control" placeholder="Nhập SKU..." value={item.sku} onChange={(e) => handleItemChange(item.id, 'sku', e.target.value)} /></td>
                    <td style={{padding: '12px 4px'}}><input type="text" className="form-control" placeholder="Nhập tên..." value={item.name} onChange={(e) => handleItemChange(item.id, 'name', e.target.value)} /></td>
                    <td style={{padding: '12px 4px'}}><input type="number" min="1" className="form-control" value={item.qty} onChange={(e) => handleItemChange(item.id, 'qty', e.target.value)} style={{textAlign: 'center'}} /></td>
                    <td style={{padding: '12px 4px'}}><input type="number" min="0" className="form-control" value={item.cost} onChange={(e) => handleItemChange(item.id, 'cost', e.target.value)} style={{textAlign: 'right'}} /></td>
                    <td style={{padding: '12px 8px', textAlign: 'right', fontWeight: 500}}>{formatCurrency(item.qty * item.cost)}</td>
                    <td style={{padding: '12px 4px', textAlign: 'center'}}>
                      <button 
                        onClick={() => handleRemoveItem(item.id)}
                        style={{background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626', padding: '4px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                        title="Xoá dòng"
                      >
                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td colSpan="6" style={{padding: '24px', textAlign: 'center', color: 'var(--text-secondary)'}}>
                      Chưa có hàng hoá nào. Hãy thêm dòng mới.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <button onClick={handleAddItem} className="btn btn-outline" style={{display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px'}}>
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            Thêm dòng
          </button>
        </div>

        <div className="card" style={{height: 'fit-content'}}>
          <h2 className="card-title">Tổng kết</h2>
          
          <div className="form-group">
            <label>Khách hàng / Đối tác</label>
            <input type="text" className="form-control" placeholder="Nhập tên đối tác kê khai..." />
          </div>
          <div className="form-group">
            <label>Ngày tạo</label>
            <input type="date" className="form-control" defaultValue={new Date().toISOString().split('T')[0]} />
          </div>
          
          <hr style={{margin: '20px 0', borderColor: 'var(--border-light)', borderStyle: 'solid', borderWidth: '1px 0 0 0'}} />
          
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '15px'}}>
            <span style={{color: 'var(--text-secondary)'}}>Tổng số lượng:</span>
            <strong style={{fontSize: '16px'}}>{totalQty}</strong>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '24px', alignItems: 'center'}}>
            <span style={{color: 'var(--text-secondary)', fontSize: '16px'}}>Tổng tiền:</span>
            <strong style={{color: 'var(--color-primary)', fontSize: '22px'}}>{formatCurrency(totalAmount)}</strong>
          </div>
          
          <button className="btn btn-primary" style={{width: '100%', padding: '12px', fontSize: '15px', display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center'}}>
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
            Tạo & Xuất Hoá đơn
          </button>
        </div>
      </div>
    </div>
  );
}
