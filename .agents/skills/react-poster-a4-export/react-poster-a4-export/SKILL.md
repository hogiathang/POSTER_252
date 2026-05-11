---
name: react-poster-a4-export
description: Tự động reshape một poster/dashboard React về đúng khổ giấy A4 khi export PDF, đồng thời verify lại file PDF đầu ra để đảm bảo kích thước chính xác. Sử dụng skill này bất cứ khi nào người dùng nói rằng "PDF export bị tràn", "vượt kích thước A4", "poster không vừa trang in", "fix print CSS cho React", "tối ưu poster cho A4", "reshape poster về A4", hoặc khi có một component/page React mà output PDF không khớp khổ A4 (210mm × 297mm). Skill này bắt buộc phải verify kết quả cuối cùng bằng cách kiểm tra dimensions thực tế của file PDF — chỉ được báo "xong" khi PDF output đo được đúng A4.
---

# React Poster → A4 PDF Export

Skill này dùng cho tình huống điển hình: có một poster/dashboard React render đẹp trên màn hình nhưng khi export PDF thì bị tràn — chữ bị cắt, layout vượt khỏi 1 trang, hoặc kích thước trang sai (Letter thay vì A4, hoặc kích thước tùy biến quá lớn).

Mục tiêu cuối cùng: **file PDF output phải đo được đúng A4 (210mm × 297mm, sai số ≤ 1mm)** và toàn bộ nội dung poster phải fit trong 1 trang (hoặc nhiều trang A4 nếu poster quá dài, nhưng vẫn đúng khổ).

## Nguyên tắc cốt lõi

1. **Không được kết thúc skill mà chưa verify.** Sau mỗi lần sửa CSS/code, phải build, export PDF và chạy `scripts/verify_pdf.py` để đo dimensions. Nếu không đạt → lặp lại.
2. **Sửa CSS trước, sửa cấu hình thư viện sau.** Đa số lỗi tràn A4 đến từ việc thiếu `@page`, sai `size`, hoặc dùng `width: 100vw` thay vì kích thước cố định.
3. **Bảo toàn nội dung.** Tối ưu không gian (giảm padding, font-size, chia cột lại) nhưng không xóa thông tin của poster.

## Quy trình bắt buộc (4 bước, lặp đến khi pass)

### Bước 1 — Khám phá project

Trước khi sửa bất cứ thứ gì, xác định:

- **Cơ chế export PDF** đang dùng là gì? Các pattern phổ biến trong React:
  - `window.print()` + print CSS (`@media print`, `@page`)
  - `html2canvas` + `jsPDF`
  - `react-to-print`
  - `@react-pdf/renderer` (declarative, có sẵn `<Page size="A4">`)
  - Puppeteer/Playwright headless (thường ở backend)
- File nào chứa logic export? File CSS/SCSS nào chi phối print? Component nào là "root" của poster?
- Kích thước poster hiện tại đang là bao nhiêu? (đo bằng DevTools hoặc đọc CSS)

Đọc `references/detection.md` để biết cách nhận diện từng pattern và file cần tìm.

### Bước 2 — Áp dụng fix theo pattern đã nhận diện

Mỗi pattern có cách fix khác nhau. Đọc đúng file reference:

- `references/print_css.md` — cho `window.print()`, `react-to-print`. Quan trọng: `@page { size: A4; margin: ...}`, `@media print` overrides, `-webkit-print-color-adjust: exact`.
- `references/html2canvas_jspdf.md` — cho `html2canvas + jsPDF`. Quan trọng: tính ratio mm/px, scale, dùng `format: 'a4'` và tính `imgWidth = 210` mm.
- `references/react_pdf_renderer.md` — cho `@react-pdf/renderer`. Quan trọng: `<Page size="A4">`, dùng `StyleSheet` với đơn vị point/percentage thay vì px.
- `references/puppeteer.md` — cho Puppeteer/Playwright. Quan trọng: `page.pdf({ format: 'A4', printBackground: true, preferCSSPageSize: true })`.

Sau khi áp dụng fix CSS/code, nếu poster vẫn tràn vì nội dung quá dày, áp dụng các kỹ thuật tối ưu không gian (theo thứ tự ưu tiên):

1. Chỉnh `@page { margin }` xuống (8–12mm là an toàn cho hầu hết máy in).
2. Giảm `font-size` cơ sở (ví dụ `html { font-size: 12px }` trong `@media print`).
3. Giảm `padding`/`gap` của các section.
4. Chia lại grid (ví dụ section đang 1 cột → 2 cột để tiết kiệm chiều cao).
5. Dùng `page-break-inside: avoid` cho block không được cắt; `page-break-before: always` cho section sang trang mới (nếu chấp nhận nhiều trang A4).

**Luôn giữ một bản backup** của file CSS gốc trước khi sửa (copy sang `*.backup` chẳng hạn) để có thể rollback nếu fix làm hỏng layout màn hình.

### Bước 3 — Build và export PDF thử

Chạy build/dev của project, mở chế độ export PDF, lưu file PDF kết quả ra một đường dẫn cụ thể (ví dụ `/tmp/poster_test.pdf` hoặc trong workspace). Hỏi user nếu không tự chạy được build trong môi trường hiện tại — trong trường hợp đó, đưa cho user lệnh để tự export và đường dẫn để họ upload file PDF lại cho mình verify.

### Bước 4 — Verify (BẮT BUỘC, không được bỏ qua)

Chạy script verify:

```bash
python3 scripts/verify_pdf.py <đường-dẫn-pdf>
```

Script sẽ in ra:
- Số trang
- Dimensions của từng trang (mm)
- Kết luận PASS/FAIL theo chuẩn A4 (210 × 297 mm, tolerance ≤ 1mm)
- Cảnh báo nếu có dấu hiệu nội dung bị cắt (rất hẹp hoặc rất rộng so với A4)

**Tiêu chí PASS:**
- Tất cả các trang đều có dimensions = A4 (portrait 210×297 hoặc landscape 297×210, tùy yêu cầu)
- Sai số mỗi chiều ≤ 1mm

Nếu FAIL → quay lại Bước 2 với thông tin mới (ví dụ trang đang là 250×350mm thì biết là `@page size` chưa được áp, hoặc html2canvas đang scale sai).

Chỉ báo cáo "xong" với user **sau khi** script verify in ra PASS. Đính kèm output của script trong reply cuối cùng để user thấy bằng chứng.

## Anti-patterns cần tránh

- ❌ Báo "đã sửa xong" mà chưa chạy verify_pdf.py.
- ❌ Đặt `width: 210mm; height: 297mm` ở component root nhưng không có `@page size: A4` → trình duyệt vẫn in ra Letter.
- ❌ Dùng `transform: scale(...)` để "ép" cho vừa — sẽ làm chữ mờ và sai layout in.
- ❌ Xóa nội dung poster mà không hỏi user.
- ❌ Sửa cả file CSS toàn cục thay vì chỉ trong `@media print` — sẽ phá layout màn hình.

## Khi nào hỏi user

Hỏi user (qua 1 câu ngắn gọn) trước khi sửa nếu:
- Không xác định được poster đang muốn A4 portrait hay landscape.
- Poster quá dài, cần biết user muốn ép vào 1 trang (chấp nhận chữ rất nhỏ) hay chia nhiều trang A4.
- Không tìm thấy logic export PDF trong code → cần user chỉ chỗ.

Các quyết định CSS/layout nhỏ thì cứ tự sửa, không cần hỏi.

## Tóm tắt vòng lặp

```
[Bước 1: Khám phá] → [Bước 2: Sửa CSS/code] → [Bước 3: Export PDF] → [Bước 4: verify_pdf.py]
                                ↑                                              │
                                └───────── nếu FAIL ───────────────────────────┘
                                                            │
                                                          PASS → báo cáo cho user + đính kèm output script
```
