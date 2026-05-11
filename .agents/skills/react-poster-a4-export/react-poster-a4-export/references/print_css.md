# Fix cho `window.print()` / `react-to-print`

Pattern này dựa hoàn toàn vào CSS. Trình duyệt sẽ tự render trang in dựa trên `@page` và `@media print`.

## Template CSS chuẩn cho A4

Thêm vào file CSS gốc (ví dụ `src/index.css`, `src/App.css`, hoặc tạo `src/print.css` và import):

```css
/* === A4 PRINT SETUP === */
@page {
  size: A4 portrait;              /* hoặc 'A4 landscape' */
  margin: 10mm;                   /* lề giấy — chỉnh nếu cần thêm chỗ */
}

@media print {
  /* Reset toàn cục cho print */
  html, body {
    width: 210mm;                 /* bằng đúng A4 trừ lề */
    min-height: 297mm;
    margin: 0;
    padding: 0;
    background: white;
    -webkit-print-color-adjust: exact;     /* giữ màu nền/gradient khi in */
    print-color-adjust: exact;
  }

  /* Component root của poster — THAY .poster-root bằng class/id thật */
  .poster-root {
    width: 100%;
    max-width: 190mm;             /* 210mm - 2*10mm margin */
    margin: 0 auto;
    box-shadow: none !important;  /* tắt shadow vì không in được */
    transform: none !important;   /* tắt mọi scale/translate dùng cho preview */
  }

  /* Ẩn các phần không cần in (nút bấm, navigation, sidebar, v.v.) */
  .no-print,
  button.export-btn,
  nav,
  .toolbar {
    display: none !important;
  }

  /* Tránh cắt giữa các block quan trọng */
  .section, .card, figure, table {
    page-break-inside: avoid;
    break-inside: avoid;
  }

  /* Nếu poster dài hơn 1 trang, mỗi section lớn sang trang mới */
  .section.page-break {
    page-break-before: always;
    break-before: page;
  }

  /* Cho phép màu/ảnh nền hiển thị (nếu poster có dải gradient header) */
  *, *::before, *::after {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
}
```

## Tối ưu không gian khi poster vẫn tràn

Thêm trong `@media print`, theo thứ tự, dừng ở mức làm cho fit:

```css
@media print {
  html { font-size: 13px; }                /* mặc định 16px → giảm xuống */
  .poster-root { gap: 8px; }
  .section { padding: 6px 10px; }
  .section h2 { font-size: 14px; margin: 4px 0; }
  .section p { font-size: 10px; line-height: 1.3; }
  img, svg { max-height: 60mm; object-fit: contain; }
}
```

Nếu poster gốc đang dạng "1 cột dọc thật dài" mà cần ép vào 1 trang A4 → cân nhắc đổi sang grid 2 cột trong `@media print`:

```css
@media print {
  .poster-root {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  .section.full-width {
    grid-column: 1 / -1;          /* các section header chiếm cả 2 cột */
  }
}
```

## Tích hợp với `react-to-print`

Nếu dùng `react-to-print`, prop `pageStyle` có thể inject CSS:

```jsx
const handlePrint = useReactToPrint({
  content: () => posterRef.current,
  pageStyle: `
    @page { size: A4 portrait; margin: 10mm; }
    @media print {
      body { -webkit-print-color-adjust: exact; }
    }
  `,
});
```

Nhưng tốt hơn vẫn là đặt trong file CSS để dễ debug và versioning.

## Gotchas

- Chrome có thể cache print preview cũ — luôn mở tab incognito để test, hoặc nhấn "More settings → Default → Save" để hard refresh.
- `transform: scale()` trên ancestor sẽ phá page-break. Tắt mọi transform trong `@media print`.
- Nếu user "Save as PDF" trong dialog print, kiểm tra dropdown "Paper size" có đang là A4 không. `@page size: A4` nên buộc thành A4 nhưng một số phiên bản Chrome bug → cần dặn user chọn A4 thủ công nếu vẫn ra sai.

## Workflow để verify

`window.print()` không trả lại file để mình tự verify. Có 2 cách:

1. **Tự build + tự test (nếu môi trường cho phép Chromium headless):**
   ```bash
   # Cài chromium nếu chưa có, sau đó:
   chromium --headless --disable-gpu \
     --print-to-pdf=/tmp/poster_test.pdf \
     --no-pdf-header-footer \
     http://localhost:5173        # hoặc URL dev server
   python3 scripts/verify_pdf.py /tmp/poster_test.pdf
   ```

2. **Nhờ user export rồi gửi lại file PDF:** sau khi sửa CSS, đưa user lệnh / hướng dẫn save-as-PDF, yêu cầu họ upload PDF, rồi chạy verify_pdf.py trên file đó. Chấp nhận được vì user là người nghiệm thu cuối.
