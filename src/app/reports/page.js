'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';

// ─── Mock Data Generation ────────────────────────────────────────────────
const generateDailyRevenue = () => {
  const data = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const day = `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}`;
    const revenue = Math.floor(Math.random() * 8000000) + 500000;
    const cost = Math.floor(revenue * (0.45 + Math.random() * 0.2));
    const orders = Math.floor(Math.random() * 12) + 1;
    data.push({ date: day, revenue, cost, profit: revenue - cost, orders });
  }
  return data;
};

const DAILY_DATA = generateDailyRevenue();

const TOP_PRODUCTS = [
  { name: 'Royal Canin Poodle Adult 1.5kg', sold: 87, revenue: 21750000 },
  { name: 'Pate Whiskas vị cá ngừ 85g', sold: 65, revenue: 975000 },
  { name: 'Cát vệ sinh Maneki Neko 5L', sold: 52, revenue: 4160000 },
  { name: 'Sữa tắm Joyce & Dolls 400ml', sold: 38, revenue: 5700000 },
  { name: 'Vòng cổ chống ve cho chó', sold: 31, revenue: 3100000 },
  { name: 'Bát ăn inox chống lật', sold: 28, revenue: 1400000 },
  { name: 'Balo phi hành gia cho mèo', sold: 22, revenue: 4400000 },
  { name: 'Snack thưởng cho chó Pedigree', sold: 19, revenue: 570000 },
];

const REVENUE_BY_SOURCE = [
  { name: 'Tại cửa hàng', value: 45, color: '#0088FF' },
  { name: 'Website', value: 25, color: '#10b981' },
  { name: 'Shopee', value: 15, color: '#f97316' },
  { name: 'TikTok Shop', value: 10, color: '#000000' },
  { name: 'Facebook', value: 5, color: '#3b82f6' },
];

const CUSTOMER_SPENDING = [
  { month: 'T1', newCustomer: 1200000, returning: 3500000 },
  { month: 'T2', newCustomer: 1800000, returning: 4200000 },
  { month: 'T3', newCustomer: 900000, returning: 3800000 },
  { month: 'T4', newCustomer: 2500000, returning: 5100000 },
  { month: 'T5', newCustomer: 1600000, returning: 4800000 },
  { month: 'T6', newCustomer: 2100000, returning: 5500000 },
];

// ─── Helpers ─────────────────────────────────────────────────────────────
const formatCurrency = (value) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

const shortCurrency = (value) => {
  if (value >= 1000000000) return `${(value / 1000000000).toFixed(1)}B`;
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
  return value;
};

// ─── Component ───────────────────────────────────────────────────────────
export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('30days');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);

  // Compute KPI from mock data
  const kpi = useMemo(() => {
    const totalRevenue = DAILY_DATA.reduce((s, d) => s + d.revenue, 0);
    const totalCost = DAILY_DATA.reduce((s, d) => s + d.cost, 0);
    const totalProfit = totalRevenue - totalCost;
    const totalOrders = DAILY_DATA.reduce((s, d) => s + d.orders, 0);
    const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
    const inventoryValue = 125000000;
    return { totalRevenue, totalCost, totalProfit, totalOrders, avgOrderValue, inventoryValue };
  }, []);

  const tabs = [
    { id: 'overview', label: 'Tổng quan' },
    { id: 'revenue', label: 'Phân tích doanh thu' },
    { id: 'customers', label: 'Phân tích khách hàng' },
  ];

  // ─── KPI Card ─────────────────────────────────────────────
  const KpiCard = ({ title, value, trend, trendLabel, onClick }) => (
    <div className="card" style={{ marginBottom: 0, cursor: onClick ? 'pointer' : 'default', flex: 1, minWidth: '220px' }} onClick={onClick}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>{title}</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>{value}</div>
          {trend !== undefined && (
            <div style={{ fontSize: '12px', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px', color: trend >= 0 ? '#059669' : '#dc2626' }}>
              <span>{trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%</span>
              {trendLabel && <span style={{ color: 'var(--text-secondary)' }}>{trendLabel}</span>}
            </div>
          )}
        </div>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="16" height="16" fill="none" stroke="var(--text-secondary)" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </div>
      </div>
    </div>
  );

  // ─── Section Card (with header arrow) ─────────────────────
  const SectionCard = ({ title, children, rightLabel }) => (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ fontSize: '14px', fontWeight: 600 }}>{title}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {rightLabel && <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{rightLabel}</span>}
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="14" height="14" fill="none" stroke="var(--text-secondary)" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </div>
        </div>
      </div>
      {children}
    </div>
  );

  // ═══════════════════════ TAB: TỔNG QUAN ═══════════════════
  const renderOverview = () => (
    <>
      {/* KPI Row */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <KpiCard title="Doanh thu thuần" value={formatCurrency(kpi.totalRevenue)} trend={12.5} trendLabel="so với kỳ trước" />
        <KpiCard title="Lợi nhuận gộp" value={formatCurrency(kpi.totalProfit)} trend={8.2} trendLabel="so với kỳ trước" />
        <KpiCard title="Đơn hàng" value={kpi.totalOrders} trend={-3.1} trendLabel="so với kỳ trước" />
        <KpiCard title="Giá trị tồn kho" value={formatCurrency(kpi.inventoryValue)} />
      </div>

      {/* Revenue over time */}
      <SectionCard title="Doanh thu theo thời gian">
        <div style={{ height: '300px' }}>
          {isMounted && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DAILY_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0088FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0088FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} interval={4} />
                <YAxis tickFormatter={shortCurrency} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v) => formatCurrency(v)} />
                <Area type="monotone" dataKey="revenue" name="Doanh thu" stroke="#0088FF" fill="url(#gRevenue)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </SectionCard>

      {/* Two-column: Orders over time + Top Products */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <SectionCard title="Số lượng đơn hàng theo thời gian">
          <div style={{ height: '260px' }}>
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DAILY_DATA} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} interval={5} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="orders" name="Đơn hàng" fill="#0088FF" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </SectionCard>

        <SectionCard title="Top sản phẩm bán chạy" rightLabel="30 ngày qua">
          <div style={{ maxHeight: '260px', overflowY: 'auto' }}>
            {TOP_PRODUCTS.map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '8px 0', borderBottom: i < TOP_PRODUCTS.length - 1 ? '1px solid var(--border-light)' : 'none', gap: '12px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: i < 3 ? '#0088FF' : '#e5e7eb', color: i < 3 ? '#fff' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600, flexShrink: 0 }}>{i + 1}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Đã bán: {p.sold}</div>
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#059669', flexShrink: 0 }}>{formatCurrency(p.revenue)}</div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </>
  );

  // ═══════════════════ TAB: PHÂN TÍCH DOANH THU ═════════════
  const renderRevenueAnalysis = () => (
    <>
      {/* KPI summary */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <KpiCard title="Tổng doanh thu" value={formatCurrency(kpi.totalRevenue)} trend={12.5} />
        <KpiCard title="Giá vốn hàng bán" value={formatCurrency(kpi.totalCost)} trend={5.0} />
        <KpiCard title="Lợi nhuận gộp" value={formatCurrency(kpi.totalProfit)} trend={8.2} />
        <KpiCard title="Giá trị đơn TB" value={formatCurrency(kpi.avgOrderValue)} trend={3.8} />
      </div>

      {/* Revenue vs Profit chart */}
      <SectionCard title="Doanh thu & Lợi nhuận theo thời gian">
        <div style={{ height: '320px' }}>
          {isMounted && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DAILY_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gRev2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0088FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0088FF" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="gProfit2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} interval={4} />
                <YAxis tickFormatter={shortCurrency} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v) => formatCurrency(v)} />
                <Legend />
                <Area type="monotone" dataKey="revenue" name="Doanh thu" stroke="#0088FF" fill="url(#gRev2)" strokeWidth={2} />
                <Area type="monotone" dataKey="profit" name="Lợi nhuận" stroke="#10b981" fill="url(#gProfit2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </SectionCard>

      {/* Revenue by source + Avg Order Value */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <SectionCard title="Doanh thu theo nguồn đơn hàng">
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div style={{ width: '180px', height: '180px', flexShrink: 0 }}>
              {isMounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={REVENUE_BY_SOURCE} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                      {REVENUE_BY_SOURCE.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => `${v}%`} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {REVENUE_BY_SOURCE.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: item.color, display: 'inline-block', flexShrink: 0 }}></span>
                  <span style={{ flex: 1, color: 'var(--text-secondary)' }}>{item.name}</span>
                  <span style={{ fontWeight: 600 }}>{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Giá trị đơn hàng trung bình">
          <div style={{ height: '220px' }}>
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={DAILY_DATA} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} interval={5} />
                  <YAxis tickFormatter={shortCurrency} tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(v) => formatCurrency(v)} />
                  <Line type="monotone" dataKey="revenue" name="Giá trị đơn TB" stroke="#f97316" strokeWidth={2} dot={false}
                    // We'll compute avg per order on-the-fly by using the data as-is
                    // In a real app this would be a separate field
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </SectionCard>
      </div>

      {/* Chi tiết lãi lỗ table */}
      <SectionCard title="Chi tiết lãi lỗ">
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Ngày</th>
                <th style={{ textAlign: 'right' }}>Doanh thu</th>
                <th style={{ textAlign: 'right' }}>Giá vốn</th>
                <th style={{ textAlign: 'right' }}>Lợi nhuận gộp</th>
                <th style={{ textAlign: 'right' }}>Số đơn</th>
              </tr>
            </thead>
            <tbody>
              {DAILY_DATA.slice(-10).map((item, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 500 }}>{item.date}</td>
                  <td style={{ textAlign: 'right', fontWeight: 500, color: '#0088FF' }}>{formatCurrency(item.revenue)}</td>
                  <td style={{ textAlign: 'right', color: 'var(--text-secondary)' }}>{formatCurrency(item.cost)}</td>
                  <td style={{ textAlign: 'right', fontWeight: 600, color: '#059669' }}>{formatCurrency(item.profit)}</td>
                  <td style={{ textAlign: 'right' }}>{item.orders}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </>
  );

  // ═══════════════════ TAB: PHÂN TÍCH KHÁCH HÀNG ════════════
  const renderCustomerAnalysis = () => (
    <>
      {/* KPI */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <KpiCard title="Tổng khách hàng" value="247" trend={15.3} trendLabel="so với kỳ trước" />
        <KpiCard title="Khách hàng mới" value="38" trend={22.0} trendLabel="30 ngày qua" />
        <KpiCard title="Khách quay lại" value="64" trend={5.8} trendLabel="30 ngày qua" />
        <KpiCard title="Giá trị vòng đời TB" value={formatCurrency(2350000)} trend={10.1} />
      </div>

      {/* Spending chart */}
      <SectionCard title="Chi tiêu khách hàng theo thời gian">
        <div style={{ height: '300px' }}>
          {isMounted && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CUSTOMER_SPENDING} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={shortCurrency} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v) => formatCurrency(v)} />
                <Legend />
                <Bar dataKey="newCustomer" name="Khách mới" fill="#93c5fd" radius={[3, 3, 0, 0]} />
                <Bar dataKey="returning" name="Khách quay lại" fill="#0088FF" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </SectionCard>

      {/* Top Customers Table + Revenue by source */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <SectionCard title="Khách hàng chi tiêu nhiều nhất">
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Khách hàng</th>
                  <th style={{ textAlign: 'right' }}>Số đơn</th>
                  <th style={{ textAlign: 'right' }}>Tổng chi tiêu</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Nguyễn Minh Anh', orders: 12, total: 4500000 },
                  { name: 'Trần Đức Hùng', orders: 9, total: 3200000 },
                  { name: 'Phạm Thu Hà', orders: 8, total: 2800000 },
                  { name: 'Lê Quốc Bảo', orders: 7, total: 2100000 },
                  { name: 'Hoàng Thị Mai', orders: 6, total: 1950000 },
                ].map((c, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600, color: i < 3 ? '#0088FF' : 'var(--text-secondary)' }}>{i + 1}</td>
                    <td style={{ fontWeight: 500 }}>{c.name}</td>
                    <td style={{ textAlign: 'right' }}>{c.orders}</td>
                    <td style={{ textAlign: 'right', fontWeight: 600, color: '#059669' }}>{formatCurrency(c.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="Phân bổ khách hàng theo nguồn">
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div style={{ width: '180px', height: '180px', flexShrink: 0 }}>
              {isMounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={[
                      { name: 'Cửa hàng', value: 40, color: '#0088FF' },
                      { name: 'Online', value: 35, color: '#10b981' },
                      { name: 'Giới thiệu', value: 15, color: '#f97316' },
                      { name: 'Khác', value: 10, color: '#e5e7eb' },
                    ]} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                      {[
                        { color: '#0088FF' },
                        { color: '#10b981' },
                        { color: '#f97316' },
                        { color: '#e5e7eb' },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => `${v}%`} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { name: 'Cửa hàng', value: 40, color: '#0088FF' },
                { name: 'Online', value: 35, color: '#10b981' },
                { name: 'Giới thiệu', value: 15, color: '#f97316' },
                { name: 'Khác', value: 10, color: '#e5e7eb' },
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: item.color, display: 'inline-block', flexShrink: 0 }}></span>
                  <span style={{ flex: 1, color: 'var(--text-secondary)' }}>{item.name}</span>
                  <span style={{ fontWeight: 600 }}>{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>
    </>
  );

  // ─── Main Render ───────────────────────────────────────────
  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h1 className="page-title" style={{ marginBottom: 0 }}>Tổng quan báo cáo</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            Xuất báo cáo
          </button>
          <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
            In báo cáo
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0', borderBottom: '2px solid var(--border-light)', marginBottom: '20px' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: activeTab === tab.id ? 600 : 400,
              color: activeTab === tab.id ? '#0088FF' : 'var(--text-secondary)',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid #0088FF' : '2px solid transparent',
              marginBottom: '-2px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Date Range Filter */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <select
            className="form-control"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            style={{ fontSize: '13px', padding: '8px 12px', minWidth: '260px' }}
          >
            <option value="today">Hôm nay</option>
            <option value="7days">7 ngày qua</option>
            <option value="30days">30 ngày qua (25/04 – 24/05/2026)</option>
            <option value="month">Tháng trước</option>
            <option value="custom">Tùy chọn...</option>
          </select>
        </div>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <select className="form-control" style={{ fontSize: '13px', padding: '8px 12px', minWidth: '240px' }}>
            <option>So với: 26/03 – 24/04/2026</option>
          </select>
        </div>
        <button className="btn btn-outline" style={{ fontSize: '13px', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
          Chỉnh sửa
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'revenue' && renderRevenueAnalysis()}
      {activeTab === 'customers' && renderCustomerAnalysis()}
    </div>
  );
}
