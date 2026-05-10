# Color Extraction từ ảnh chart

## Cách lấy màu

1. **Bằng mắt + so sánh palette quen thuộc**:
   - Xanh navy đậm (matplotlib `tab:blue` cũ) ≈ `#1f3a68` hoặc `#1e3a8a`
   - Xanh dương sáng (matplotlib default) ≈ `#1f77b4` hoặc `#4a90d2`
   - Cam (matplotlib `tab:orange`) ≈ `#ff7f0e` hoặc `#f0932b`
   - Đỏ san hô / đỏ Excel ≈ `#e74c3c` hoặc `#d62728`
   - Xanh teal Excel ≈ `#3aa6a0` hoặc `#26a69a`
   - Xanh lá nhạt (sage) ≈ `#a3c585` hoặc `#8fbc8f`
   - Đỏ rosé (Excel modern) ≈ `#c55a5a` hoặc `#d97a7a`
   - Xanh xám (Excel modern blue) ≈ `#5b7fb8` hoặc `#6a8cba`

2. **Bằng PIL nếu cần chính xác**:
   ```python
   from PIL import Image
   img = Image.open('chart.png')
   # Pick a pixel inside the bar (avoid edges & borders)
   r,g,b = img.getpixel((x, y))[:3]
   print(f'#{r:02x}{g:02x}{b:02x}')
   ```

## Pattern phổ biến cần nhận diện

### Excel modern (Office 365 default theme)
- `#5b7fb8` (xanh) / `#c55a5a` (đỏ rosé) / `#a3c585` (xanh sage)
- Đặc trưng: bão hòa thấp, hơi mờ, không quá sặc sỡ.

### Matplotlib classic
- `#1f77b4` / `#ff7f0e` / `#2ca02c` / `#d62728`
- Đặc trưng: rất sặc sỡ, độ tương phản cao.

### Báo cáo khoa học VN (matplotlib + tweak)
- Xanh đậm + xanh nhạt cùng tone (`#1e3a8a` + `#3b82f6`) cho chart so sánh 2 trường hợp.
- Hoặc 4 màu tương phản (xanh/cam/đỏ/teal) cho chart so sánh nhiều phương pháp.

## Output format khuyến nghị

Đặt palette làm constant ở đầu file:
```jsx
const COLORS = {
  static_sfr: '#1e3a8a',
  taint_sfr: '#3b82f6',
  ccmd: '#5b7fb8',
  static_slicing: '#f0932b',
  taint_slicing: '#e57373',
  baseline: '#4db6ac',
};
```

Tên key dùng snake_case theo nội dung, không theo màu (vì màu có thể đổi). Comment mã hex gốc để trace nguồn nếu cần.