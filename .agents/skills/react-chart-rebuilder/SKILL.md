---
name: react-chart-rebuilder
description: Vẽ lại các biểu đồ (bar chart, line chart, grouped bar) đang ở dạng ảnh tĩnh thành React component có thể chỉnh sửa được, bằng Recharts. Sử dụng skill này khi người dùng có một ảnh chart (PNG/JPG screenshot từ Excel, matplotlib, PowerPoint, slide thuyết trình, báo cáo khoa học) và muốn tái tạo lại trong React/Next.js để có thể edit số liệu, đổi màu, hoặc đưa vào website. Trigger khi người dùng nói "vẽ lại bằng react", "import bằng ảnh nên không sửa được", "convert chart sang react", "tái tạo biểu đồ", "rebuild chart in react", hoặc upload ảnh chart kèm yêu cầu tạo component. CRITICAL — ưu tiên giữ chính xác số liệu, màu sắc, loại chart từ ảnh gốc, số liệu hiển thị trên bar phải rõ ràng và dễ đọc.
---

# React Chart Rebuilder

Skill này dùng để chuyển một ảnh biểu đồ (screenshot) thành React component dùng Recharts, giữ nguyên số liệu, màu, kiểu chart.

## Quy trình bắt buộc

### Bước 1 — Đọc ảnh và bóc tách dữ liệu

Đây là bước quan trọng nhất. Đừng đoán số. Hãy:

1. **View ảnh trực tiếp** bằng `view` tool để Claude tự đọc.
2. Nếu ảnh quá nhỏ hoặc nhiều chart trong 1 hình, dùng PIL crop từng chart riêng và phóng to (`resize` lên ít nhất 2×–3×) rồi view lại từng cái.
3. Với mỗi chart, ghi ra một bảng:
   - Loại chart (bar / grouped bar / line / stacked bar / pie...)
   - Tên các series (legend)
   - Tên các category (trục X)
   - Giá trị từng cột — copy đúng số được ghi trên đầu bar (data labels). Nếu không có label, ước lượng theo lưới Y và ghi rõ "ước lượng".
   - Đơn vị trục Y, label trục Y, label trục X
   - Tiêu đề chart (nếu có)
   - Màu của từng series (mã hex ước lượng — xem `references/color-extraction.md`)

4. **Confirm với user** bảng dữ liệu trước khi viết code, trừ khi user đã yêu cầu làm liền không cần xác nhận.

### Bước 2 — Chọn library

Mặc định: **Recharts**. Lý do: khả dụng sẵn trong artifact React, API rõ ràng, hỗ trợ data label trên bar tốt qua `<LabelList>`.

Import chuẩn:
```jsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, ResponsiveContainer } from 'recharts';
```

### Bước 3 — Viết component

Quy tắc:

- **Một component / một chart**, sau đó tổng hợp trong 1 component cha.
- Dùng `ResponsiveContainer` với chiều cao cố định (300–400px tuỳ density).
- Data labels luôn bật — đây là lý do user vẽ lại chart, để số đọc được:
  ```jsx
  <Bar dataKey="value" fill={color}>
    <LabelList dataKey="value" position="top" formatter={(v) => `${v}%`} />
  </Bar>
  ```
- Nếu user yêu cầu "không cần interactive" → bỏ `<Tooltip />`, giữ legend tĩnh.
- Trục Y: set `domain={[0, max]}` rõ ràng để bar không bị cắt label trên.
- Margin top ≥ 20 để label "X%" trên bar không bị cắt.
- Font số liệu trên bar: tối thiểu 11px, weight 600. Nếu nhiều bar sát nhau, dùng 10px nhưng vẫn bold.

### Bước 4 — Bảo toàn màu

- Lấy màu từ ảnh gốc (xem `references/color-extraction.md`).
- Định nghĩa palette ở đầu file thành một object `const COLORS = {...}` để dễ chỉnh.
- Không tự ý đổi sang palette "đẹp hơn". User đã yêu cầu giữ nguyên màu.

### Bước 5 — Layout nhiều chart

Nếu ảnh gốc có nhiều chart cùng trang (ví dụ 2 trên / 1 dưới như layout báo cáo):

- Tái tạo grid layout bằng Tailwind: `grid grid-cols-2 gap-4` cho hàng trên, `col-span-2` cho chart dưới.
- Mỗi chart bọc trong card `bg-white rounded-lg border p-4` để đồng nhất với báo cáo.
- Nếu có heading section ("5. Kết quả thực nghiệm" v.v.) thì tái tạo luôn.

## Checklist trước khi giao code

- [ ] Số liệu trên từng bar khớp 100% với ảnh gốc (đã so từng số).
- [ ] Màu từng series khớp với ảnh gốc (so visual side-by-side).
- [ ] Legend đầy đủ tên series.
- [ ] Trục Y có label đơn vị (% / số / etc.) đúng.
- [ ] Tên category trục X đúng.
- [ ] Layout (1 chart, 2 chart hàng ngang, hoặc grid) khớp với ảnh gốc.
- [ ] Data labels hiển thị, không bị cắt, font đủ lớn.

## Reference files

- `references/color-extraction.md` — cách đọc và đặt tên màu từ ảnh.
- `references/recharts-patterns.md` — các pattern Recharts hay dùng cho grouped bar, stacked bar, line, etc.

## Anti-patterns

- ❌ Tự bịa số liệu khi ảnh mờ — phải crop + zoom rồi đọc lại.
- ❌ Đổi sang Chart.js / Plotly khi không có lý do — Recharts là default trong artifact React.
- ❌ Bỏ data labels để "trông gọn hơn" — số liệu là lý do user nhờ vẽ lại.
- ❌ Dùng màu Tailwind defaults (`blue-500`, `red-500`) thay vì màu chính xác từ ảnh.
- ❌ Để `<Tooltip />` khi user đã nói "không cần interactive".