export default function Dashboard() {
  return (
    <div>
      <h1 className="page-title">Tổng quan</h1>
      
      <div className="card">
        <h2 className="card-title">Kết quả bán hàng hôm nay</h2>
        <div className="stat-row">
          <div className="stat-box">
            <div className="stat-label">Doanh thu</div>
            <div className="stat-value">12,500,000 đ</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Đơn hàng mới</div>
            <div className="stat-value">45</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Đơn đang giao</div>
            <div className="stat-value">12</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Lợi nhuận gộp</div>
            <div className="stat-value">4,200,000 đ</div>
          </div>
        </div>
      </div>

      <div className="grid-2-col">
        <div className="card">
          <h2 className="card-title">Tình trạng đơn hàng</h2>
          <div className="order-status-grid">
            <div className="status-badge neutral">
              <div>Chờ xác nhận</div>
              <strong>15</strong>
            </div>
            <div className="status-badge warning">
              <div>Đang xử lý</div>
              <strong>8</strong>
            </div>
            <div className="status-badge info">
              <div>Đang giao</div>
              <strong>12</strong>
            </div>
            <div className="status-badge neutral">
              <div>Đã giao</div>
              <strong>145</strong>
            </div>
            <div className="status-badge danger">
              <div>Đã huỷ</div>
              <strong>3</strong>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">Sản phẩm bán chạy</h2>
          <table>
            <tbody>
              <tr>
                <td>Thức ăn mèo Whiskas 1.2kg</td>
                <td style={{textAlign: 'right'}}><strong>32</strong></td>
              </tr>
              <tr>
                <td>Cát vệ sinh đậu nành 5L</td>
                <td style={{textAlign: 'right'}}><strong>28</strong></td>
              </tr>
              <tr>
                <td>Pate Ciao churu 14g</td>
                <td style={{textAlign: 'right'}}><strong>15</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
