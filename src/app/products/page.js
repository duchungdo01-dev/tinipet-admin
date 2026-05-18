'use client';
import { useState } from 'react';

export default function Products() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Thức ăn mèo Whiskas 1.2kg', sku: 'WHI-12-001', price: 95000, cost: 75000 },
    { id: 2, name: 'Cát vệ sinh đậu nành 5L', sku: 'CAT-5L-002', price: 120000, cost: 80000 },
    { id: 3, name: 'Pate Ciao churu 14g', sku: 'PAT-14-003', price: 15000, cost: 10000 },
  ]);

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
        <h1 className="page-title" style={{marginBottom: 0}}>Quản lý Sản phẩm</h1>
        <button className="btn btn-primary">Thêm sản phẩm</button>
      </div>
      
      <div className="card">
        <h2 className="card-title">Danh sách SKU & Giá gốc</h2>
        <table style={{marginTop: '16px'}}>
          <thead>
            <tr>
              <th>Mã SKU</th>
              <th>Tên sản phẩm</th>
              <th style={{textAlign: 'right'}}>Giá nhập/Giá gốc</th>
              <th style={{textAlign: 'right'}}>Giá bán</th>
              <th style={{textAlign: 'center'}}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>
                  <input type="text" className="form-control" defaultValue={p.sku} style={{width: '120px'}} />
                </td>
                <td>{p.name}</td>
                <td style={{textAlign: 'right'}}>
                  <input type="number" className="form-control" defaultValue={p.cost} style={{width: '100px', display: 'inline-block', textAlign: 'right'}} />
                </td>
                <td style={{textAlign: 'right'}}>{p.price.toLocaleString()} đ</td>
                <td style={{textAlign: 'center'}}>
                  <button className="btn btn-outline" style={{padding: '4px 8px', fontSize: '12px'}}>Lưu</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
