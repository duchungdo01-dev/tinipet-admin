'use client';
import { useState, useRef } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

export default function InventoryPage() {
  const [inventory, setInventory] = useState([
    { sku: 'SP001', name: 'Thức ăn hạt cho chó Royal Canin Poodle Adult 1.5kg', inStock: 150, available: 145, shipping: 5, price: 250000, cost: 200000 },
    { sku: 'SP002', name: 'Cát vệ sinh cho mèo Maneki Neko 5L', inStock: 300, available: 290, shipping: 10, price: 80000, cost: 60000 },
    { sku: 'SP003', name: 'Sữa tắm cho chó lông trắng Joyce & Dolls 400ml', inStock: 50, available: 50, shipping: 0, price: 150000, cost: 100000 },
    { sku: 'SP004', name: 'Pate cho mèo Whiskas vị cá ngừ 85g', inStock: 500, available: 450, shipping: 50, price: 15000, cost: 10000 },
  ]);

  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const formatCurrency = (value) => {
    if (value === undefined || value === null || isNaN(value)) return '-';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
    // reset input
    e.target.value = null;
  };

  const handleFileUpload = (file) => {
    const fileExtension = file.name.split('.').pop().toLowerCase();
    
    if (fileExtension === 'csv') {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          processParsedData(results.data);
        },
        error: (error) => {
          console.error("Lỗi khi parse file CSV:", error);
          alert("Có lỗi xảy ra khi đọc file CSV.");
        }
      });
    } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const results = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
          processParsedData(results);
        } catch (error) {
          console.error("Lỗi khi đọc file Excel:", error);
          alert("Có lỗi xảy ra khi đọc file Excel.");
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert("Vui lòng tải lên file định dạng CSV hoặc Excel (.xlsx, .xls).");
    }
  };

  const processParsedData = (parsedData) => {
    const newItems = parsedData.map(row => {
      // Find columns regardless of case
      const keys = Object.keys(row);
      const getVal = (possibleNames) => {
         const key = keys.find(k => possibleNames.includes(k.trim().toLowerCase()));
         return key ? String(row[key]) : '';
      };
      
      const name = getVal(['name', 'tên', 'tên sản phẩm']);
      const sku = getVal(['sku', 'mã sku', 'mã sản phẩm']);
      const priceStr = getVal(['price', 'giá bán', 'giá']);
      const costStr = getVal(['cost', 'giá vốn']);
      const numberStr = getVal(['number', 'số lượng', 'tồn kho', 'quantity']);

      const price = parseInt(priceStr.replace(/\D/g, '')) || 0;
      const cost = parseInt(costStr.replace(/\D/g, '')) || 0;
      const number = parseInt(numberStr) || 0;

      return {
        sku: sku || 'N/A',
        name: name || 'Sản phẩm mới',
        inStock: number,
        available: number, // Assuming all newly imported are available
        shipping: 0,
        price: price,
        cost: cost
      };
    });

    if (newItems.length > 0) {
      setInventory(prev => [...newItems, ...prev]);
      alert(`Đã import thành công ${newItems.length} sản phẩm!`);
    } else {
      alert("Không tìm thấy dữ liệu hợp lệ trong file.");
    }
  };

  return (
    <div 
      onDragOver={handleDragOver} 
      onDragLeave={handleDragLeave} 
      onDrop={handleDrop}
      style={{ position: 'relative', minHeight: 'calc(100vh - 100px)' }}
    >
      {isDragging && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          border: '2px dashed var(--color-primary)',
          borderRadius: '8px',
          zIndex: 50,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'none'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '24px 48px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <svg width="48" height="48" fill="none" stroke="var(--color-primary)" viewBox="0 0 24 24" style={{margin: '0 auto 12px auto'}}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
            <h2 style={{color: 'var(--color-primary)', fontSize: '1.25rem', fontWeight: 600}}>Thả file CSV hoặc Excel vào đây để import</h2>
          </div>
        </div>
      )}

      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
        <h1 className="page-title" style={{marginBottom: 0}}>Quản lý Kho</h1>
        <div style={{display: 'flex', gap: '12px'}}>
          <input 
            type="file" 
            accept=".csv, .xlsx, .xls" 
            ref={fileInputRef} 
            onChange={handleFileInput} 
            style={{display: 'none'}} 
          />
          <button 
            className="btn btn-outline" 
            onClick={() => fileInputRef.current?.click()}
            style={{display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px'}}
          >
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
                <th style={{textAlign: 'right'}}>Giá vốn</th>
                <th style={{textAlign: 'right'}}>Giá bán</th>
                <th style={{textAlign: 'right'}}>Tồn kho</th>
                <th style={{textAlign: 'right'}}>Có thể bán</th>
                <th style={{textAlign: 'right'}}>Đang giao</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item, idx) => (
                <tr key={idx} style={{cursor: 'pointer'}} className="menu-item-hover">
                  <td style={{color: 'var(--color-primary)', fontWeight: 500}}>{item.sku}</td>
                  <td>{item.name}</td>
                  <td style={{textAlign: 'right', color: 'var(--text-secondary)'}}>{formatCurrency(item.cost)}</td>
                  <td style={{textAlign: 'right', fontWeight: 500}}>{formatCurrency(item.price)}</td>
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
