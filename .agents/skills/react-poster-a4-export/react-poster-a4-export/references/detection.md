# Phát hiện cơ chế export PDF trong project React

Đọc file này khi đang ở **Bước 1** của skill. Mục đích: xác định đúng pattern để sang bước 2 đọc đúng reference.

## Các dấu hiệu nhanh trong `package.json`

| Dependency | Pattern |
|------------|---------|
| `react-to-print` | window.print() wrapped |
| `jspdf` + `html2canvas` | canvas-based export |
| `@react-pdf/renderer` | declarative PDF |
| `puppeteer` / `playwright` | server-side headless |
| Không có dep nào ở trên | thường là native `window.print()` |

```bash
# Quick check
cat package.json | grep -E "(jspdf|html2canvas|react-to-print|@react-pdf|puppeteer|playwright)"
```

## Tìm code export trong source

```bash
# Trigger phổ biến
grep -rEn "window\.print|html2canvas|jsPDF|useReactToPrint|<Page |page\.pdf\(" src/
```

## File CSS chi phối in ấn

Tìm các block `@media print` và `@page`:

```bash
grep -rEn "@media print|@page" src/ public/
```

Nếu hoàn toàn không có `@page` → đó gần như chắc chắn là lý do PDF bị tràn (mặc định trình duyệt sẽ in theo Letter ở US, A4 ở các region khác — rất không nhất quán).

## Đo kích thước poster hiện tại

Hỏi user hoặc inspect:
- Component root của poster đang `width` bao nhiêu?
- Có `max-width` không?
- Có dùng `vw`/`vh` (phụ thuộc viewport) hay `mm`/`cm`/`px` (cố định)?

Đơn vị `vw`/`vh` là thủ phạm phổ biến: trên màn hình thì OK, nhưng khi in, viewport ảo của trình duyệt khác hẳn → tràn.

## Quyết định pattern

- Có `@react-pdf/renderer` + JSX `<Document><Page>` → đọc `react_pdf_renderer.md`
- Có `html2canvas` + `jsPDF` → đọc `html2canvas_jspdf.md`
- Có `react-to-print` hoặc gọi `window.print()` → đọc `print_css.md`
- Có `puppeteer`/`playwright` ở backend → đọc `puppeteer.md`
- Không tìm thấy gì → mặc định là `window.print()`, đọc `print_css.md`, có thể cần thêm cả thư viện chuyển đổi nếu user muốn workflow tự động

## Câu cần hỏi user (chỉ khi cần)

- "Poster muốn export A4 **dọc** (portrait) hay **ngang** (landscape)?" (mặc định dọc nếu không rõ)
- "Chấp nhận chia thành nhiều trang A4 không, hay phải gói gọn 1 trang?"
- "Mình build dev được ngay trên máy này không, hay cần bạn export rồi gửi file PDF cho mình verify?"
