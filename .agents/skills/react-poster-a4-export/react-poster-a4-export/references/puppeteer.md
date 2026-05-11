# Fix cho Puppeteer / Playwright (server-side PDF export)

Pattern này thường có ở backend Node.js: render page lên Chromium headless, gọi `page.pdf(...)` để xuất PDF.

## Cấu hình chuẩn

### Puppeteer

```js
const puppeteer = require("puppeteer");

async function exportA4Pdf(url, outPath) {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });
  // Đảm bảo font đã load
  await page.evaluateHandle("document.fonts.ready");

  await page.pdf({
    path: outPath,
    format: "A4",                  // BẮT BUỘC
    printBackground: true,          // giữ màu nền, gradient
    preferCSSPageSize: true,        // tôn trọng `@page size` trong CSS nếu có
    margin: { top: "10mm", right: "10mm", bottom: "10mm", left: "10mm" },
  });

  await browser.close();
}
```

### Playwright (tương tự)

```js
const { chromium } = require("playwright");
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(url, { waitUntil: "networkidle" });
await page.pdf({
  path: outPath,
  format: "A4",
  printBackground: true,
  preferCSSPageSize: true,
  margin: { top: "10mm", right: "10mm", bottom: "10mm", left: "10mm" },
});
```

## Tại sao có thể vẫn tràn dù đã set `format: "A4"`

1. **CSS dùng `vw`/`vh`:** Chromium headless mở viewport mặc định 800×600, poster với `width: 100vw` sẽ chỉ là 800px → khi in vào A4 trông tí teo hoặc layout vỡ. Fix:
   ```js
   await page.setViewport({ width: 1240, height: 1754, deviceScaleFactor: 1 });
   ```
   (1240×1754 ≈ A4 ở 150 DPI)

2. **`@page size` trong CSS đặt khác A4:** Vì có `preferCSSPageSize: true`, nếu CSS có `@page { size: 250mm 350mm }` thì Puppeteer dùng cái đó. Sửa CSS lại về `size: A4`, hoặc set `preferCSSPageSize: false` để buộc dùng `format` của Puppeteer.

3. **`scale` option:** nếu code có `scale: 1.5` → ảnh phình ra. Đặt `scale: 1` (hoặc bỏ).

4. **Element rộng hơn A4 width:** Puppeteer sẽ tự cắt/scroll. Thường nên thêm CSS print như trong `print_css.md`.

## Workflow verify (rất thuận lợi ở pattern này)

Vì là server-side, có thể tự động hoàn toàn:

```bash
node export_pdf.js > /tmp/poster.pdf
python3 scripts/verify_pdf.py /tmp/poster.pdf
```

Lặp đến khi PASS — không cần user can thiệp.
