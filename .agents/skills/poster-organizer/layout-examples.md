# Layout Examples

Các ví dụ layout poster học thuật đầy đủ, copy-paste được. Đọc file này khi cần một template cụ thể để áp dụng nhanh.

## Layout A — 2 cột đều, 6 sections (mặc định, dùng cho hầu hết đề tài)

Đây là layout của poster mẫu chuẩn (tham khảo hình mẫu hội nghị). Khuyên dùng làm baseline.

```tsx
<div className="w-[1240px] min-h-[1754px] mx-auto bg-white text-[#1F1F1F]">
  {/* HEADER */}
  <header className="bg-[#0F2A5F] text-white px-10 py-6 flex items-start gap-6">
    <img src={bachkhoaLogo} className="w-24 h-24 object-contain bg-white rounded p-1" />
    <div className="flex-1">
      <div className="text-base font-semibold uppercase tracking-wider">
        TRƯỜNG ĐẠI HỌC BÁCH KHOA — ĐHQG-HCM
      </div>
      <div className="text-sm opacity-90 mb-3">
        KHOA KHOA HỌC VÀ KỸ THUẬT MÁY TÍNH
      </div>
      <h1 className="text-4xl font-bold leading-tight mb-3">
        {/* TÊN ĐỀ TÀI */}
      </h1>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="opacity-80">GVHD:</div>
          <div>TS. ...</div>
        </div>
        <div>
          <div className="opacity-80">SVTH:</div>
          <div>... — MSSV ...</div>
          <div>... — MSSV ...</div>
        </div>
      </div>
    </div>
  </header>

  {/* MAIN GRID */}
  <main className="grid grid-cols-2 gap-5 p-8 bg-[#F5F0E8]">
    {/* Section 1 */}
    <SectionCard number={1} title="Giới thiệu" accent="#7C3AED">
      {/* content */}
    </SectionCard>

    {/* Section 2 */}
    <SectionCard number={2} title="Yêu cầu / Thách thức" accent="#7C3AED">
      {/* content */}
    </SectionCard>

    {/* Section 3 */}
    <SectionCard number={3} title="Phương pháp nghiên cứu" accent="#7C3AED">
      {/* content + image from src/imports/method/ */}
    </SectionCard>

    {/* Section 4 */}
    <SectionCard number={4} title="Kiến trúc hệ thống" accent="#7C3AED">
      {/* image from src/imports/algorithm/ + chú thích */}
    </SectionCard>

    {/* Section 5 — có thể span 2 cột nếu nhiều bảng */}
    <SectionCard number={5} title="Kết quả thực nghiệm" accent="#7C3AED">
      {/* tables + charts from src/imports/ket_qua_thuc_nghiem/ */}
    </SectionCard>

    {/* Section 6 */}
    <SectionCard number={6} title="Kết luận" accent="#7C3AED">
      {/* content */}
    </SectionCard>
  </main>
</div>
```

Component `SectionCard`:

```tsx
function SectionCard({ number, title, accent, children }: Props) {
  return (
    <section className="bg-white border border-[#E5E7EB] rounded-md p-5">
      <div className="flex items-center gap-3 mb-3 pb-2 border-b border-[#E5E7EB]">
        <div
          className="w-10 h-10 rounded flex items-center justify-center text-white font-bold text-lg"
          style={{ backgroundColor: accent }}
        >
          {number}
        </div>
        <h2 className="text-2xl font-bold" style={{ color: accent }}>
          {title}
        </h2>
      </div>
      <div className="text-[13px] leading-relaxed text-[#2C2C2A]">
        {children}
      </div>
    </section>
  );
}
```

## Layout B — Cột trái rộng hơn (cho đề tài có sơ đồ kiến trúc lớn)

Dùng khi có 1-2 hình rất lớn (architecture diagram, full pipeline) cần ưu tiên hiển thị.

```tsx
<main className="grid grid-cols-[1.3fr_0.9fr] gap-5 p-8 bg-[#F5F0E8]">
  {/* Cột trái: Section 1, 3, 5 với hình to */}
  {/* Cột phải: Section 2, 4, 6 ngắn gọn */}
</main>
```

## Layout C — 3 hàng ngang (khi có nhiều section)

Khi đề tài có 7-8 sections, có thể dùng 2 cột × 4 hàng, hoặc 3 cột × 3 hàng. Lưu ý: 3 cột chỉ nên dùng khi text rất ngắn, vì khó đọc.

```tsx
<main className="grid grid-cols-3 gap-4 p-8 bg-[#F5F0E8]">
  {/* 9 sections */}
</main>
```

## Color palettes gợi ý

**Bách Khoa classic** (xanh dương đậm):
- Header bg: `#0F2A5F` hoặc `#1E3A8A`
- Accent: `#1E3A8A`
- Bg: `#F5F0E8` (kem nhạt)
- Text: `#1F1F1F` body, `#1E3A8A` heading

**Hội nghị tím-vàng** (như poster mẫu):
- Header bg: `#0F2A5F`
- Accent: `#7C3AED` (tím)
- Bg: `#F5F0E8`
- Section border: `#E5E7EB`

**Trung tính chuyên nghiệp**:
- Header bg: `#1F2937`
- Accent: `#0F766E` (teal)
- Bg: `#FAFAF9`

## Footer (optional)

Nếu poster cần QR code (link tới repo, demo) hoặc thông tin liên hệ:

```tsx
<footer className="border-t border-[#D1D5DB] px-10 py-4 flex items-center justify-between text-xs text-[#6B7280]">
  <div>HK252-DATN-396 | Nhóm HCMUT_MALLLM</div>
  <div className="flex items-center gap-3">
    <span>Repo / Demo:</span>
    <img src={qrCode} className="w-12 h-12" />
  </div>
</footer>
```
