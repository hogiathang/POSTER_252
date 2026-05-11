# Fix cho `html2canvas` + `jsPDF`

Đây là pattern phổ biến trong React: chụp DOM thành canvas (image), nhét vào PDF. Vấn đề tràn A4 thường do:

1. Không khai báo `format: 'a4'` khi tạo `jsPDF`.
2. Tính kích thước ảnh dán vào PDF không đúng → ảnh to hơn trang.
3. Poster cao hơn A4 mà code chỉ tạo 1 trang.

## Code template chuẩn

```jsx
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

async function exportPosterToA4Pdf(elementId = "poster-root") {
  const node = document.getElementById(elementId);
  if (!node) throw new Error("Không tìm thấy poster element");

  // 1) Chụp DOM thành canvas, scale cao để nét
  const canvas = await html2canvas(node, {
    scale: 2,                  // 2 = retina-ish; tăng lên 3 nếu cần nét hơn
    useCORS: true,
    backgroundColor: "#ffffff",
    windowWidth: node.scrollWidth,
    windowHeight: node.scrollHeight,
  });

  // 2) Tạo PDF A4 portrait
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",              // BẮT BUỘC — nếu thiếu, mặc định là Letter
  });

  // 3) Tính tỉ lệ — giữ tỉ lệ poster, fit theo chiều rộng A4
  const imgWidthMm = A4_WIDTH_MM;
  const imgHeightMm = (canvas.height * imgWidthMm) / canvas.width;

  const imgData = canvas.toDataURL("image/png");

  if (imgHeightMm <= A4_HEIGHT_MM) {
    // Fit gọn 1 trang
    pdf.addImage(imgData, "PNG", 0, 0, imgWidthMm, imgHeightMm);
  } else {
    // Poster cao hơn A4 → chia nhiều trang
    let positionMm = 0;
    while (positionMm < imgHeightMm) {
      pdf.addImage(imgData, "PNG", 0, -positionMm, imgWidthMm, imgHeightMm);
      positionMm += A4_HEIGHT_MM;
      if (positionMm < imgHeightMm) pdf.addPage();
    }
  }

  pdf.save("poster.pdf");
}
```

## Nếu user muốn ép vào ĐÚNG 1 trang A4

Đổi cách tính: fit theo chiều **cao hơn** (chiều bị giới hạn ngặt hơn):

```js
const ratio = Math.min(
  A4_WIDTH_MM / (canvas.width  * PX_TO_MM),
  A4_HEIGHT_MM / (canvas.height * PX_TO_MM)
);
const drawW = canvas.width  * PX_TO_MM * ratio;
const drawH = canvas.height * PX_TO_MM * ratio;
const offsetX = (A4_WIDTH_MM  - drawW) / 2;
const offsetY = (A4_HEIGHT_MM - drawH) / 2;
pdf.addImage(imgData, "PNG", offsetX, offsetY, drawW, drawH);
```

Với `PX_TO_MM = 25.4 / 96` (96 DPI là baseline CSS).

Lưu ý: nếu poster ratio rất "cao gầy" so với A4, ép vào 1 trang sẽ làm chữ nhỏ tí. Báo user biết trade-off này.

## Landscape

```js
const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
// Đảo W/H:
const A4_W = 297, A4_H = 210;
```

## Gotchas

- `html2canvas` không render `<iframe>`, một số CSS như `filter`, `mix-blend-mode` cũng có thể fail. Test kỹ.
- Font không nhúng → chữ có thể hơi khác. Đảm bảo font đã load (`document.fonts.ready`) TRƯỚC khi gọi html2canvas:
  ```js
  await document.fonts.ready;
  const canvas = await html2canvas(node, {...});
  ```
- Element phải có kích thước cố định khi chụp. Nếu nó dùng `100vw` → set tạm `width: 1240px` (gần A4 ở 150 DPI) hoặc dùng `windowWidth` option.

## Verify

Sau khi sửa, gọi `exportPosterToA4Pdf()`, file sẽ được save về Downloads (hoặc thay `pdf.save` bằng `pdf.output('blob')` để lưu trực tiếp). Lấy file đó, chạy:

```bash
python3 scripts/verify_pdf.py /path/to/poster.pdf
```

PASS = mỗi trang đo được 210×297mm (±1mm).
