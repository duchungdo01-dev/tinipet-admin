'use client';
import { useState } from 'react';

export default function Invoices() {
  const [items, setItems] = useState([
    { sku: '', name: '', qty: 1, cost: 0, total: 0 }
  ]);

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.qty * item.cost), 0);
  };

  return (
    <div>
      <h1 className="page-title">Hoá đơn Kê khai (Invoice)</h1>
      
      <div className="grid-2-col">
        <div className="card">
          <h2 className="card-title">Chi tiết hàng hoá</h2>
          
          <table style={{marginBottom: '20px'}}>
            <thead>
              <tr>
                <th>Mã SKU</th>
                <th>Tên SP</th>
                <th>Số lượng</th>
                <th style={{textAlign: 'right'}}>Đơn giá (Gốc)</th>
                <th style={{textAlign: 'right'}}>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td><input type="text" className="form-control" placeholder="Nhập SKU..." /></td>
                  <td><input type="text" className="form-control" placeholder="Nhập tên..." /></td>
                  <td><input type="number" className="form-control" defaultValue={1} style={{width: '60px'}} /></td>
                  <td><input type="number" className="form-control" defaultValue={0} style={{textAlign: 'right'}} /></td>
                  <td style={{textAlign: 'right'}}>0 đ</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-outline">+ Thêm dòng</button>
        </div>

        <div className="card">
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
          
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px'}}>
            <span>Tổng số lượng:</span>
            <strong>1</strong>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '18px'}}>
            <span>Tổng tiền:</span>
            <strong style={{color: 'var(--color-primary)'}}>0 đ</strong>
          </div>
          
          <button className="btn btn-primary" style={{width: '100%', padding: '12px'}}>Tạo & Xuất Hoá đơn</button>
        </div>
      </div>
    </div>
  );
}
