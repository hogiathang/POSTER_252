# Fix cho `@react-pdf/renderer`

Thư viện này render PDF declarative bằng JSX. Việc set A4 đơn giản:

## Đặt size A4 ở `<Page>`

```jsx
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: "10mm",            // hoặc dùng pt: 28pt ≈ 10mm
    backgroundColor: "#FFFFFF",
    flexDirection: "column",
  },
  section: {
    marginBottom: 8,
  },
});

const PosterPDF = () => (
  <Document>
    <Page size="A4" orientation="portrait" style={styles.page}>
      {/* ... nội dung poster ... */}
    </Page>
  </Document>
);
```

`size="A4"` đảm bảo PDF output luôn 210×297mm. Đây là layer quan trọng nhất.

Landscape:
```jsx
<Page size="A4" orientation="landscape" style={styles.page}>
```

## Nếu nội dung tràn

`@react-pdf/renderer` có `wrap` prop:
- Mặc định `<Page>` tự tạo thêm trang khi tràn.
- Đặt `<View wrap={false}>` cho block không được cắt giữa.

```jsx
<View wrap={false} style={styles.section}>
  <Text>Section này luôn nằm trọn 1 trang</Text>
</View>
```

## Đơn vị

`@react-pdf/renderer` mặc định dùng **point** (1 pt = 1/72 inch ≈ 0.353mm).
Để chuyển sang mm trong style: `width: "210mm"` cũng được, nhưng tốt hơn dùng `%` hoặc tránh hard-code size:

```jsx
container: {
  width: "100%",     // fill page sau khi đã trừ padding
}
```

## Custom size A4 với bleed (nếu in offset)

Nếu user muốn A4 + bleed 3mm:
```jsx
<Page size={[598.11, 850.39]} style={styles.page}>  {/* 211*2.83 pt etc */}
```
Nhưng thường poster Đại học không cần bleed → cứ dùng `size="A4"`.

## Verify

Trong React app, lưu PDF ra file:

```jsx
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";

// Hoặc programmatic:
const blob = await pdf(<PosterPDF />).toBlob();
// save blob → file → chạy verify_pdf.py trên file đó
```

Trong Node script:
```bash
node -e "
const {pdf} = require('@react-pdf/renderer');
const fs = require('fs');
// render và save vào /tmp/poster.pdf
"
python3 scripts/verify_pdf.py /tmp/poster.pdf
```

## Nếu user đang KHÔNG dùng @react-pdf/renderer mà cân nhắc chuyển sang

Đây là lựa chọn tốt cho poster vì:
- Layout không phụ thuộc trình duyệt → predictable.
- `size="A4"` là cấu hình duy nhất cần.
- Hỗ trợ multi-page tự nhiên.

Nhưng đổi sang nó nghĩa là viết LẠI layout bằng `<View>`/`<Text>` của thư viện (không phải HTML/CSS bình thường). Chi phí migrate cao — chỉ đề xuất nếu pattern hiện tại quá khó fix.
