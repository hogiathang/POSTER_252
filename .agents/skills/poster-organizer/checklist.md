# Checklist trước khi báo "xong"

Đây là checklist đầy đủ. Đi qua từng mục một, đánh ✓ hoặc ✗ trong đầu, fix ngay nếu ✗.

## Cấu trúc

- [ ] Có **header block** ở trên cùng, trải hết chiều ngang
- [ ] Header gồm: logo + tên trường/khoa + tên đề tài + GVHD + SVTH+MSSV
- [ ] Tên đề tài là **chữ lớn nhất** trong toàn poster
- [ ] Có **đúng 2 cột** (hoặc 3 nếu đã thoả thuận với user) cho phần nội dung
- [ ] Có ít nhất 5 sections, ưu tiên 6 (chia chẵn 3-3 cho 2 cột)
- [ ] Nếu có footer (QR, mã đề tài), nó trải hết chiều ngang ở dưới cùng

## Numbering & headings

- [ ] Mỗi section có **số badge** rõ ràng (1, 2, 3, ...)
- [ ] Số đi tuần tự theo thứ tự đọc: cột trái trên→dưới, rồi cột phải trên→dưới (hoặc theo flow đã thống nhất với user)
- [ ] Tiêu đề section đậm, font size > body text ít nhất 1.5x
- [ ] Màu accent của số badge và tiêu đề section nhất quán toàn poster

## Hình ảnh

- [ ] Mọi hình từ `src/imports/` được dùng ít nhất 1 lần (trừ khi user nói explicit là không cần)
- [ ] Logo trường ở header, không ở chỗ khác
- [ ] Hình được đặt ngay trong section liên quan (sơ đồ phương pháp ở section 3, kết quả ở section 5, ...)
- [ ] Không có hình bị méo (vẫn giữ aspect ratio gốc, dùng `object-contain` hoặc `object-cover` chủ ý)
- [ ] Không có hình quá nhỏ (<150px width) làm mất chi tiết
- [ ] Caption ngắn dưới hình nếu hình là biểu đồ/bảng

## Nội dung

- [ ] Section 1 (Giới thiệu/Đặt vấn đề) trả lời: vấn đề là gì, tại sao quan trọng
- [ ] Section 2 (Yêu cầu/Thách thức) cụ thể, đo được
- [ ] Section 3 (Phương pháp) nêu approach chính, không lan man
- [ ] Section 4 (Kiến trúc) có sơ đồ + chú thích các thành phần
- [ ] Section 5 (Kết quả) có **số liệu cụ thể**, không nói chung chung
- [ ] Section 6 (Kết luận) có 2-3 ý đóng góp + 1-2 hướng phát triển
- [ ] Không có lorem ipsum, không có placeholder text còn sót

## Tailwind & code health

- [ ] Container poster có chiều rộng cố định (~1240px cho A1, ~1654px cho A0)
- [ ] Background không trắng tinh — dùng kem nhạt (`#F5F0E8`) hoặc xám rất nhạt để section trắng nổi lên
- [ ] Section card có border hoặc shadow để tách bạch
- [ ] Padding section ≥ `p-4` (không bí), gap giữa sections ≥ `gap-4`
- [ ] Font size body 12-14px (`text-xs` đến `text-sm`), heading section 20-28px (`text-xl` đến `text-2xl`)
- [ ] Không còn `className=""` trống, không còn comment `{/* TODO */}`
- [ ] File compile (TypeScript không báo lỗi đỏ)

## Tinh thần poster

- [ ] Nếu in ra A1 và đứng cách 1m, có thể đọc được tiêu đề + số liệu chính
- [ ] Có thể nắm ý chính của đề tài chỉ trong 30 giây nhìn lướt
- [ ] Mật độ thông tin cao nhưng không rối — mắt đi được theo flow số

## Báo cáo cuối cùng cho user

Khi báo xong, kèm:
1. Ảnh chụp / link xem live (nếu user đang chạy `npm run dev`)
2. Danh sách section đã thay đổi + file:line tương ứng
3. Nếu có gì user nên review thủ công (ví dụ "tôi đoán thứ tự sections là X→Y, bạn xác nhận"), nói rõ
4. Nếu có hình trong `src/imports/` chưa dùng được vì không rõ nội dung, list ra để user quyết
