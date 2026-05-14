import { useState, useEffect, useRef } from "react";


const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #0f0e0d;
    --cream: #faf8f4;
    --gold: #c9a84c;
    --gold-light: #e8d499;
    --rust: #c94b2c;
    --sage: #4a7c59;
    --slate: #3d4f5c;
    --mist: #eae8e1;
    --smoke: #6b6560;
    --white: #ffffff;
    --shadow: 0 4px 24px rgba(15,14,13,0.12);
    --shadow-lg: 0 12px 48px rgba(15,14,13,0.18);
    --radius: 2px;
    --radius-md: 6px;
  }

  body { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--ink); overflow-x: hidden; }

  
  .app { display: flex; min-height: 100vh; }
  .sidebar { width: 260px; background: var(--ink); color: var(--cream); display: flex; flex-direction: column; position: fixed; top: 0; left: 0; height: 100vh; z-index: 100; transition: transform 0.3s; }
  .sidebar-logo { padding: 28px 24px 20px; border-bottom: 1px solid rgba(250,248,244,0.1); }
  .sidebar-logo h1 { font-family: 'Playfair Display', serif; font-size: 22px; color: var(--gold); letter-spacing: 0.5px; }
  .sidebar-logo p { font-size: 11px; color: var(--smoke); letter-spacing: 2px; text-transform: uppercase; margin-top: 2px; }
  .sidebar-role { padding: 12px 24px; }
  .role-badge { display: inline-block; padding: 4px 10px; background: rgba(201,168,76,0.2); color: var(--gold); font-size: 10px; letter-spacing: 2px; text-transform: uppercase; border-radius: 20px; border: 1px solid rgba(201,168,76,0.3); }
  .sidebar-nav { flex: 1; padding: 12px 0; overflow-y: auto; }
  .nav-section { padding: 16px 24px 4px; font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: var(--smoke); }
  .nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 24px; cursor: pointer; transition: all 0.2s; font-size: 13.5px; color: rgba(250,248,244,0.7); position: relative; }
  .nav-item:hover { color: var(--cream); background: rgba(250,248,244,0.06); }
  .nav-item.active { color: var(--gold); background: rgba(201,168,76,0.1); }
  .nav-item.active::before { content:''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: var(--gold); }
  .nav-item .icon { font-size: 16px; width: 20px; text-align: center; }
  .sidebar-footer { padding: 20px 24px; border-top: 1px solid rgba(250,248,244,0.1); }
  .sidebar-user { display: flex; align-items: center; gap: 12px; cursor: pointer; }
  .avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, var(--gold), var(--rust)); display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600; color: white; flex-shrink: 0; }
  .user-info { flex: 1; min-width: 0; }
  .user-name { font-size: 13px; font-weight: 500; color: var(--cream); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .user-email { font-size: 11px; color: var(--smoke); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

  .main { flex: 1; margin-left: 260px; min-height: 100vh; display: flex; flex-direction: column; }
  .topbar { height: 64px; background: var(--white); border-bottom: 1px solid var(--mist); display: flex; align-items: center; padding: 0 32px; gap: 16px; position: sticky; top: 0; z-index: 50; }
  .topbar-title { flex: 1; font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; }
  .topbar-actions { display: flex; align-items: center; gap: 12px; }
  .btn { display: inline-flex; align-items: center; gap: 8px; padding: 9px 20px; border-radius: var(--radius-md); font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; cursor: pointer; border: none; transition: all 0.2s; text-decoration: none; }
  .btn-primary { background: var(--gold); color: var(--ink); }
  .btn-primary:hover { background: var(--gold-light); transform: translateY(-1px); box-shadow: 0 4px 16px rgba(201,168,76,0.35); }
  .btn-secondary { background: transparent; color: var(--ink); border: 1.5px solid var(--mist); }
  .btn-secondary:hover { border-color: var(--gold); color: var(--gold); }
  .btn-danger { background: transparent; color: var(--rust); border: 1.5px solid rgba(201,75,44,0.3); }
  .btn-danger:hover { background: var(--rust); color: white; }
  .btn-ghost { background: transparent; color: var(--smoke); }
  .btn-ghost:hover { background: var(--mist); color: var(--ink); }
  .btn-sm { padding: 6px 14px; font-size: 12px; }
  .btn-icon { padding: 9px; border-radius: var(--radius-md); background: var(--mist); color: var(--ink); cursor: pointer; border: none; font-size: 16px; transition: all 0.2s; }
  .btn-icon:hover { background: var(--gold); color: var(--ink); }
  .page { padding: 32px; flex: 1; }
  .page-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 32px; gap: 16px; }
  .page-title { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; }
  .page-subtitle { font-size: 14px; color: var(--smoke); margin-top: 4px; }

  .card { background: var(--white); border: 1px solid var(--mist); border-radius: var(--radius-md); }
  .card-header { padding: 20px 24px; border-bottom: 1px solid var(--mist); display: flex; align-items: center; justify-content: space-between; }
  .card-body { padding: 24px; }
  .card-title { font-weight: 600; font-size: 15px; }

  
  .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 28px; }
  .stat-card { background: var(--white); border: 1px solid var(--mist); border-radius: var(--radius-md); padding: 24px; position: relative; overflow: hidden; }
  .stat-card::before { content:''; position: absolute; top: 0; left: 0; right: 0; height: 3px; }
  .stat-card.gold::before { background: var(--gold); }
  .stat-card.rust::before { background: var(--rust); }
  .stat-card.sage::before { background: var(--sage); }
  .stat-card.slate::before { background: var(--slate); }
  .stat-label { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--smoke); margin-bottom: 10px; }
  .stat-value { font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 700; line-height: 1; }
  .stat-change { font-size: 12px; color: var(--sage); margin-top: 6px; }
  .stat-icon { position: absolute; right: 20px; top: 20px; font-size: 28px; opacity: 0.15; }

  .table-wrap { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
  thead tr { border-bottom: 2px solid var(--mist); }
  th { padding: 12px 16px; text-align: left; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--smoke); font-weight: 500; }
  td { padding: 14px 16px; border-bottom: 1px solid var(--mist); vertical-align: middle; }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: rgba(234,232,225,0.3); }

  
  .badge { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 500; }
  .badge-active { background: rgba(74,124,89,0.12); color: var(--sage); }
  .badge-pending { background: rgba(201,168,76,0.15); color: #8a6a1e; }
  .badge-inactive { background: rgba(107,101,96,0.12); color: var(--smoke); }
  .badge-rejected { background: rgba(201,75,44,0.12); color: var(--rust); }
  .badge-free { background: rgba(74,124,89,0.12); color: var(--sage); }
  .badge-paid { background: rgba(61,79,92,0.12); color: var(--slate); }

  
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .form-group { display: flex; flex-direction: column; gap: 6px; }
  .form-group.full { grid-column: 1 / -1; }
  label { font-size: 12px; font-weight: 600; letter-spacing: 0.5px; color: var(--slate); text-transform: uppercase; }
  input, select, textarea { width: 100%; padding: 10px 14px; border: 1.5px solid var(--mist); border-radius: var(--radius-md); font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--ink); background: var(--cream); transition: border-color 0.2s; outline: none; }
  input:focus, select:focus, textarea:focus { border-color: var(--gold); background: var(--white); }
  textarea { resize: vertical; min-height: 100px; }
  .input-hint { font-size: 11px; color: var(--smoke); margin-top: 2px; }

  
  .courses-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .course-card { background: var(--white); border: 1px solid var(--mist); border-radius: var(--radius-md); overflow: hidden; transition: all 0.25s; cursor: pointer; }
  .course-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); border-color: var(--gold-light); }
  .course-thumb { height: 180px; position: relative; overflow: hidden; }
  .course-thumb-img { width: 100%; height: 100%; object-fit: cover; }
  .course-thumb-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 50%, rgba(15,14,13,0.7)); }
  .course-thumb-badge { position: absolute; top: 12px; left: 12px; }
  .course-info { padding: 18px; }
  .course-cat { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--gold); font-weight: 600; margin-bottom: 6px; }
  .course-name { font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 700; margin-bottom: 8px; line-height: 1.3; }
  .course-provider { font-size: 12px; color: var(--smoke); margin-bottom: 12px; display: flex; align-items: center; gap: 6px; }
  .course-meta { display: flex; align-items: center; justify-content: space-between; padding-top: 12px; border-top: 1px solid var(--mist); }
  .course-price { font-family: 'DM Mono', monospace; font-size: 16px; font-weight: 500; color: var(--ink); }
  .course-price.free { color: var(--sage); }
  .course-rating { display: flex; align-items: center; gap: 4px; font-size: 12px; }
  .course-students { font-size: 11px; color: var(--smoke); }

 
  .hero { background: var(--ink); color: var(--cream); padding: 80px 40px; position: relative; overflow: hidden; }
  .hero::before { content:''; position: absolute; top: -100px; right: -100px; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%); }
  .hero::after { content:''; position: absolute; bottom: -80px; left: -80px; width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(201,75,44,0.1) 0%, transparent 70%); }
  .hero-content { max-width: 700px; position: relative; z-index: 1; }
  .hero-label { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: var(--gold); margin-bottom: 16px; }
  .hero-title { font-family: 'Playfair Display', serif; font-size: 52px; font-weight: 900; line-height: 1.1; margin-bottom: 20px; }
  .hero-title span { color: var(--gold); }
  .hero-sub { font-size: 16px; color: rgba(250,248,244,0.7); line-height: 1.6; margin-bottom: 32px; max-width: 500px; }
  .hero-actions { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; }
  .hero-stats { display: flex; gap: 40px; margin-top: 48px; }
  .hero-stat { }
  .hero-stat-value { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; color: var(--gold); }
  .hero-stat-label { font-size: 12px; color: rgba(250,248,244,0.5); margin-top: 2px; }

  
  .auth-wrap { min-height: 100vh; display: flex; background: var(--ink); }
  .auth-left { flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 60px; position: relative; overflow: hidden; }
  .auth-left::before { content:''; position: absolute; inset: 0; background: radial-gradient(ellipse at 30% 50%, rgba(201,168,76,0.2), transparent 60%); }
  .auth-logo { font-family: 'Playfair Display', serif; font-size: 32px; color: var(--gold); margin-bottom: 48px; position: relative; }
  .auth-tagline { font-family: 'Playfair Display', serif; font-size: 42px; color: var(--cream); line-height: 1.2; position: relative; }
  .auth-tagline span { color: var(--gold); }
  .auth-features { margin-top: 48px; display: flex; flex-direction: column; gap: 16px; position: relative; }
  .auth-feature { display: flex; align-items: center; gap: 14px; color: rgba(250,248,244,0.7); font-size: 14px; }
  .auth-feature-icon { width: 36px; height: 36px; border-radius: 50%; background: rgba(201,168,76,0.15); border: 1px solid rgba(201,168,76,0.3); display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }
  .auth-right { width: 480px; background: var(--cream); display: flex; flex-direction: column; justify-content: center; padding: 60px 48px; }
  .auth-form-title { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; margin-bottom: 6px; }
  .auth-form-sub { font-size: 14px; color: var(--smoke); margin-bottom: 32px; }
  .auth-form { display: flex; flex-direction: column; gap: 18px; }
  .auth-link { text-align: center; font-size: 13px; color: var(--smoke); margin-top: 16px; }
  .auth-link a { color: var(--gold); text-decoration: none; font-weight: 500; cursor: pointer; }
  .divider { display: flex; align-items: center; gap: 12px; margin: 4px 0; }
  .divider::before, .divider::after { content:''; flex: 1; height: 1px; background: var(--mist); }
  .divider span { font-size: 11px; color: var(--smoke); }

  
  .search-bar { display: flex; gap: 12px; margin-bottom: 24px; align-items: center; }
  .search-input-wrap { position: relative; flex: 1; }
  .search-input-wrap input { padding-left: 40px; }
  .search-icon { position: absolute; left: 13px; top: 50%; transform: translateY(-50%); color: var(--smoke); font-size: 15px; }
  .filter-pills { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
  .pill { padding: 6px 16px; border-radius: 20px; font-size: 12px; cursor: pointer; border: 1.5px solid var(--mist); background: var(--white); transition: all 0.2s; font-weight: 500; }
  .pill:hover, .pill.active { background: var(--gold); border-color: var(--gold); color: var(--ink); }

  
  .lesson-layout { display: grid; grid-template-columns: 1fr 320px; gap: 24px; }
  .video-wrap { background: var(--ink); border-radius: var(--radius-md); aspect-ratio: 16/9; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
  .video-placeholder { display: flex; flex-direction: column; align-items: center; gap: 12px; color: rgba(250,248,244,0.4); }
  .play-btn { width: 64px; height: 64px; border-radius: 50%; background: var(--gold); display: flex; align-items: center; justify-content: center; font-size: 24px; cursor: pointer; transition: transform 0.2s; }
  .play-btn:hover { transform: scale(1.1); }
  .lesson-sidebar { display: flex; flex-direction: column; gap: 0; }
  .lesson-item { display: flex; align-items: center; gap: 12px; padding: 14px 16px; border-bottom: 1px solid var(--mist); cursor: pointer; transition: background 0.15s; }
  .lesson-item:hover { background: var(--mist); }
  .lesson-item.active { background: rgba(201,168,76,0.08); border-left: 3px solid var(--gold); }
  .lesson-num { width: 28px; height: 28px; border-radius: 50%; background: var(--mist); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 600; flex-shrink: 0; }
  .lesson-num.done { background: var(--sage); color: white; }
  .lesson-title-text { font-size: 13px; flex: 1; }
  .lesson-duration { font-size: 11px; color: var(--smoke); font-family: 'DM Mono', monospace; }

  
  .notif-list { display: flex; flex-direction: column; gap: 0; }
  .notif-item { display: flex; gap: 14px; padding: 18px 24px; border-bottom: 1px solid var(--mist); cursor: pointer; transition: background 0.15s; }
  .notif-item:hover { background: var(--mist); }
  .notif-item.unread { background: rgba(201,168,76,0.05); }
  .notif-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--gold); flex-shrink: 0; margin-top: 6px; }
  .notif-content { flex: 1; }
  .notif-title { font-size: 14px; font-weight: 500; margin-bottom: 3px; }
  .notif-body { font-size: 13px; color: var(--smoke); line-height: 1.5; }
  .notif-time { font-size: 11px; color: var(--smoke); margin-top: 4px; font-family: 'DM Mono', monospace; }

  
  .profile-header { background: linear-gradient(135deg, var(--ink) 0%, #1a2530 100%); color: var(--cream); padding: 40px; border-radius: var(--radius-md); display: flex; align-items: center; gap: 32px; margin-bottom: 24px; }
  .profile-avatar { width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, var(--gold), var(--rust)); display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: 700; flex-shrink: 0; border: 3px solid rgba(201,168,76,0.4); }
  .profile-name { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700; margin-bottom: 4px; }
  .profile-meta { font-size: 13px; color: rgba(250,248,244,0.6); }
  .profile-layout { display: grid; grid-template-columns: 1fr 320px; gap: 24px; }

  
  .gameshow-wheel { display: flex; flex-direction: column; align-items: center; gap: 24px; padding: 40px; }
  .wheel-canvas { width: 300px; height: 300px; border-radius: 50%; position: relative; background: conic-gradient(var(--gold) 0% 20%, var(--rust) 20% 40%, var(--slate) 40% 60%, var(--sage) 60% 80%, var(--ink) 80% 100%); border: 8px solid var(--ink); box-shadow: var(--shadow-lg); transition: transform 3s cubic-bezier(0.2, 0.8, 0.3, 1); }
  .wheel-pointer { font-size: 32px; }
  .wheel-label { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; }

  
  .rev-chart { height: 200px; background: var(--mist); border-radius: var(--radius-md); display: flex; align-items: flex-end; gap: 4px; padding: 16px; margin-bottom: 16px; }
  .rev-bar { flex: 1; background: var(--gold); border-radius: 2px 2px 0 0; opacity: 0.8; transition: opacity 0.2s; cursor: pointer; position: relative; }
  .rev-bar:hover { opacity: 1; }

  
  .empty-state { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 60px 20px; color: var(--smoke); }
  .empty-icon { font-size: 48px; opacity: 0.3; }
  .empty-title { font-size: 16px; font-weight: 500; }
  .empty-sub { font-size: 13px; }
  .tabs { display: flex; gap: 0; border-bottom: 2px solid var(--mist); margin-bottom: 24px; }
  .tab { padding: 12px 24px; font-size: 13px; font-weight: 500; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px; color: var(--smoke); transition: all 0.2s; }
  .tab.active { color: var(--gold); border-color: var(--gold); }
  .modal-overlay { position: fixed; inset: 0; background: rgba(15,14,13,0.6); z-index: 200; display: flex; align-items: center; justify-content: center; }
  .modal { background: var(--white); border-radius: var(--radius-md); width: 520px; max-width: 95vw; max-height: 90vh; overflow-y: auto; }
  .modal-header { padding: 24px 28px 20px; border-bottom: 1px solid var(--mist); display: flex; align-items: center; justify-content: space-between; }
  .modal-title { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; }
  .modal-body { padding: 28px; }
  .modal-footer { padding: 20px 28px; border-top: 1px solid var(--mist); display: flex; gap: 12px; justify-content: flex-end; }
  .rating-stars { display: flex; gap: 4px; font-size: 20px; cursor: pointer; }
  .star { transition: color 0.15s; }
  .star.filled { color: var(--gold); }
  .star.empty { color: var(--mist); }
  .progress-bar { height: 6px; background: var(--mist); border-radius: 3px; overflow: hidden; }
  .progress-fill { height: 100%; background: var(--gold); border-radius: 3px; transition: width 0.4s; }
  .chip { display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px; border-radius: 20px; background: var(--mist); font-size: 12px; }
  .chip button { background: none; border: none; cursor: pointer; font-size: 12px; color: var(--smoke); padding: 0; line-height: 1; }
  @media (max-width: 1100px) { .stats-grid { grid-template-columns: repeat(2,1fr); } .courses-grid { grid-template-columns: repeat(2,1fr); } }
  @media (max-width: 768px) { .sidebar { transform: translateX(-100%); } .main { margin-left: 0; } .courses-grid { grid-template-columns: 1fr; } .auth-left { display: none; } .lesson-layout { grid-template-columns: 1fr; } }
  .section-title { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; margin-bottom: 6px; }
  .section-sub { font-size: 13px; color: var(--smoke); margin-bottom: 20px; }
  .gap-16 { display: flex; flex-direction: column; gap: 16px; }
  .row { display: flex; align-items: center; gap: 12px; }
  .flex-1 { flex: 1; }
  .text-smoke { color: var(--smoke); }
  .text-gold { color: var(--gold); }
  .text-sm { font-size: 13px; }
  .text-xs { font-size: 11px; }
  .fw-600 { font-weight: 600; }
  .mt-8 { margin-top: 8px; }
  .mt-16 { margin-top: 16px; }
  .mb-16 { margin-bottom: 16px; }
  .mb-24 { margin-bottom: 24px; }
`;


const COURSES = [
  { id:1, name:"Thiết kế UX/UI Chuyên nghiệp", provider:"Nguyễn Văn An", category:"Design", price:0, rating:4.8, students:1240, status:"active", image:"https://picsum.photos/seed/ux1/400/200", approved:true, description:"Khóa học toàn diện từ cơ bản đến nâng cao về UX/UI." },
  { id:2, name:"Lập trình React.js từ A đến Z", provider:"Trần Thị Bình", category:"Development", price:599000, rating:4.9, students:3200, status:"active", image:"https://picsum.photos/seed/react2/400/200", approved:true, description:"Xây dựng ứng dụng web hiện đại với React." },
  { id:3, name:"Marketing Số Căn bản", provider:"Lê Minh Cường", category:"Marketing", price:299000, rating:4.6, students:890, status:"pending", image:"https://picsum.photos/seed/mkt3/400/200", approved:false, description:"Nắm vững các kỹ năng marketing số cho doanh nghiệp." },
  { id:4, name:"Nhiếp ảnh Sáng tạo", provider:"Phạm Thu Hà", category:"Photography", price:450000, rating:4.7, students:560, status:"active", image:"https://picsum.photos/seed/photo4/400/200", approved:true, description:"Học nhiếp ảnh chuyên nghiệp từ những nhiếp ảnh gia hàng đầu." },
  { id:5, name:"Kỹ năng Lãnh đạo", provider:"Đỗ Quang Huy", category:"Business", price:0, rating:4.5, students:2100, status:"active", image:"https://picsum.photos/seed/biz5/400/200", approved:true, description:"Phát triển kỹ năng lãnh đạo trong môi trường hiện đại." },
  { id:6, name:"Data Science & Machine Learning", provider:"Nguyễn Văn An", category:"Data", price:799000, rating:4.9, students:780, status:"active", image:"https://picsum.photos/seed/data6/400/200", approved:true, description:"Từ phân tích dữ liệu đến xây dựng mô hình ML." },
];
const USERS = [
  { id:1, name:"Nguyễn Thị Mai", email:"mai@email.com", role:"customer", status:"active", joined:"2024-01-15", courses:3 },
  { id:2, name:"Trần Văn Đức", email:"duc@email.com", role:"customer", status:"active", joined:"2024-02-20", courses:1 },
  { id:3, name:"Lê Thị Hoa", email:"hoa@email.com", role:"customer", status:"inactive", joined:"2024-03-10", courses:0 },
  { id:4, name:"Phạm Minh Khoa", email:"khoa@email.com", role:"customer", status:"active", joined:"2024-01-05", courses:5 },
];
const PROVIDERS = [
  { id:1, name:"Nguyễn Văn An", email:"an.nv@provider.com", courses:2, rating:4.9, revenue:12400000, status:"active", joined:"2023-11-01" },
  { id:2, name:"Trần Thị Bình", email:"binh.tt@provider.com", courses:1, rating:4.8, revenue:8900000, status:"active", joined:"2023-12-15" },
  { id:3, name:"Lê Minh Cường", email:"cuong.lm@provider.com", courses:1, rating:0, revenue:0, status:"pending", joined:"2024-05-01" },
];
const LESSONS = [
  { id:1, title:"Giới thiệu khóa học", duration:"08:32", done:true },
  { id:2, title:"Tư duy thiết kế UX", duration:"22:15", done:true },
  { id:3, title:"Nguyên tắc UI cơ bản", duration:"31:40", done:false },
  { id:4, title:"Figma nâng cao", duration:"45:00", done:false },
  { id:5, title:"Prototype & Testing", duration:"28:20", done:false },
];
const NOTIFS = [
  { id:1, title:"Khóa học mới được duyệt", body:"Khóa học 'Marketing Số Căn bản' đã được phê duyệt và đang hiển thị.", time:"5 phút trước", unread:true },
  { id:2, title:"Khuyến mãi đặc biệt", body:"Giảm 50% cho tất cả khóa học trong tuần lễ Tri Ân Giáo Viên!", time:"2 giờ trước", unread:true },
  { id:3, title:"Bình luận mới", body:"Học viên Trần Văn Đức đã đánh giá khóa học của bạn 5 sao.", time:"Hôm qua", unread:false },
  { id:4, title:"Cập nhật hệ thống", body:"Edupress vừa ra mắt tính năng Gameshow Quay Số may mắn.", time:"2 ngày trước", unread:false },
];
const TRANSACTIONS = [
  { id:"TXN001", user:"Nguyễn Thị Mai", course:"React.js từ A đến Z", amount:599000, date:"2024-06-10", status:"success" },
  { id:"TXN002", user:"Phạm Minh Khoa", course:"Data Science & ML", amount:799000, date:"2024-06-09", status:"success" },
  { id:"TXN003", user:"Trần Văn Đức", course:"Marketing Số Căn bản", amount:299000, date:"2024-06-08", status:"pending" },
  { id:"TXN004", user:"Lê Thị Hoa", course:"Nhiếp ảnh Sáng tạo", amount:450000, date:"2024-06-07", status:"failed" },
];
const DISCOUNT_CODES = [
  { id:1, code:"SUMMER50", type:"percent", value:50, course:"Tất cả", used:23, limit:100, expires:"2024-07-31", status:"active" },
  { id:2, code:"NEWUSER20", type:"percent", value:20, course:"React.js từ A đến Z", used:15, limit:50, expires:"2024-08-15", status:"active" },
  { id:3, code:"FLASH30", type:"percent", value:30, course:"Data Science & ML", used:50, limit:50, expires:"2024-06-30", status:"expired" },
];
const PROMOTIONS = [
  { id:1, name:"Tuần Lễ Vàng", type:"time", discount:40, start:"2024-07-01", end:"2024-07-07", status:"upcoming" },
  { id:2, name:"Milestone 100 Học Viên", type:"quantity", discount:25, condition:"100 đăng ký đầu", status:"active" },
];
const GIFTS = [
  { id:1, name:"Ebook Thiết Kế Hiện Đại", course:"UX/UI Chuyên nghiệp", type:"ebook", status:"active" },
  { id:2, name:"Template Figma Premium", course:"UX/UI Chuyên nghiệp", type:"file", status:"active" },
];
const REV_DATA = [45,68,52,80,63,95,72,88,65,110,92,128];
const MONTHS = ["T1","T2","T3","T4","T5","T6","T7","T8","T9","T10","T11","T12"];



function StarRating({ value, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="rating-stars">
      {[1,2,3,4,5].map(s => (
        <span key={s} className={`star ${(hover||value)>=s ? 'filled':'empty'}`}
          onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(0)}
          onClick={() => onChange && onChange(s)}>★</span>
      ))}
    </div>
  );
}

function Modal({ title, children, footer, onClose }) {
  return (
    <div className="modal-overlay" onClick={e => e.target===e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <span className="modal-title">{title}</span>
          <button className="btn-icon" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

function CourseCard({ course, onClick, actions }) {
  const fmt = n => n===0 ? "Miễn phí" : n.toLocaleString("vi")+"₫";
  return (
    <div className="course-card" onClick={onClick}>
      <div className="course-thumb" style={{background: `linear-gradient(135deg, #1a2530, #2d3f4e)`}}>
        <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:48,opacity:0.2}}>
          {course.category==="Design"?"🎨":course.category==="Development"?"💻":course.category==="Marketing"?"📢":course.category==="Photography"?"📷":course.category==="Business"?"📊":"📈"}
        </div>
        <div className="course-thumb-overlay"></div>
        <div className="course-thumb-badge">
          <span className={`badge ${course.price===0?"badge-free":"badge-paid"}`}>{course.price===0?"Miễn phí":"Trả phí"}</span>
        </div>
      </div>
      <div className="course-info">
        <div className="course-cat">{course.category}</div>
        <div className="course-name">{course.name}</div>
        <div className="course-provider">👤 {course.provider}</div>
        <div className="course-meta">
          <span className={`course-price ${course.price===0?"free":""}`}>{fmt(course.price)}</span>
          <div>
            <div className="course-rating">⭐ {course.rating} <span className="text-smoke">({course.students.toLocaleString()})</span></div>
          </div>
        </div>
        {actions && <div style={{marginTop:12,display:'flex',gap:8}} onClick={e=>e.stopPropagation()}>{actions}</div>}
      </div>
    </div>
  );
}




function HomePage({ setPage, currentUser }) {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("Tất cả");
  const cats = ["Tất cả","Design","Development","Marketing","Photography","Business","Data"];
  const filtered = COURSES.filter(c => (cat==="Tất cả"||c.category===cat) && c.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <div className="hero">
        <div className="hero-content">
          <div className="hero-label">✦ Nền tảng học trực tuyến hàng đầu</div>
          <h1 className="hero-title">Học không giới hạn<br/>với <span>Edupress</span></h1>
          <p className="hero-sub">Hàng trăm khóa học chất lượng từ các chuyên gia hàng đầu. Học theo nhịp của bạn, bất cứ lúc nào, bất cứ đâu.</p>
          <div className="hero-actions">
            <button className="btn btn-primary" style={{padding:'12px 28px',fontSize:15}} onClick={() => setPage("all-courses")}>Khám phá khóa học</button>
            {!currentUser && <button className="btn btn-secondary" style={{color:'white',borderColor:'rgba(250,248,244,0.3)',padding:'12px 28px',fontSize:15}} onClick={()=>setPage("register")}>Đăng ký miễn phí</button>}
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><div className="hero-stat-value">12K+</div><div className="hero-stat-label">Học viên</div></div>
            <div className="hero-stat"><div className="hero-stat-value">200+</div><div className="hero-stat-label">Khóa học</div></div>
            <div className="hero-stat"><div className="hero-stat-value">50+</div><div className="hero-stat-label">Giảng viên</div></div>
          </div>
        </div>
      </div>
      <div className="page">
        <div className="search-bar">
          <div className="search-input-wrap" style={{maxWidth:500}}>
            <span className="search-icon">🔍</span>
            <input placeholder="Tìm kiếm khóa học..." value={search} onChange={e=>setSearch(e.target.value)} />
          </div>
        </div>
        <div className="filter-pills">
          {cats.map(c => <span key={c} className={`pill ${cat===c?"active":""}`} onClick={()=>setCat(c)}>{c}</span>)}
        </div>
        <div className="section-title mb-16">Khóa học nổi bật</div>
        <div className="courses-grid">
          {filtered.filter(c=>c.approved).map(c => (
            <CourseCard key={c.id} course={c} onClick={()=>setPage("course-detail", c)} />
          ))}
        </div>
      </div>
    </div>
  );
}


function AllCoursesPage({ setPage }) {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("Tất cả");
  const [sort, setSort] = useState("popular");
  const cats = ["Tất cả","Design","Development","Marketing","Photography","Business","Data"];
  let filtered = COURSES.filter(c => c.approved && (cat==="Tất cả"||c.category===cat) && c.name.toLowerCase().includes(search.toLowerCase()));
  if (sort==="popular") filtered = [...filtered].sort((a,b)=>b.students-a.students);
  if (sort==="price-asc") filtered = [...filtered].sort((a,b)=>a.price-b.price);
  if (sort==="rating") filtered = [...filtered].sort((a,b)=>b.rating-a.rating);
  return (
    <div className="page">
      <div className="page-header">
        <div><div className="page-title">Tất cả Khóa học</div><div className="page-subtitle">{filtered.length} khóa học khả dụng</div></div>
      </div>
      <div className="search-bar">
        <div className="search-input-wrap"><span className="search-icon">🔍</span><input placeholder="Tìm kiếm..." value={search} onChange={e=>setSearch(e.target.value)} /></div>
        <select style={{padding:'10px 14px',border:'1.5px solid var(--mist)',borderRadius:6,fontFamily:'DM Sans',fontSize:13}} value={sort} onChange={e=>setSort(e.target.value)}>
          <option value="popular">Phổ biến nhất</option>
          <option value="rating">Đánh giá cao</option>
          <option value="price-asc">Giá thấp nhất</option>
        </select>
      </div>
      <div className="filter-pills">{cats.map(c=><span key={c} className={`pill ${cat===c?"active":""}`} onClick={()=>setCat(c)}>{c}</span>)}</div>
      <div className="courses-grid">{filtered.map(c=><CourseCard key={c.id} course={c} onClick={()=>setPage("course-detail", c)} />)}</div>
    </div>
  );
}


function CourseDetailPage({ course, setPage, currentUser }) {
  const [enrolled, setEnrolled] = useState(false);
  const fmt = n => n===0 ? "Miễn phí" : n.toLocaleString("vi")+"₫";
  return (
    <div>
      <div style={{background:'var(--ink)',color:'var(--cream)',padding:'48px 40px'}}>
        <button className="btn btn-ghost" style={{color:'rgba(250,248,244,0.6)',marginBottom:16}} onClick={()=>setPage("all-courses")}>← Quay lại</button>
        <div style={{display:'grid',gridTemplateColumns:'1fr 360px',gap:40}}>
          <div>
            <div style={{fontSize:11,letterSpacing:2,textTransform:'uppercase',color:'var(--gold)',marginBottom:12}}>{course.category}</div>
            <h1 style={{fontFamily:'Playfair Display,serif',fontSize:36,fontWeight:700,marginBottom:16,lineHeight:1.2}}>{course.name}</h1>
            <p style={{color:'rgba(250,248,244,0.7)',lineHeight:1.6,marginBottom:20}}>{course.description}</p>
            <div style={{display:'flex',gap:24,fontSize:13,color:'rgba(250,248,244,0.6)'}}>
              <span>⭐ {course.rating} ({course.students.toLocaleString()} học viên)</span>
              <span>👤 {course.provider}</span>
              <span>📚 {LESSONS.length} bài học</span>
            </div>
          </div>
          <div style={{background:'var(--white)',borderRadius:8,padding:28,color:'var(--ink)'}}>
            <div style={{fontFamily:'Playfair Display,serif',fontSize:32,fontWeight:700,color:'var(--ink)',marginBottom:4}}>{fmt(course.price)}</div>
            {course.price>0 && <div style={{fontSize:13,color:'var(--sage)',marginBottom:16}}>🏷️ Giảm 30% hôm nay!</div>}
            {enrolled
              ? <button className="btn btn-secondary" style={{width:'100%',marginBottom:12,justifyContent:'center'}} onClick={()=>setPage("lesson",course)}>▶ Tiếp tục học</button>
              : <button className="btn btn-primary" style={{width:'100%',marginBottom:12,justifyContent:'center'}} onClick={()=>{ if(!currentUser){setPage("login");return;} setEnrolled(true); setPage("registered-courses"); }}>
                {course.price===0?"Đăng ký miễn phí":"Mua khóa học"}
              </button>}
            <div style={{fontSize:12,color:'var(--smoke)',textAlign:'center'}}>✓ Truy cập trọn đời &nbsp;✓ Chứng chỉ hoàn thành</div>
            <div style={{marginTop:20}}>
              <div style={{fontSize:11,letterSpacing:1.5,textTransform:'uppercase',color:'var(--smoke)',marginBottom:10}}>Nhập mã giảm giá</div>
              <div style={{display:'flex',gap:8}}>
                <input placeholder="SUMMER50" style={{flex:1}} />
                <button className="btn btn-secondary btn-sm">Áp dụng</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="page">
        <div className="tabs">
          <div className="tab active">Nội dung khóa học</div>
          <div className="tab">Đánh giá</div>
          <div className="tab">Giảng viên</div>
        </div>
        <div className="card">
          <div className="card-header"><span className="card-title">Danh sách bài học</span><span className="text-sm text-smoke">{LESSONS.length} bài · {LESSONS.reduce((_,l)=>_+parseInt(l.duration),0)} phút</span></div>
          <div>
            {LESSONS.map((l,i) => (
              <div key={l.id} className="lesson-item" style={{borderLeft:'none'}}>
                <div className={`lesson-num ${l.done?"done":""}`}>{l.done?"✓":i+1}</div>
                <span className="lesson-title-text">{l.title}</span>
                <span className="lesson-duration">🎬 {l.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


function LessonPage({ course, setPage }) {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(40);
  return (
    <div className="page">
      <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}>
        <button className="btn btn-ghost btn-sm" onClick={()=>setPage("course-detail",course)}>← {course?.name}</button>
        <span style={{flex:1,fontSize:13,color:'var(--smoke)'}}>Bài {current+1}: {LESSONS[current]?.title}</span>
        <div style={{display:'flex',alignItems:'center',gap:8,fontSize:13}}>
          <span className="text-smoke">Tiến độ</span>
          <div className="progress-bar" style={{width:120}}><div className="progress-fill" style={{width:progress+"%"}}></div></div>
          <span className="text-gold fw-600">{progress}%</span>
        </div>
      </div>
      <div className="lesson-layout">
        <div>
          <div className="video-wrap">
            <div className="video-placeholder">
              <div className="play-btn">▶</div>
              <div style={{fontSize:14,marginTop:8}}>{LESSONS[current]?.title}</div>
              <div style={{fontSize:12,opacity:0.5}}>{LESSONS[current]?.duration}</div>
            </div>
          </div>
          <div style={{marginTop:20}}>
            <div className="section-title" style={{fontSize:18}}>{LESSONS[current]?.title}</div>
            <p style={{color:'var(--smoke)',fontSize:14,lineHeight:1.7,marginTop:8}}>
              Trong bài học này, chúng ta sẽ khám phá những khái niệm cơ bản và quan trọng nhất về chủ đề này. Bạn sẽ được học qua các ví dụ thực tế và bài tập thực hành.
            </p>
            <div style={{display:'flex',gap:12,marginTop:16}}>
              <button className="btn btn-secondary btn-sm" disabled={current===0} onClick={()=>setCurrent(c=>c-1)}>← Bài trước</button>
              <button className="btn btn-primary btn-sm" disabled={current===LESSONS.length-1} onClick={()=>{setCurrent(c=>c+1);setProgress(p=>Math.min(p+20,100));}}>Bài tiếp →</button>
            </div>
          </div>
        </div>
        <div className="card" style={{padding:0,overflow:'hidden'}}>
          <div className="card-header"><span className="card-title">Nội dung khóa học</span></div>
          {LESSONS.map((l,i) => (
            <div key={l.id} className={`lesson-item ${i===current?"active":""}`} onClick={()=>setCurrent(i)}>
              <div className={`lesson-num ${l.done?"done":""}`}>{l.done?"✓":i+1}</div>
              <span className="lesson-title-text">{l.title}</span>
              <span className="lesson-duration">{l.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


function RegisteredCoursesPage({ setPage }) {
  const myCourses = COURSES.filter(c=>[1,2,5].includes(c.id));
  return (
    <div className="page">
      <div className="page-header"><div><div className="page-title">Khóa học của tôi</div><div className="page-subtitle">{myCourses.length} khóa học đã đăng ký</div></div></div>
      {myCourses.length===0
        ? <div className="empty-state"><div className="empty-icon">📚</div><div className="empty-title">Chưa có khóa học nào</div><div className="empty-sub">Khám phá và đăng ký khóa học ngay!</div><button className="btn btn-primary mt-8" onClick={()=>setPage("all-courses")}>Tìm khóa học</button></div>
        : <div className="courses-grid">
          {myCourses.map(c => (
            <CourseCard key={c.id} course={c} onClick={()=>setPage("lesson",c)}
              actions={[
                <button key="learn" className="btn btn-primary btn-sm" onClick={()=>setPage("lesson",c)}>▶ Học ngay</button>,
                <button key="review" className="btn btn-secondary btn-sm" onClick={()=>setPage("course-review",c)}>⭐ Đánh giá</button>
              ]} />
          ))}
        </div>}
    </div>
  );
}


function CourseReviewPage({ course }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  if (submitted) return (
    <div className="page"><div className="empty-state"><div className="empty-icon">🎉</div><div className="empty-title">Cảm ơn đánh giá của bạn!</div><div className="empty-sub">Đánh giá của bạn giúp cải thiện chất lượng khóa học.</div></div></div>
  );
  return (
    <div className="page">
      <div className="page-header"><div><div className="page-title">Đánh giá Khóa học</div><div className="page-subtitle">{course?.name}</div></div></div>
      <div className="card" style={{maxWidth:600}}>
        <div className="card-body">
          <div className="form-group mb-24">
            <label>Xếp hạng của bạn</label>
            <div style={{marginTop:8}}><StarRating value={rating} onChange={setRating} /></div>
            <div className="input-hint">{rating===0?"Chọn số sao":["","Tệ","Không tốt","Ổn","Tốt","Xuất sắc!"][rating]}</div>
          </div>
          <div className="form-group mb-24">
            <label>Nhận xét chi tiết</label>
            <textarea placeholder="Chia sẻ trải nghiệm học tập của bạn..." value={comment} onChange={e=>setComment(e.target.value)} rows={5} />
          </div>
          <button className="btn btn-primary" disabled={rating===0} onClick={()=>setSubmitted(true)}>Gửi đánh giá</button>
        </div>
      </div>
    </div>
  );
}


function ProfilePage({ currentUser }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: currentUser?.name||"Nguyễn Thị Mai", phone:"0901234567", address:"TP. Hồ Chí Minh", bio:"Học viên đam mê công nghệ và thiết kế." });
  return (
    <div className="page">
      <div className="profile-header">
        <div className="profile-avatar">{(form.name||"U").charAt(0).toUpperCase()}</div>
        <div>
          <div className="profile-name">{form.name}</div>
          <div className="profile-meta">{currentUser?.email||"user@email.com"} · Học viên</div>
          <div style={{marginTop:8,display:'flex',gap:16,fontSize:13}}>
            <span style={{color:'var(--gold-light)'}}>📚 3 khóa học</span>
            <span style={{color:'rgba(250,248,244,0.5)'}}>📅 Tham gia 2024</span>
          </div>
        </div>
        <div style={{marginLeft:'auto'}}>
          <button className="btn btn-secondary" style={{borderColor:'rgba(250,248,244,0.2)',color:'var(--cream)'}} onClick={()=>setEditing(e=>!e)}>
            {editing?"Hủy":"✏️ Chỉnh sửa"}
          </button>
        </div>
      </div>
      <div className="profile-layout">
        <div className="card">
          <div className="card-header"><span className="card-title">Thông tin cá nhân</span></div>
          <div className="card-body">
            {editing
              ? <div className="gap-16">
                  <div className="form-group"><label>Họ và tên</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></div>
                  <div className="form-group"><label>Email (không thể thay đổi)</label><input value={currentUser?.email||"user@email.com"} disabled style={{opacity:0.5}} /></div>
                  <div className="form-group"><label>Số điện thoại</label><input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} /></div>
                  <div className="form-group"><label>Địa chỉ</label><input value={form.address} onChange={e=>setForm({...form,address:e.target.value})} /></div>
                  <div className="form-group"><label>Giới thiệu bản thân</label><textarea value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})} rows={3}/></div>
                  <div style={{display:'flex',gap:12}}>
                    <button className="btn btn-primary" onClick={()=>setEditing(false)}>Lưu thay đổi</button>
                    <button className="btn btn-secondary" onClick={()=>setEditing(false)}>Hủy</button>
                  </div>
                </div>
              : <div className="gap-16">
                  {[["Họ và tên",form.name],["Email",currentUser?.email||"user@email.com"],["Số điện thoại",form.phone],["Địa chỉ",form.address],["Giới thiệu",form.bio]].map(([k,v])=>(
                    <div key={k} style={{display:'flex',gap:8}}>
                      <span style={{width:140,fontSize:12,fontWeight:600,color:'var(--smoke)',textTransform:'uppercase',letterSpacing:0.5,flexShrink:0}}>{k}</span>
                      <span style={{fontSize:14}}>{v}</span>
                    </div>
                  ))}
                </div>}
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:20}}>
          <div className="card">
            <div className="card-header"><span className="card-title">Bảo mật</span></div>
            <div className="card-body">
              <div className="form-group mb-16"><label>Mật khẩu mới</label><input type="password" placeholder="••••••••" /></div>
              <div className="form-group mb-16"><label>Xác nhận mật khẩu</label><input type="password" placeholder="••••••••" /></div>
              <button className="btn btn-primary btn-sm">Đổi mật khẩu</button>
            </div>
          </div>
          <div className="card" style={{border:'1px solid rgba(201,75,44,0.2)'}}>
            <div className="card-header"><span className="card-title" style={{color:'var(--rust)'}}>Vùng nguy hiểm</span></div>
            <div className="card-body">
              <p style={{fontSize:13,color:'var(--smoke)',marginBottom:12}}>Yêu cầu xóa tài khoản sẽ được xử lý trong 7 ngày làm việc.</p>
              <button className="btn btn-danger btn-sm">Yêu cầu xóa tài khoản</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// NOTIFICATIONS
function NotificationsPage() {
  const [notifs, setNotifs] = useState(NOTIFS);
  const markAll = () => setNotifs(n=>n.map(x=>({...x,unread:false})));
  return (
    <div className="page">
      <div className="page-header">
        <div><div className="page-title">Thông báo</div><div className="page-subtitle">{notifs.filter(n=>n.unread).length} thông báo chưa đọc</div></div>
        <button className="btn btn-ghost btn-sm" onClick={markAll}>Đánh dấu tất cả đã đọc</button>
      </div>
      <div className="card" style={{padding:0,overflow:'hidden'}}>
        <div className="notif-list">
          {notifs.map(n => (
            <div key={n.id} className={`notif-item ${n.unread?"unread":""}`} onClick={()=>setNotifs(prev=>prev.map(x=>x.id===n.id?{...x,unread:false}:x))}>
              {n.unread ? <div className="notif-dot"></div> : <div style={{width:8}}></div>}
              <div className="notif-content">
                <div className="notif-title">{n.title}</div>
                <div className="notif-body">{n.body}</div>
                <div className="notif-time">{n.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


function ProviderRegPage({ setPage }) {
  const [submitted, setSubmitted] = useState(false);
  if (submitted) return (
    <div className="page"><div className="empty-state" style={{paddingTop:80}}>
      <div className="empty-icon">🎓</div>
      <div className="empty-title">Yêu cầu đã được gửi!</div>
      <div className="empty-sub">Chúng tôi sẽ xem xét và phản hồi trong 1-3 ngày làm việc.</div>
      <button className="btn btn-primary mt-8" onClick={()=>setPage("home")}>Về trang chủ</button>
    </div></div>
  );
  return (
    <div className="page">
      <div className="page-header"><div><div className="page-title">Đăng ký Nhà cung cấp Khóa học</div><div className="page-subtitle">Chia sẻ kiến thức của bạn và tạo thu nhập từ việc dạy học</div></div></div>
      <div className="card" style={{maxWidth:680}}>
        <div className="card-body">
          <div className="form-grid">
            <div className="form-group"><label>Tên đầy đủ</label><input placeholder="Nguyễn Văn A" /></div>
            <div className="form-group"><label>Email liên hệ</label><input placeholder="contact@email.com" /></div>
            <div className="form-group"><label>Số điện thoại</label><input placeholder="0901234567" /></div>
            <div className="form-group"><label>Lĩnh vực chuyên môn</label>
              <select><option>Design & Creative</option><option>Development</option><option>Marketing</option><option>Business</option><option>Data Science</option></select>
            </div>
            <div className="form-group full"><label>Mô tả kinh nghiệm</label><textarea placeholder="Mô tả kinh nghiệm dạy học và lĩnh vực chuyên môn của bạn..." rows={4}/></div>
            <div className="form-group full"><label>Khóa học dự kiến cung cấp</label><textarea placeholder="Mô tả các khóa học bạn muốn đăng tải trên hệ thống..." rows={3}/></div>
            <div className="form-group"><label>LinkedIn / Portfolio</label><input placeholder="https://linkedin.com/..." /></div>
            <div className="form-group"><label>Website cá nhân</label><input placeholder="https://..." /></div>
          </div>
          <div style={{marginTop:24,display:'flex',gap:12}}>
            <button className="btn btn-primary" onClick={()=>setSubmitted(true)}>Gửi đăng ký</button>
            <button className="btn btn-secondary" onClick={()=>setPage("home")}>Hủy</button>
          </div>
        </div>
      </div>
    </div>
  );
}


function LoginPage({ setPage, setCurrentUser }) {
  const [form, setForm] = useState({email:"",password:""});
  const users = [
    {email:"admin@edupress.vn",password:"admin123",name:"Admin",role:"admin"},
    {email:"provider@edupress.vn",password:"prov123",name:"Nguyễn Văn An",role:"provider"},
    {email:"user@edupress.vn",password:"user123",name:"Nguyễn Thị Mai",role:"customer"},
  ];
  const handleLogin = () => {
    const u = users.find(u=>u.email===form.email && u.password===form.password);
    if (u) { setCurrentUser(u); setPage("home"); }
    else alert("Email hoặc mật khẩu không đúng!\n\nDemo:\nadmin@edupress.vn / admin123\nprovider@edupress.vn / prov123\nuser@edupress.vn / user123");
  };
  return (
    <div className="auth-wrap">
      <div className="auth-left">
        <div className="auth-logo">✦ Edupress</div>
        <h2 className="auth-tagline">Học hỏi không ngừng,<br/>phát triển <span>mỗi ngày</span></h2>
        <div className="auth-features">
          {[["🎓","200+ khóa học chất lượng từ chuyên gia"],["💡","Học mọi lúc, mọi nơi theo nhịp của bạn"],["🏆","Chứng chỉ được công nhận rộng rãi"],["🎲","Gameshow quay số nhận khóa học miễn phí"]].map(([icon,text])=>(
            <div key={text} className="auth-feature"><div className="auth-feature-icon">{icon}</div>{text}</div>
          ))}
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-form-title">Chào mừng trở lại!</div>
        <div className="auth-form-sub">Đăng nhập để tiếp tục hành trình học tập</div>
        <div className="auth-form">
          <div className="form-group"><label>Email</label><input type="email" placeholder="email@example.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /></div>
          <div className="form-group"><label>Mật khẩu</label><input type="password" placeholder="••••••••" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} /></div>
          <div style={{textAlign:'right',marginTop:-8}}><a style={{fontSize:13,color:'var(--gold)',cursor:'pointer',textDecoration:'none'}} onClick={()=>setPage("forgot-password")}>Quên mật khẩu?</a></div>
          <button className="btn btn-primary" style={{justifyContent:'center',padding:'12px',fontSize:15}} onClick={handleLogin}>Đăng nhập</button>
        </div>
        <div className="auth-link">Chưa có tài khoản? <a onClick={()=>setPage("register")}>Đăng ký ngay</a></div>
        <div style={{marginTop:20,padding:16,background:'rgba(201,168,76,0.08)',borderRadius:6,border:'1px solid rgba(201,168,76,0.2)'}}>
          <div style={{fontSize:11,fontWeight:600,letterSpacing:1,textTransform:'uppercase',color:'var(--smoke)',marginBottom:8}}>Demo tài khoản</div>
          <div style={{fontSize:12,display:'flex',flexDirection:'column',gap:4}}>
            <div><b>Admin:</b> admin@edupress.vn / admin123</div>
            <div><b>NCC:</b> provider@edupress.vn / prov123</div>
            <div><b>KH:</b> user@edupress.vn / user123</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RegisterPage({ setPage }) {
  const [submitted, setSubmitted] = useState(false);
  if (submitted) return (
    <div className="auth-wrap" style={{alignItems:'center',justifyContent:'center'}}>
      <div style={{textAlign:'center',color:'var(--cream)'}}>
        <div style={{fontSize:64,marginBottom:16}}>🎉</div>
        <div style={{fontFamily:'Playfair Display,serif',fontSize:32,marginBottom:8}}>Đăng ký thành công!</div>
        <p style={{color:'rgba(250,248,244,0.6)',marginBottom:24}}>Vui lòng kiểm tra email để xác nhận tài khoản.</p>
        <button className="btn btn-primary" onClick={()=>setPage("login")}>Đăng nhập ngay</button>
      </div>
    </div>
  );
  return (
    <div className="auth-wrap">
      <div className="auth-left">
        <div className="auth-logo">✦ Edupress</div>
        <h2 className="auth-tagline">Bắt đầu hành trình<br/><span>học tập</span> của bạn</h2>
        <div className="auth-features">
          {[["🆓","Đăng ký hoàn toàn miễn phí"],["📚","Truy cập hàng trăm khóa học"],["🎁","Nhận ưu đãi độc quyền cho thành viên mới"],["👥","Cộng đồng học viên sôi động"]].map(([icon,text])=>(
            <div key={text} className="auth-feature"><div className="auth-feature-icon">{icon}</div>{text}</div>
          ))}
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-form-title">Tạo tài khoản mới</div>
        <div className="auth-form-sub">Tham gia cùng 12,000+ học viên trên Edupress</div>
        <div className="auth-form">
          <div className="form-group"><label>Họ và tên</label><input placeholder="Nguyễn Văn A" /></div>
          <div className="form-group"><label>Email</label><input type="email" placeholder="email@example.com" /></div>
          <div className="form-group"><label>Mật khẩu</label><input type="password" placeholder="Ít nhất 8 ký tự" /></div>
          <div className="form-group"><label>Xác nhận mật khẩu</label><input type="password" placeholder="Nhập lại mật khẩu" /></div>
          <button className="btn btn-primary" style={{justifyContent:'center',padding:'12px',fontSize:15}} onClick={()=>setSubmitted(true)}>Đăng ký</button>
        </div>
        <div className="auth-link">Đã có tài khoản? <a onClick={()=>setPage("login")}>Đăng nhập</a></div>
      </div>
    </div>
  );
}

function ForgotPasswordPage({ setPage }) {
  const [sent, setSent] = useState(false);
  return (
    <div className="auth-wrap">
      <div className="auth-left">
        <div className="auth-logo">✦ Edupress</div>
        <h2 className="auth-tagline">Đặt lại <span>mật khẩu</span><br/>của bạn</h2>
      </div>
      <div className="auth-right">
        {sent
          ? <div style={{textAlign:'center'}}>
              <div style={{fontSize:48,marginBottom:16}}>📧</div>
              <div style={{fontFamily:'Playfair Display,serif',fontSize:24,marginBottom:8}}>Kiểm tra email!</div>
              <p style={{color:'var(--smoke)',fontSize:14,marginBottom:24}}>Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến email của bạn.</p>
              <button className="btn btn-secondary" onClick={()=>setPage("login")}>← Quay lại đăng nhập</button>
            </div>
          : <>
            <div className="auth-form-title">Quên mật khẩu?</div>
            <div className="auth-form-sub">Nhập email để nhận hướng dẫn đặt lại mật khẩu</div>
            <div className="auth-form" style={{marginTop:24}}>
              <div className="form-group"><label>Email đã đăng ký</label><input type="email" placeholder="email@example.com" /></div>
              <button className="btn btn-primary" style={{justifyContent:'center',padding:'12px'}} onClick={()=>setSent(true)}>Gửi email đặt lại</button>
            </div>
            <div className="auth-link"><a onClick={()=>setPage("login")}>← Quay lại đăng nhập</a></div>
          </>}
      </div>
    </div>
  );
}



function ProviderDashboard() {
  const maxRev = Math.max(...REV_DATA);
  return (
    <div className="page">
      <div className="page-header"><div><div className="page-title">Dashboard NCC</div><div className="page-subtitle">Xin chào, Nguyễn Văn An 👋</div></div></div>
      <div className="stats-grid">
        {[{label:"Tổng khóa học",value:"2",icon:"📚",color:"gold"},{label:"Tổng học viên",value:"4.4K",icon:"👥",color:"rust"},{label:"Doanh thu tháng",value:"12.4M",icon:"💰",color:"sage"},{label:"Đánh giá TB",value:"4.9★",icon:"⭐",color:"slate"}].map(s=>(
          <div key={s.label} className={`stat-card ${s.color}`}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-change">↑ 12% so với tháng trước</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="card-header"><span className="card-title">Doanh thu theo tháng (triệu VNĐ)</span></div>
        <div className="card-body">
          <div className="rev-chart">
            {REV_DATA.map((v,i) => (
              <div key={i} style={{display:'flex',flexDirection:'column',alignItems:'center',flex:1,height:'100%',justifyContent:'flex-end'}}>
                <div className="rev-bar" style={{height:`${(v/maxRev)*100}%`}} title={`${MONTHS[i]}: ${v}M`}></div>
                <div style={{fontSize:10,color:'var(--smoke)',marginTop:6}}>{MONTHS[i]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CourseManagementPage({ setPage }) {
  const [courses, setCourses] = useState(COURSES.filter(c=>c.provider==="Nguyễn Văn An"));
  const [modal, setModal] = useState(null);
  return (
    <div className="page">
      <div className="page-header">
        <div><div className="page-title">Quản lý Khóa học</div><div className="page-subtitle">{courses.length} khóa học của bạn</div></div>
        <button className="btn btn-primary" onClick={()=>setModal("create")}>+ Tạo khóa học mới</button>
      </div>
      <div className="card" style={{padding:0,overflow:'hidden'}}>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Khóa học</th><th>Danh mục</th><th>Giá</th><th>Học viên</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
            <tbody>{courses.map(c=>(
              <tr key={c.id}>
                <td><div style={{fontWeight:500}}>{c.name}</div><div style={{fontSize:12,color:'var(--smoke)'}}>{c.rating}★ đánh giá</div></td>
                <td><span className="chip">{c.category}</span></td>
                <td><span style={{fontFamily:'DM Mono,monospace',fontSize:13}}>{c.price===0?"Miễn phí":c.price.toLocaleString("vi")+"₫"}</span></td>
                <td>{c.students.toLocaleString()}</td>
                <td><span className={`badge ${c.approved?"badge-active":"badge-pending"}`}>{c.approved?"✓ Đã duyệt":"⏳ Chờ duyệt"}</span></td>
                <td><div style={{display:'flex',gap:8}}>
                  <button className="btn btn-secondary btn-sm" onClick={()=>setModal("edit")}>✏️</button>
                  <button className="btn btn-ghost btn-sm" onClick={()=>setPage("lesson-manage",c)}>📚 Bài giảng</button>
                  <button className="btn btn-danger btn-sm" onClick={()=>setCourses(cs=>cs.filter(x=>x.id!==c.id))}>🗑</button>
                </div></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
      {modal && <Modal title={modal==="create"?"Tạo khóa học mới":"Chỉnh sửa khóa học"} onClose={()=>setModal(null)}
        footer={<><button className="btn btn-primary" onClick={()=>setModal(null)}>Lưu</button><button className="btn btn-secondary" onClick={()=>setModal(null)}>Hủy</button></>}>
        <div className="form-grid">
          <div className="form-group full"><label>Tên khóa học</label><input placeholder="Tên khóa học..." /></div>
          <div className="form-group"><label>Danh mục</label><select><option>Design</option><option>Development</option><option>Marketing</option><option>Data</option></select></div>
          <div className="form-group"><label>Giá (VNĐ, 0 = miễn phí)</label><input type="number" placeholder="0" /></div>
          <div className="form-group full"><label>Mô tả</label><textarea rows={3} placeholder="Mô tả ngắn về khóa học..." /></div>
          <div className="form-group full"><label>Mục tiêu học tập</label><textarea rows={3} placeholder="Sau khi học xong, học viên sẽ..." /></div>
        </div>
      </Modal>}
    </div>
  );
}

function LessonManagePage({ course }) {
  const [lessons, setLessons] = useState(LESSONS);
  const [modal, setModal] = useState(null);
  return (
    <div className="page">
      <div className="page-header">
        <div><div className="page-title">Quản lý Bài giảng</div><div className="page-subtitle">{course?.name}</div></div>
        <button className="btn btn-primary" onClick={()=>setModal("create")}>+ Thêm bài giảng</button>
      </div>
      <div className="card" style={{padding:0,overflow:'hidden'}}>
        <div className="table-wrap">
          <table>
            <thead><tr><th>#</th><th>Tiêu đề bài giảng</th><th>Thời lượng</th><th>Loại</th><th>Thao tác</th></tr></thead>
            <tbody>{lessons.map((l,i)=>(
              <tr key={l.id}>
                <td style={{color:'var(--smoke)',fontFamily:'DM Mono,monospace'}}>{String(i+1).padStart(2,"0")}</td>
                <td style={{fontWeight:500}}>{l.title}</td>
                <td><span style={{fontFamily:'DM Mono,monospace'}}>{l.duration}</span></td>
                <td><span className="chip">🎬 Video</span></td>
                <td><div style={{display:'flex',gap:8}}>
                  <button className="btn btn-secondary btn-sm" onClick={()=>setModal("edit")}>✏️ Sửa</button>
                  <button className="btn btn-danger btn-sm" onClick={()=>setLessons(ls=>ls.filter(x=>x.id!==l.id))}>🗑 Xóa</button>
                </div></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
      {modal && <Modal title={modal==="create"?"Thêm bài giảng":"Chỉnh sửa bài giảng"} onClose={()=>setModal(null)}
        footer={<><button className="btn btn-primary" onClick={()=>setModal(null)}>Lưu</button><button className="btn btn-secondary" onClick={()=>setModal(null)}>Hủy</button></>}>
        <div className="gap-16">
          <div className="form-group"><label>Tiêu đề bài giảng</label><input placeholder="Tên bài giảng..." /></div>
          <div className="form-group"><label>Video bài giảng</label><input type="file" style={{fontSize:13}} /></div>
          <div className="form-group"><label>Tài liệu đính kèm</label><input type="file" style={{fontSize:13}} /></div>
          <div className="form-group"><label>Mô tả</label><textarea rows={3} placeholder="Mô tả nội dung bài giảng..." /></div>
        </div>
      </Modal>}
    </div>
  );
}

function DiscountManagePage() {
  const [codes, setCodes] = useState(DISCOUNT_CODES);
  const [modal, setModal] = useState(null);
  return (
    <div className="page">
      <div className="page-header">
        <div><div className="page-title">Quản lý Mã giảm giá</div></div>
        <button className="btn btn-primary" onClick={()=>setModal(true)}>+ Tạo mã mới</button>
      </div>
      <div className="card" style={{padding:0,overflow:'hidden'}}>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Mã code</th><th>Giá trị</th><th>Áp dụng</th><th>Đã dùng</th><th>Hết hạn</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
            <tbody>{codes.map(c=>(
              <tr key={c.id}>
                <td><span style={{fontFamily:'DM Mono,monospace',fontWeight:600,background:'var(--mist)',padding:'3px 8px',borderRadius:4}}>{c.code}</span></td>
                <td><span style={{color:'var(--rust)',fontWeight:600}}>-{c.value}%</span></td>
                <td style={{fontSize:12}}>{c.course}</td>
                <td><span style={{fontFamily:'DM Mono,monospace'}}>{c.used}/{c.limit}</span></td>
                <td style={{fontSize:12,color:'var(--smoke)'}}>{c.expires}</td>
                <td><span className={`badge ${c.status==="active"?"badge-active":"badge-inactive"}`}>{c.status==="active"?"✓ Đang dùng":"Hết hạn"}</span></td>
                <td><div style={{display:'flex',gap:8}}>
                  <button className="btn btn-secondary btn-sm">✏️</button>
                  <button className="btn btn-danger btn-sm" onClick={()=>setCodes(cs=>cs.filter(x=>x.id!==c.id))}>🗑</button>
                </div></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
      {modal && <Modal title="Tạo mã giảm giá" onClose={()=>setModal(null)}
        footer={<><button className="btn btn-primary" onClick={()=>setModal(null)}>Tạo mã</button><button className="btn btn-secondary" onClick={()=>setModal(null)}>Hủy</button></>}>
        <div className="form-grid">
          <div className="form-group"><label>Mã code</label><input placeholder="SUMMER50" /></div>
          <div className="form-group"><label>Giá trị (%)</label><input type="number" placeholder="50" /></div>
          <div className="form-group"><label>Áp dụng cho</label><select><option>Tất cả khóa học</option>{COURSES.filter(c=>c.provider==="Nguyễn Văn An").map(c=><option key={c.id}>{c.name}</option>)}</select></div>
          <div className="form-group"><label>Giới hạn sử dụng</label><input type="number" placeholder="100" /></div>
          <div className="form-group full"><label>Ngày hết hạn</label><input type="date" /></div>
        </div>
      </Modal>}
    </div>
  );
}

function PromotionManagePage() {
  const [promos, setPromos] = useState(PROMOTIONS);
  const [modal, setModal] = useState(null);
  return (
    <div className="page">
      <div className="page-header">
        <div><div className="page-title">Chương trình Ưu đãi</div></div>
        <button className="btn btn-primary" onClick={()=>setModal(true)}>+ Tạo ưu đãi</button>
      </div>
      <div className="card" style={{padding:0,overflow:'hidden'}}>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Tên chương trình</th><th>Loại</th><th>Giảm giá</th><th>Điều kiện</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
            <tbody>{promos.map(p=>(
              <tr key={p.id}>
                <td style={{fontWeight:500}}>{p.name}</td>
                <td><span className="chip">{p.type==="time"?"⏰ Thời gian":"🎯 Số lượng"}</span></td>
                <td><span style={{color:'var(--rust)',fontWeight:600}}>-{p.discount}%</span></td>
                <td style={{fontSize:12,color:'var(--smoke)'}}>{p.start?`${p.start} → ${p.end}`:p.condition}</td>
                <td><span className={`badge ${p.status==="active"?"badge-active":"badge-pending"}`}>{p.status==="active"?"✓ Đang chạy":"🔜 Sắp diễn ra"}</span></td>
                <td><div style={{display:'flex',gap:8}}>
                  <button className="btn btn-secondary btn-sm">✏️</button>
                  <button className="btn btn-danger btn-sm" onClick={()=>setPromos(ps=>ps.filter(x=>x.id!==p.id))}>🗑</button>
                </div></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
      {modal && <Modal title="Tạo chương trình ưu đãi" onClose={()=>setModal(null)}
        footer={<><button className="btn btn-primary" onClick={()=>setModal(null)}>Tạo</button><button className="btn btn-secondary" onClick={()=>setModal(null)}>Hủy</button></>}>
        <div className="form-grid">
          <div className="form-group full"><label>Tên chương trình</label><input placeholder="Tên ưu đãi..." /></div>
          <div className="form-group"><label>Loại ưu đãi</label><select><option>Theo thời gian</option><option>Theo số lượng đăng ký</option></select></div>
          <div className="form-group"><label>Phần trăm giảm (%)</label><input type="number" placeholder="30" /></div>
          <div className="form-group"><label>Ngày bắt đầu</label><input type="date" /></div>
          <div className="form-group"><label>Ngày kết thúc</label><input type="date" /></div>
          <div className="form-group full"><label>Điều kiện áp dụng</label><textarea rows={2} placeholder="Mô tả điều kiện..." /></div>
        </div>
      </Modal>}
    </div>
  );
}

function GiftManagePage() {
  const [gifts, setGifts] = useState(GIFTS);
  const [modal, setModal] = useState(null);
  return (
    <div className="page">
      <div className="page-header">
        <div><div className="page-title">Quản lý Quà tặng</div></div>
        <button className="btn btn-primary" onClick={()=>setModal(true)}>+ Thêm quà tặng</button>
      </div>
      <div className="card" style={{padding:0,overflow:'hidden'}}>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Tên quà tặng</th><th>Khóa học</th><th>Loại</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
            <tbody>{gifts.map(g=>(
              <tr key={g.id}>
                <td style={{fontWeight:500}}>🎁 {g.name}</td>
                <td style={{fontSize:13}}>{g.course}</td>
                <td><span className="chip">{g.type==="ebook"?"📖 eBook":"📁 File"}</span></td>
                <td><span className="badge badge-active">✓ Đang cung cấp</span></td>
                <td><div style={{display:'flex',gap:8}}>
                  <button className="btn btn-secondary btn-sm">✏️</button>
                  <button className="btn btn-danger btn-sm" onClick={()=>setGifts(gs=>gs.filter(x=>x.id!==g.id))}>🗑</button>
                </div></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
      {modal && <Modal title="Thêm quà tặng" onClose={()=>setModal(null)}
        footer={<><button className="btn btn-primary" onClick={()=>setModal(null)}>Lưu</button><button className="btn btn-secondary" onClick={()=>setModal(null)}>Hủy</button></>}>
        <div className="gap-16">
          <div className="form-group"><label>Tên quà tặng</label><input placeholder="Ebook, template, tài liệu..." /></div>
          <div className="form-group"><label>Áp dụng cho khóa học</label><select>{COURSES.filter(c=>c.provider==="Nguyễn Văn An").map(c=><option key={c.id}>{c.name}</option>)}</select></div>
          <div className="form-group"><label>Loại quà</label><select><option>eBook</option><option>Template / File</option><option>Khóa học miễn phí</option></select></div>
          <div className="form-group"><label>Tải lên file</label><input type="file" style={{fontSize:13}} /></div>
        </div>
      </Modal>}
    </div>
  );
}

function RevenueReportPage() {
  const maxRev = Math.max(...REV_DATA);
  const total = REV_DATA.reduce((a,b)=>a+b,0);
  return (
    <div className="page">
      <div className="page-header"><div><div className="page-title">Báo cáo Doanh thu</div><div className="page-subtitle">Tổng quan năm 2024</div></div></div>
      <div className="stats-grid" style={{gridTemplateColumns:'repeat(3,1fr)'}}>
        {[{label:"Tổng doanh thu",value:`${total}M₫`,icon:"💰",color:"gold"},{label:"Doanh thu tháng này",value:"128M₫",icon:"📈",color:"sage"},{label:"Khóa học bán chạy",value:"React.js",icon:"🏆",color:"rust"}].map(s=>(
          <div key={s.label} className={`stat-card ${s.color}`}><div className="stat-icon">{s.icon}</div><div className="stat-label">{s.label}</div><div className="stat-value" style={{fontSize:28}}>{s.value}</div></div>
        ))}
      </div>
      <div className="card">
        <div className="card-header"><span className="card-title">Doanh thu theo tháng</span></div>
        <div className="card-body">
          <div className="rev-chart">
            {REV_DATA.map((v,i)=>(
              <div key={i} style={{display:'flex',flexDirection:'column',alignItems:'center',flex:1,height:'100%',justifyContent:'flex-end'}}>
                <div style={{fontSize:10,color:'var(--smoke)',marginBottom:4}}>{v}M</div>
                <div className="rev-bar" style={{height:`${(v/maxRev)*100}%`}}></div>
                <div style={{fontSize:10,color:'var(--smoke)',marginTop:6}}>{MONTHS[i]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="card" style={{marginTop:24,padding:0,overflow:'hidden'}}>
        <div className="card-header"><span className="card-title">Chi tiết theo khóa học</span></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Khóa học</th><th>Học viên</th><th>Doanh thu</th><th>Tỷ lệ</th></tr></thead>
            <tbody>
              {COURSES.filter(c=>c.provider==="Nguyễn Văn An").map(c=>(
                <tr key={c.id}>
                  <td style={{fontWeight:500}}>{c.name}</td>
                  <td>{c.students.toLocaleString()}</td>
                  <td style={{fontFamily:'DM Mono,monospace'}}>{(c.price*c.students/1000000).toFixed(1)}M₫</td>
                  <td><div style={{display:'flex',alignItems:'center',gap:8}}>
                    <div className="progress-bar" style={{width:80}}><div className="progress-fill" style={{width:`${Math.min((c.students/5000)*100,100)}%`}}></div></div>
                    <span style={{fontSize:12}}>{Math.round((c.students/5000)*100)}%</span>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}



function AdminDashboard() {
  const maxRev = Math.max(...REV_DATA);
  return (
    <div className="page">
      <div className="page-header"><div><div className="page-title">Tổng quan Hệ thống</div><div className="page-subtitle">Báo cáo hoạt động Edupress</div></div></div>
      <div className="stats-grid">
        {[{label:"Tổng học viên",value:"12,430",icon:"👥",color:"gold",change:"+8.2%"},{label:"Tổng NCC",value:"47",icon:"🎓",color:"rust",change:"+3 mới"},{label:"Khóa học",value:"218",icon:"📚",color:"sage",change:"+12 tháng này"},{label:"Doanh thu tháng",value:"284M₫",icon:"💰",color:"slate",change:"+15.4%"}].map(s=>(
          <div key={s.label} className={`stat-card ${s.color}`}><div className="stat-icon">{s.icon}</div><div className="stat-label">{s.label}</div><div className="stat-value">{s.value}</div><div className="stat-change">↑ {s.change}</div></div>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24}}>
        <div className="card">
          <div className="card-header"><span className="card-title">Doanh thu theo tháng</span></div>
          <div className="card-body">
            <div className="rev-chart" style={{height:160}}>
              {REV_DATA.map((v,i)=>(
                <div key={i} style={{display:'flex',flexDirection:'column',alignItems:'center',flex:1,height:'100%',justifyContent:'flex-end'}}>
                  <div className="rev-bar" style={{height:`${(v/maxRev)*100}%`,background:'var(--slate)'}}></div>
                  <div style={{fontSize:9,color:'var(--smoke)',marginTop:4}}>{MONTHS[i]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><span className="card-title">Khóa học chờ duyệt</span></div>
          <div className="card-body">
            {COURSES.filter(c=>!c.approved).map(c=>(
              <div key={c.id} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 0',borderBottom:'1px solid var(--mist)'}}>
                <div style={{flex:1}}><div style={{fontWeight:500,fontSize:14}}>{c.name}</div><div style={{fontSize:12,color:'var(--smoke)'}}>by {c.provider}</div></div>
                <div style={{display:'flex',gap:8}}>
                  <button className="btn btn-primary btn-sm">✓ Duyệt</button>
                  <button className="btn btn-danger btn-sm">✕</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminCoursesPage() {
  const [courses, setCourses] = useState(COURSES);
  const [tab, setTab] = useState("all");
  const filtered = tab==="all" ? courses : tab==="pending" ? courses.filter(c=>!c.approved) : courses.filter(c=>c.approved);
  return (
    <div className="page">
      <div className="page-header"><div><div className="page-title">Quản lý Khóa học</div></div></div>
      <div className="tabs">
        <div className={`tab ${tab==="all"?"active":""}`} onClick={()=>setTab("all")}>Tất cả ({courses.length})</div>
        <div className={`tab ${tab==="pending"?"active":""}`} onClick={()=>setTab("pending")}>Chờ duyệt ({courses.filter(c=>!c.approved).length})</div>
        <div className={`tab ${tab==="active"?"active":""}`} onClick={()=>setTab("active")}>Đã duyệt ({courses.filter(c=>c.approved).length})</div>
      </div>
      <div className="card" style={{padding:0,overflow:'hidden'}}>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Khóa học</th><th>NCC</th><th>Danh mục</th><th>Giá</th><th>Học viên</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
            <tbody>{filtered.map(c=>(
              <tr key={c.id}>
                <td style={{fontWeight:500,maxWidth:200}}>{c.name}</td>
                <td style={{fontSize:13}}>{c.provider}</td>
                <td><span className="chip">{c.category}</span></td>
                <td style={{fontFamily:'DM Mono,monospace',fontSize:13}}>{c.price===0?"Miễn phí":c.price.toLocaleString("vi")+"₫"}</td>
                <td>{c.students.toLocaleString()}</td>
                <td><span className={`badge ${c.approved?"badge-active":"badge-pending"}`}>{c.approved?"✓ Đã duyệt":"⏳ Chờ duyệt"}</span></td>
                <td><div style={{display:'flex',gap:6}}>
                  {!c.approved && <button className="btn btn-primary btn-sm" onClick={()=>setCourses(cs=>cs.map(x=>x.id===c.id?{...x,approved:true}:x))}>✓ Duyệt</button>}
                  {c.approved && <button className="btn btn-secondary btn-sm">✏️</button>}
                  <button className="btn btn-danger btn-sm" onClick={()=>setCourses(cs=>cs.filter(x=>x.id!==c.id))}>🗑</button>
                </div></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdminProvidersPage() {
  const [providers, setProviders] = useState(PROVIDERS);
  return (
    <div className="page">
      <div className="page-header"><div><div className="page-title">Quản lý NCC</div><div className="page-subtitle">{providers.length} nhà cung cấp khóa học</div></div></div>
      <div className="card" style={{padding:0,overflow:'hidden'}}>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Nhà cung cấp</th><th>Email</th><th>Khóa học</th><th>Đánh giá</th><th>Doanh thu</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
            <tbody>{providers.map(p=>(
              <tr key={p.id}>
                <td><div style={{display:'flex',alignItems:'center',gap:10}}><div className="avatar" style={{width:32,height:32,fontSize:13}}>{p.name.charAt(0)}</div><div><div style={{fontWeight:500}}>{p.name}</div><div style={{fontSize:11,color:'var(--smoke)'}}>Từ {p.joined}</div></div></div></td>
                <td style={{fontSize:13,color:'var(--smoke)'}}>{p.email}</td>
                <td style={{fontFamily:'DM Mono,monospace'}}>{p.courses}</td>
                <td>{p.rating>0?`⭐ ${p.rating}`:"-"}</td>
                <td style={{fontFamily:'DM Mono,monospace',fontSize:13}}>{p.revenue>0?`${(p.revenue/1000000).toFixed(1)}M₫`:"0"}</td>
                <td><span className={`badge ${p.status==="active"?"badge-active":"badge-pending"}`}>{p.status==="active"?"✓ Hoạt động":"⏳ Chờ duyệt"}</span></td>
                <td><div style={{display:'flex',gap:6}}>
                  {p.status==="pending" && <button className="btn btn-primary btn-sm" onClick={()=>setProviders(ps=>ps.map(x=>x.id===p.id?{...x,status:"active"}:x))}>✓ Duyệt</button>}
                  {p.status==="active" && <button className="btn btn-danger btn-sm" onClick={()=>setProviders(ps=>ps.map(x=>x.id===p.id?{...x,status:"inactive"}:x))}>Tắt</button>}
                  <button className="btn btn-secondary btn-sm">👁</button>
                </div></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdminCustomersPage() {
  const [users, setUsers] = useState(USERS);
  return (
    <div className="page">
      <div className="page-header"><div><div className="page-title">Quản lý Khách hàng</div><div className="page-subtitle">{users.length} tài khoản học viên</div></div></div>
      <div className="search-bar"><div className="search-input-wrap" style={{maxWidth:400}}><span className="search-icon">🔍</span><input placeholder="Tìm học viên..." /></div></div>
      <div className="card" style={{padding:0,overflow:'hidden'}}>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Học viên</th><th>Email</th><th>Khóa học</th><th>Ngày tham gia</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
            <tbody>{users.map(u=>(
              <tr key={u.id}>
                <td><div style={{display:'flex',alignItems:'center',gap:10}}><div className="avatar" style={{width:32,height:32,fontSize:13}}>{u.name.charAt(0)}</div><span style={{fontWeight:500}}>{u.name}</span></div></td>
                <td style={{fontSize:13,color:'var(--smoke)'}}>{u.email}</td>
                <td style={{fontFamily:'DM Mono,monospace'}}>{u.courses} khóa</td>
                <td style={{fontSize:12,color:'var(--smoke)'}}>{u.joined}</td>
                <td><span className={`badge ${u.status==="active"?"badge-active":"badge-inactive"}`}>{u.status==="active"?"✓ Hoạt động":"Tắt"}</span></td>
                <td><div style={{display:'flex',gap:6}}>
                  <button className="btn btn-secondary btn-sm">✏️</button>
                  <button className="btn btn-danger btn-sm" onClick={()=>setUsers(us=>us.map(x=>x.id===u.id?{...x,status:u.status==="active"?"inactive":"active"}:x))}>{u.status==="active"?"🚫 Tắt":"✓ Kích hoạt"}</button>
                </div></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdminPaymentsPage() {
  return (
    <div className="page">
      <div className="page-header"><div><div className="page-title">Quản lý Thanh toán</div></div></div>
      <div className="stats-grid" style={{gridTemplateColumns:'repeat(3,1fr)'}}>
        {[{label:"Doanh thu hôm nay",value:"14.8M₫",icon:"💰",color:"gold"},{label:"Giao dịch thành công",value:"28",icon:"✅",color:"sage"},{label:"Đang xử lý",value:"3",icon:"⏳",color:"rust"}].map(s=>(
          <div key={s.label} className={`stat-card ${s.color}`}><div className="stat-icon">{s.icon}</div><div className="stat-label">{s.label}</div><div className="stat-value" style={{fontSize:28}}>{s.value}</div></div>
        ))}
      </div>
      <div className="card" style={{padding:0,overflow:'hidden'}}>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Mã GD</th><th>Học viên</th><th>Khóa học</th><th>Số tiền</th><th>Ngày</th><th>Trạng thái</th></tr></thead>
            <tbody>{TRANSACTIONS.map(t=>(
              <tr key={t.id}>
                <td><span style={{fontFamily:'DM Mono,monospace',fontSize:12}}>{t.id}</span></td>
                <td style={{fontWeight:500}}>{t.user}</td>
                <td style={{fontSize:13}}>{t.course}</td>
                <td style={{fontFamily:'DM Mono,monospace',fontWeight:600,color:'var(--sage)'}}>{t.amount.toLocaleString("vi")}₫</td>
                <td style={{fontSize:12,color:'var(--smoke)'}}>{t.date}</td>
                <td><span className={`badge ${t.status==="success"?"badge-active":t.status==="pending"?"badge-pending":"badge-rejected"}`}>{t.status==="success"?"✓ Thành công":t.status==="pending"?"⏳ Đang xử lý":"✕ Thất bại"}</span></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdminNotificationsPage() {
  const [form, setForm] = useState({title:"",body:"",target:"all"});
  const [sent, setSent] = useState([]);
  const send = () => { if(form.title&&form.body){ setSent(s=>[{...form,id:Date.now(),time:"Vừa xong"},...s]); setForm({title:"",body:"",target:"all"}); }};
  return (
    <div className="page">
      <div className="page-header"><div><div className="page-title">Quản lý Thông báo</div></div></div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24}}>
        <div className="card">
          <div className="card-header"><span className="card-title">Tạo thông báo mới</span></div>
          <div className="card-body">
            <div className="form-group mb-16"><label>Tiêu đề</label><input placeholder="Tiêu đề thông báo..." value={form.title} onChange={e=>setForm({...form,title:e.target.value})} /></div>
            <div className="form-group mb-16"><label>Nội dung</label><textarea placeholder="Nội dung thông báo..." rows={4} value={form.body} onChange={e=>setForm({...form,body:e.target.value})} /></div>
            <div className="form-group mb-16"><label>Gửi đến</label>
              <select value={form.target} onChange={e=>setForm({...form,target:e.target.value})}>
                <option value="all">Tất cả người dùng</option>
                <option value="customers">Chỉ học viên</option>
                <option value="providers">Chỉ NCC</option>
              </select>
            </div>
            <button className="btn btn-primary" onClick={send}>📤 Gửi thông báo</button>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><span className="card-title">Đã gửi gần đây</span></div>
          <div>
            {[...sent,...NOTIFS.slice(0,3)].map((n,i)=>(
              <div key={i} className="notif-item">
                <div style={{width:8}}></div>
                <div className="notif-content">
                  <div className="notif-title">{n.title}</div>
                  <div className="notif-body" style={{fontSize:12}}>{n.body||n.content}</div>
                  <div className="notif-time">{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminFinancePage() {
  const maxRev = Math.max(...REV_DATA);
  return (
    <div className="page">
      <div className="page-header"><div><div className="page-title">Quản lý Tài chính</div></div></div>
      <div className="stats-grid">
        {[{label:"Tổng doanh thu",value:"1.84 tỷ",icon:"💰",color:"gold"},{label:"Chi phí vận hành",value:"320M₫",icon:"📤",color:"rust"},{label:"Lợi nhuận ròng",value:"1.52 tỷ",icon:"📈",color:"sage"},{label:"Tỷ suất LN",value:"82.6%",icon:"🎯",color:"slate"}].map(s=>(
          <div key={s.label} className={`stat-card ${s.color}`}><div className="stat-icon">{s.icon}</div><div className="stat-label">{s.label}</div><div className="stat-value">{s.value}</div></div>
        ))}
      </div>
      <div className="card">
        <div className="card-header"><span className="card-title">Tổng quan tài chính theo tháng</span></div>
        <div className="card-body">
          <div style={{display:'flex',alignItems:'flex-end',gap:4,height:200,background:'var(--mist)',borderRadius:8,padding:16}}>
            {REV_DATA.map((v,i)=>(
              <div key={i} style={{display:'flex',flexDirection:'column',alignItems:'center',flex:1,height:'100%',justifyContent:'flex-end',gap:2}}>
                <div style={{flex:1,display:'flex',alignItems:'flex-end',gap:2,width:'100%'}}>
                  <div style={{flex:1,background:'var(--gold)',borderRadius:'2px 2px 0 0',height:`${(v/maxRev)*100}%`,opacity:0.9}}></div>
                  <div style={{flex:1,background:'var(--rust)',borderRadius:'2px 2px 0 0',height:`${(v/maxRev*0.18)*100}%`,opacity:0.7}}></div>
                </div>
                <div style={{fontSize:9,color:'var(--smoke)'}}>{MONTHS[i]}</div>
              </div>
            ))}
          </div>
          <div style={{display:'flex',gap:20,marginTop:12,fontSize:12}}>
            <div style={{display:'flex',alignItems:'center',gap:6}}><div style={{width:12,height:12,background:'var(--gold)',borderRadius:2}}></div>Doanh thu</div>
            <div style={{display:'flex',alignItems:'center',gap:6}}><div style={{width:12,height:12,background:'var(--rust)',borderRadius:2}}></div>Chi phí</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminAccessPage() {
  const roles = [
    {name:"Super Admin",count:1,perms:["Tất cả quyền"]},
    {name:"Admin",count:3,perms:["Duyệt khóa học","Duyệt NCC","Quản lý người dùng","Xem báo cáo"]},
    {name:"Moderator",count:5,perms:["Kiểm duyệt nội dung","Xem báo cáo"]},
    {name:"Support",count:8,perms:["Xem thông tin người dùng","Hỗ trợ kỹ thuật"]},
  ];
  return (
    <div className="page">
      <div className="page-header"><div><div className="page-title">Quản lý Quyền truy cập</div></div><button className="btn btn-primary">+ Thêm nhóm quyền</button></div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:20}}>
        {roles.map(r=>(
          <div key={r.name} className="card">
            <div className="card-header">
              <div>
                <div className="card-title">{r.name}</div>
                <div style={{fontSize:12,color:'var(--smoke)',marginTop:2}}>{r.count} tài khoản</div>
              </div>
              <button className="btn btn-secondary btn-sm">✏️ Sửa quyền</button>
            </div>
            <div className="card-body">
              <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
                {r.perms.map(p=><span key={p} className="chip">✓ {p}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminSupportPage() {
  const tickets = [
    {id:"TK001",user:"Nguyễn Thị Mai",issue:"Không xem được video khóa học",priority:"high",status:"open",time:"1 giờ trước"},
    {id:"TK002",user:"Trần Văn Đức",issue:"Lỗi thanh toán, không nhận được khóa học",priority:"high",status:"resolved",time:"3 giờ trước"},
    {id:"TK003",user:"Phạm Minh Khoa",issue:"Câu hỏi về chứng chỉ hoàn thành",priority:"low",status:"open",time:"1 ngày trước"},
  ];
  return (
    <div className="page">
      <div className="page-header"><div><div className="page-title">Quản lý Hỗ trợ</div><div className="page-subtitle">{tickets.filter(t=>t.status==="open").length} ticket chưa xử lý</div></div></div>
      <div className="card" style={{padding:0,overflow:'hidden'}}>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Mã ticket</th><th>Người dùng</th><th>Vấn đề</th><th>Ưu tiên</th><th>Trạng thái</th><th>Thời gian</th><th>Thao tác</th></tr></thead>
            <tbody>{tickets.map(t=>(
              <tr key={t.id}>
                <td><span style={{fontFamily:'DM Mono,monospace',fontSize:12}}>{t.id}</span></td>
                <td style={{fontWeight:500}}>{t.user}</td>
                <td style={{fontSize:13,maxWidth:200}}>{t.issue}</td>
                <td><span className={`badge ${t.priority==="high"?"badge-rejected":"badge-pending"}`}>{t.priority==="high"?"🔴 Cao":"🟡 Thấp"}</span></td>
                <td><span className={`badge ${t.status==="resolved"?"badge-active":"badge-pending"}`}>{t.status==="resolved"?"✓ Đã xử lý":"⏳ Đang mở"}</span></td>
                <td style={{fontSize:12,color:'var(--smoke)'}}>{t.time}</td>
                <td><button className="btn btn-secondary btn-sm">Xem & Trả lời</button></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function GameshowPage() {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [prize, setPrize] = useState(null);
  const prizes = ["Khóa học UX/UI", "Giảm 50%", "Khóa học React", "Giảm 30%", "Chúc bạn may mắn", "Giảm 20%", "Khóa học Data", "Giảm 40%"];
  const spin = () => {
    if (spinning) return;
    setSpinning(true); setPrize(null);
    const extra = 1440 + Math.floor(Math.random()*360);
    const newRot = rotation + extra;
    setRotation(newRot);
    setTimeout(() => {
      const idx = Math.floor(((newRot%360)/360)*prizes.length);
      setPrize(prizes[prizes.length-1-idx]);
      setSpinning(false);
    }, 3200);
  };
  return (
    <div className="page">
      <div className="page-header"><div><div className="page-title">🎲 Gameshow Quay Số May Mắn</div><div className="page-subtitle">Quay vòng để nhận khóa học hoặc mã giảm giá miễn phí!</div></div></div>
      <div style={{display:'flex',justifyContent:'center'}}>
        <div className="card" style={{padding:0,overflow:'hidden',maxWidth:600,width:'100%'}}>
          <div style={{background:'linear-gradient(135deg,var(--ink),#1a2530)',padding:'40px',display:'flex',flexDirection:'column',alignItems:'center',gap:24}}>
            <div style={{fontSize:32}}>▼</div>
            <div style={{
              width:300,height:300,borderRadius:'50%',position:'relative',
              background:`conic-gradient(
                #c9a84c 0% 12.5%, #c94b2c 12.5% 25%, #3d4f5c 25% 37.5%,
                #4a7c59 37.5% 50%, #c9a84c 50% 62.5%, #c94b2c 62.5% 75%,
                #3d4f5c 75% 87.5%, #4a7c59 87.5% 100%
              )`,
              border:'8px solid rgba(201,168,76,0.4)',
              boxShadow:'0 0 60px rgba(201,168,76,0.2)',
              transform:`rotate(${rotation}deg)`,
              transition:spinning?'transform 3s cubic-bezier(0.2,0.8,0.3,1)':'none',
              display:'flex',alignItems:'center',justifyContent:'center'
            }}>
              <div style={{width:60,height:60,borderRadius:'50%',background:'var(--ink)',border:'4px solid rgba(201,168,76,0.5)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24}}>🎯</div>
            </div>
            <button className="btn btn-primary" style={{padding:'14px 48px',fontSize:16,opacity:spinning?0.6:1}} onClick={spin} disabled={spinning}>
              {spinning?"Đang quay...":"🎲 QUAY NGAY"}
            </button>
            {prize && !spinning && (
              <div style={{textAlign:'center',padding:'24px',background:'rgba(201,168,76,0.15)',border:'1px solid rgba(201,168,76,0.4)',borderRadius:8,width:'100%'}}>
                <div style={{fontSize:32,marginBottom:8}}>🎉</div>
                <div style={{fontFamily:'Playfair Display,serif',fontSize:22,color:'var(--gold-light)',fontWeight:700}}>Chúc mừng bạn!</div>
                <div style={{color:'rgba(250,248,244,0.8)',marginTop:6}}>Bạn nhận được: <strong style={{color:'var(--gold)'}}>{prize}</strong></div>
              </div>
            )}
          </div>
          <div className="card-body">
            <div className="section-title" style={{fontSize:16,marginBottom:12}}>Phần thưởng có thể nhận</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:8}}>
              {prizes.map((p,i)=>(
                <div key={i} style={{padding:'10px 14px',background:'var(--mist)',borderRadius:6,fontSize:13,display:'flex',alignItems:'center',gap:8}}>
                  <span>{["🎓","🏷️","🎓","🏷️","🍀","🏷️","🎓","🏷️"][i]}</span>{p}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



function getNavItems(role) {
  const common = [
    { section: "Chính", items: [
      { key:"home", icon:"🏠", label:"Trang chủ" },
      { key:"all-courses", icon:"📚", label:"Khóa học" },
      { key:"gameshow", icon:"🎲", label:"Gameshow" },
    ]},
  ];
  if (role==="customer") return [...common, { section:"Học tập", items:[
    {key:"registered-courses",icon:"📖",label:"Khóa học của tôi"},
    {key:"notifications",icon:"🔔",label:"Thông báo"},
    {key:"profile",icon:"👤",label:"Hồ sơ"},
    {key:"provider-register",icon:"🎓",label:"Đăng ký làm NCC"},
  ]}];
  if (role==="provider") return [...common, { section:"Quản lý", items:[
    {key:"provider-dashboard",icon:"📊",label:"Dashboard"},
    {key:"course-manage",icon:"📚",label:"Khóa học"},
    {key:"discount-manage",icon:"🏷️",label:"Mã giảm giá"},
    {key:"promo-manage",icon:"🎁",label:"Chương trình ưu đãi"},
    {key:"gift-manage",icon:"🎀",label:"Quà tặng"},
    {key:"revenue-report",icon:"💰",label:"Doanh thu"},
    {key:"notifications",icon:"🔔",label:"Thông báo"},
    {key:"profile",icon:"👤",label:"Hồ sơ"},
  ]}];
  if (role==="admin") return [{ section:"Tổng quan", items:[
    {key:"admin-dashboard",icon:"📊",label:"Dashboard"},
  ]},{ section:"Quản lý", items:[
    {key:"admin-courses",icon:"📚",label:"Khóa học"},
    {key:"admin-providers",icon:"🎓",label:"Nhà cung cấp"},
    {key:"admin-customers",icon:"👥",label:"Khách hàng"},
    {key:"admin-payments",icon:"💳",label:"Thanh toán"},
    {key:"admin-finance",icon:"💰",label:"Tài chính"},
  ]},{ section:"Hệ thống", items:[
    {key:"admin-notifications",icon:"🔔",label:"Thông báo"},
    {key:"admin-access",icon:"🔐",label:"Phân quyền"},
    {key:"admin-support",icon:"🛟",label:"Hỗ trợ"},
    {key:"home",icon:"🌐",label:"Xem trang chủ"},
  ]}];
  return common;
}

function getPageTitle(page) {
  const map = {
    "home":"Trang chủ","all-courses":"Tất cả Khóa học","course-detail":"Chi tiết Khóa học",
    "lesson":"Bài học","registered-courses":"Khóa học của tôi","course-review":"Đánh giá Khóa học",
    "profile":"Hồ sơ cá nhân","notifications":"Thông báo","provider-register":"Đăng ký NCC",
    "login":"Đăng nhập","register":"Đăng ký","forgot-password":"Quên mật khẩu",
    "provider-dashboard":"Dashboard NCC","course-manage":"Quản lý Khóa học",
    "lesson-manage":"Quản lý Bài giảng","discount-manage":"Mã giảm giá",
    "promo-manage":"Chương trình Ưu đãi","gift-manage":"Quà tặng","revenue-report":"Báo cáo Doanh thu",
    "admin-dashboard":"Tổng quan Hệ thống","admin-courses":"Quản lý Khóa học",
    "admin-providers":"Quản lý NCC","admin-customers":"Quản lý Khách hàng",
    "admin-payments":"Thanh toán","admin-finance":"Tài chính",
    "admin-notifications":"Thông báo","admin-access":"Phân quyền","admin-support":"Hỗ trợ",
    "gameshow":"Gameshow May Mắn",
  };
  return map[page]||page;
}

const FULL_LAYOUT_PAGES = ["login","register","forgot-password"];


export default function App() {
  const [page, setPage] = useState("home");
  const [pageData, setPageData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = (p, data=null) => { setPage(p); setPageData(data); window.scrollTo(0,0); };

  const navItems = getNavItems(currentUser?.role);
  const isFullLayout = FULL_LAYOUT_PAGES.includes(page);

  const renderPage = () => {
    switch(page) {
      case "home": return <HomePage setPage={navigate} currentUser={currentUser} />;
      case "all-courses": return <AllCoursesPage setPage={navigate} />;
      case "course-detail": return <CourseDetailPage course={pageData} setPage={navigate} currentUser={currentUser} />;
      case "lesson": return <LessonPage course={pageData} setPage={navigate} />;
      case "registered-courses": return <RegisteredCoursesPage setPage={navigate} />;
      case "course-review": return <CourseReviewPage course={pageData} />;
      case "profile": return <ProfilePage currentUser={currentUser} />;
      case "notifications": return <NotificationsPage />;
      case "provider-register": return <ProviderRegPage setPage={navigate} />;
      case "login": return <LoginPage setPage={navigate} setCurrentUser={setCurrentUser} />;
      case "register": return <RegisterPage setPage={navigate} />;
      case "forgot-password": return <ForgotPasswordPage setPage={navigate} />;
      case "provider-dashboard": return <ProviderDashboard />;
      case "course-manage": return <CourseManagementPage setPage={navigate} />;
      case "lesson-manage": return <LessonManagePage course={pageData} />;
      case "discount-manage": return <DiscountManagePage />;
      case "promo-manage": return <PromotionManagePage />;
      case "gift-manage": return <GiftManagePage />;
      case "revenue-report": return <RevenueReportPage />;
      case "admin-dashboard": return <AdminDashboard />;
      case "admin-courses": return <AdminCoursesPage />;
      case "admin-providers": return <AdminProvidersPage />;
      case "admin-customers": return <AdminCustomersPage />;
      case "admin-payments": return <AdminPaymentsPage />;
      case "admin-finance": return <AdminFinancePage />;
      case "admin-notifications": return <AdminNotificationsPage />;
      case "admin-access": return <AdminAccessPage />;
      case "admin-support": return <AdminSupportPage />;
      case "gameshow": return <GameshowPage />;
      default: return <HomePage setPage={navigate} currentUser={currentUser} />;
    }
  };

  if (isFullLayout) return (
    <div><style>{styles}</style>{renderPage()}</div>
  );

  return (
    <div><style>{styles}</style>
      <div className="app">
        <aside className="sidebar">
          <div className="sidebar-logo">
            <h1>✦ Edupress</h1>
            <p>Online Learning Platform</p>
          </div>
          {currentUser && <div className="sidebar-role"><span className="role-badge">{currentUser.role==="admin"?"⚙ Admin":currentUser.role==="provider"?"🎓 NCC":"📖 Học viên"}</span></div>}
          <nav className="sidebar-nav">
            {navItems.map(sec => (
              <div key={sec.section}>
                <div className="nav-section">{sec.section}</div>
                {sec.items.map(item => (
                  <div key={item.key} className={`nav-item ${page===item.key?"active":""}`} onClick={()=>navigate(item.key)}>
                    <span className="icon">{item.icon}</span>{item.label}
                  </div>
                ))}
              </div>
            ))}
          </nav>
          <div className="sidebar-footer">
            {currentUser
              ? <div className="sidebar-user" onClick={()=>navigate("profile")}>
                  <div className="avatar">{currentUser.name.charAt(0)}</div>
                  <div className="user-info"><div className="user-name">{currentUser.name}</div><div className="user-email">{currentUser.email}</div></div>
                  <button className="btn-icon" style={{background:'transparent',color:'var(--smoke)',fontSize:12}} onClick={e=>{e.stopPropagation();setCurrentUser(null);navigate("home");}}>⏻</button>
                </div>
              : <div style={{display:'flex',flexDirection:'column',gap:8}}>
                  <button className="btn btn-primary" style={{justifyContent:'center'}} onClick={()=>navigate("login")}>Đăng nhập</button>
                  <button className="btn btn-secondary" style={{justifyContent:'center',color:'rgba(250,248,244,0.6)',borderColor:'rgba(250,248,244,0.15)'}} onClick={()=>navigate("register")}>Đăng ký</button>
                </div>}
          </div>
        </aside>
        <main className="main">
          <div className="topbar">
            <div className="topbar-title">{getPageTitle(page)}</div>
            <div className="topbar-actions">
              {currentUser && <button className="btn-icon" onClick={()=>navigate("notifications")}>🔔</button>}
              {currentUser && <button className="btn-icon" onClick={()=>navigate("gameshow")}>🎲</button>}
              {!currentUser && <button className="btn btn-ghost btn-sm" onClick={()=>navigate("login")}>Đăng nhập</button>}
              {!currentUser && <button className="btn btn-primary btn-sm" onClick={()=>navigate("register")}>Đăng ký</button>}
            </div>
          </div>
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
