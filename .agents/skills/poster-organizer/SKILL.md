---
name: poster-organizer
description: Tổ chức lại đồng thời layout VÀ nội dung cho poster học thuật/đồ án tốt nghiệp được render bằng React + Tailwind (App.tsx), theo chuẩn poster hội nghị 2 cột × 6 sections đánh số. Sử dụng skill này bất cứ khi nào người dùng nhắc đến "poster", "tổ chức lại poster", "sắp xếp poster", "layout poster", "poster đồ án", "poster nghiên cứu", "poster khoa học", hoặc khi họ có một file App.tsx render poster học thuật và muốn cải thiện cả bố cục lẫn nội dung text từng section. Cũng kích hoạt khi người dùng đưa ảnh poster mẫu kèm yêu cầu chỉnh poster của họ theo mẫu đó. Bắt buộc đi qua quy trình outline-rồi-confirm-rồi-sửa, không được sửa code khi chưa có xác nhận rõ ràng từ người dùng.
---

# Poster Organizer

Skill này giúp tổ chức lại **đồng thời layout + nội dung** cho poster học thuật (đồ án tốt nghiệp, nghiên cứu khoa học, hội nghị) đang được render bằng React + Tailwind.

## Khi nào dùng skill này

Người dùng thường có sẵn:
- Một project React + Tailwind với file `src/app/App.tsx` chứa toàn bộ markup poster
- Một thư mục `src/imports/` chứa các hình ảnh tài nguyên (sơ đồ thuật toán, kết quả thực nghiệm, hình minh hoạ phương pháp, logo trường, v.v.)
- Một poster hiện tại trông "lệch chuẩn" — thường là layout 1 cột giống báo cáo, nhiều khoảng trắng, sections rời rạc, nội dung text rời rạc hoặc chưa có

Mục tiêu: biến nó thành poster học thuật chuẩn — **2 cột, đúng 6 sections đánh số (Giới thiệu, Yêu cầu/Thách thức, Phương pháp, Kiến trúc, Kết quả, Kết luận), mỗi section có nội dung text gọn-súc-tích đúng tinh thần học thuật**.

## Layout & section CỐ ĐỊNH

Đây là layout duy nhất skill này áp dụng. Không thương lượng số cột, không thương lượng số section, không đổi tên section trừ khi user yêu cầu rõ ràng. **6 sections theo thứ tự đọc Z (cột trái trước, từ trên xuống; rồi cột phải, từ trên xuống):**

| # | Cột | Tên section | Vai trò |
|---|---|---|---|
| 1 | Trái-trên | **Giới thiệu** | Bối cảnh, vấn đề, động lực, định nghĩa thuật ngữ chính |
| 2 | Phải-trên | **Yêu cầu / Thách thức** | Yêu cầu cụ thể của bài toán, các thách thức kỹ thuật |
| 3 | Trái-giữa | **Phương pháp nghiên cứu** | Approach, model, thuật toán chính, dataset |
| 4 | Phải-giữa | **Kiến trúc hệ thống** | Sơ đồ tổng thể + chú thích các thành phần |
| 5 | Trái-dưới | **Kết quả thực nghiệm** | Bảng số liệu, biểu đồ, so sánh với baseline |
| 6 | Phải-dưới | **Kết luận** | 2-3 đóng góp chính + 1-2 hướng phát triển |

Section name có thể đổi nhẹ tuỳ đề tài (ví dụ "Đặt vấn đề" thay cho "Giới thiệu", "Mục tiêu" thay cho "Yêu cầu") — nhưng **vai trò và vị trí phải giữ nguyên**.

---

## Quy trình bắt buộc (4 bước, không bỏ bước)

### Bước 1 — Khảo sát hiện trạng

Trước khi đề xuất bất cứ gì, đọc và liệt kê:

1. **Đọc `src/app/App.tsx`** đầy đủ để hiểu:
   - Header hiện tại có gì (logo, tên trường, tên đề tài, GVHD, SVTH, MSSV, mã nhóm/lớp)
   - Các section đang có và thứ tự
   - Hình ảnh đang được import từ đâu, dùng ở đâu
   - Nội dung text hiện tại của từng phần (để tận dụng, không viết lại từ đầu nếu không cần)
   - Tailwind classes đang dùng (màu, font, spacing)

2. **Liệt kê `src/imports/`** để biết có những asset nào sẵn sàng dùng:
   - Tên thư mục thường mô tả nội dung (`algorithm/`, `method/`, `ket_qua_thuc_nghiem/`, `malware_flow/`, `reason/`, `system_prompt/`, ...)
   - Mỗi thư mục chứa các file `.png` — note tên cụ thể
   - Logo (ví dụ `bachkhoa_logo.png`) — sẽ vào header

3. **Đọc `tailwind.css` và `theme.css`** nếu có để biết color tokens đã định nghĩa.

Sau bước này, **báo cáo ngắn gọn cho user** những gì tìm thấy: bao nhiêu sections hiện tại, bao nhiêu hình, các màu chính, đề tài về gì. Đây là context để cùng quyết định nội dung mới.

### Bước 2 — Đề xuất Outline (PLAN, chưa code) — GATE BẮT BUỘC

**Tuyệt đối không sửa code ở bước này.** Trình bày một outline đầy đủ gồm 2 phần:

#### 2A. Layout outline

```
HEADER: [Logo BK] [Trường + Khoa] [TÊN ĐỀ TÀI] [GVHD] [SVTH × 3 + MSSV]

| 1. GIỚI THIỆU              | 2. YÊU CẦU / THÁCH THỨC    |
|   text + (tuỳ chọn) hình   |   text                      |
|                             |                             |
| 3. PHƯƠNG PHÁP NGHIÊN CỨU  | 4. KIẾN TRÚC HỆ THỐNG       |
|   text + hình method/      |   hình algorithm/ + chú thích│
|                             |                             |
| 5. KẾT QUẢ THỰC NGHIỆM     | 6. KẾT LUẬN                 |
|   bảng/biểu đồ ket_qua...   |   text                      |

FOOTER: HK252-DATN-396 | Nhóm HCMUT_MALLLM | (QR nếu có)
```

#### 2B. Content outline — cho TỪNG SECTION

Mỗi section trình bày:
- **Số + tên**
- **Hình dùng**: tên file cụ thể từ `src/imports/...` (hoặc "không hình" nếu không cần)
- **Nội dung text dự kiến**: 2-5 bullet points/câu, viết NẠY thật — không placeholder. Lấy từ:
  - Nội dung hiện có trong `App.tsx`
  - Tên các thư mục `imports/` (thường gợi ý nội dung — `reason/` ⇒ section 1 hoặc 2; `method/` ⇒ section 3; `system_prompt/` ⇒ thường vào section 3-4; `malware_flow/` ⇒ thường vào section 4)
  - Tên đề tài + suy luận hợp lý

Ví dụ output Bước 2B (trích):

> **Section 3 — Phương pháp nghiên cứu**
> *Hình:* `src/imports/method/method.png`
> *Nội dung:*
> - Kết hợp Code Slicing dựa trên LLM để chỉ phân tích đoạn mã có rủi ro cao, giảm nhiễu.
> - Taint-Based Slicing cho JavaScript: bắt dòng dữ liệu nhạy cảm, tập trung vào `eval`, `child_process.exec`, `fs.writeFile`.
> - Lát cắt được tổng hợp bằng max-aggregation, ngưỡng 0.8 phân loại risk.

#### Sau khi trình bày outline đầy đủ → **DỪNG LẠI VÀ HỎI**:

> "Outline trên ổn chứ? Có gì muốn đổi (đổi thứ tự section, ghép/tách section, viết lại nội dung section nào, đổi hình…)? Khi nào bạn xác nhận tôi sẽ sửa vào `App.tsx`."

**Tuyệt đối không sang Bước 3 nếu user chưa trả lời.** Câu trả lời "ok", "tiến hành", "được", "làm đi", "approved", "yes" đều tính là confirm. Câu trả lời "đổi X", "thay Y" thì cập nhật outline rồi hỏi lại.

Nếu user yêu cầu "vừa làm vừa xem đi", vẫn trình bày outline đầy đủ trước, **không được nhảy thẳng vào code**.

### Bước 3 — Áp dụng vào `App.tsx`

Chỉ sang bước này sau khi user đã confirm outline. Khi sửa code:

- **Giữ tên import và path hình ảnh hiện có** — không đổi tên file trong `src/imports/`
- Sửa in-place trong `src/app/App.tsx` bằng `str_replace`, không tạo file mới
- Áp dụng các pattern Tailwind ở phần "Tailwind patterns" bên dưới
- Nội dung text dùng đúng câu chữ đã thống nhất ở Bước 2B — không tự ý viết lại

Sau khi sửa xong, **báo cáo lại**:
1. Danh sách section đã thay đổi
2. File:line đã chỉnh
3. Hình nào trong `src/imports/` đã được dùng / chưa dùng

### Bước 4 — Self-check

Đi qua `references/checklist.md`. Nếu một mục fail, **fix ngay rồi báo lại**, đừng giấu.

---

## Tailwind patterns (copy-paste được)

**Container poster (A1 dọc tỉ lệ ~1:1.41)**
```tsx
<div className="w-[1240px] min-h-[1754px] mx-auto bg-white">
```

**Header strip**
```tsx
<header className="bg-[#0B2B61] text-white px-10 py-6 flex items-start gap-6">
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
        <div className="opacity-80 font-semibold">GVHD</div>
        <div>TS. ...</div>
      </div>
      <div>
        <div className="opacity-80 font-semibold">SVTH</div>
        <div>... — MSSV ...</div>
      </div>
    </div>
  </div>
</header>
```

**Grid 2 cột**
```tsx
<main className="grid grid-cols-2 gap-5 p-8 bg-[#F3F4F6]">
  {/* 6 sections theo thứ tự 1,2,3,4,5,6 */}
</main>
```

**Section card với numbered badge**
```tsx
<section className="bg-white border border-[#E5E7EB] rounded-md p-5">
  <div className="flex items-center gap-3 mb-3 pb-2 border-b border-[#E5E7EB]">
    <div className="w-10 h-10 rounded bg-[#6C4FF2] text-white font-bold text-lg flex items-center justify-center">
      1
    </div>
    <h2 className="text-2xl font-bold text-[#6C4FF2]">Giới thiệu</h2>
  </div>
  <div className="text-[13px] leading-relaxed text-[#1F2937] space-y-2">
    {/* nội dung */}
  </div>
</section>
```

**Bảng kết quả** (text nhỏ, viền mảnh, header xám)
```tsx
<table className="w-full text-xs border-collapse">
  <thead className="bg-[#F3F4F6]">
    <tr>
      <th className="border border-[#D1D5DB] px-2 py-1 text-left">Method</th>
      <th className="border border-[#D1D5DB] px-2 py-1 text-right">Acc</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="border border-[#D1D5DB] px-2 py-1">...</td>
      <td className="border border-[#D1D5DB] px-2 py-1 text-right">...</td>
    </tr>
  </tbody>
</table>
```

**Footer**
```tsx
<footer className="border-t border-[#D1D5DB] px-10 py-4 flex items-center justify-between text-xs text-[#6B7280]">
  <div>HK252-DATN-396 | Nhóm HCMUT_MALLLM</div>
  <div className="flex items-center gap-3">
    <span>Repo:</span>
    {/* QR optional */}
  </div>
</footer>
```

---

## Color palette mặc định (BK + accent tím như poster mẫu)

- Header bg: `#0B2B61` (xanh BK đậm)
- Accent (số badge + tiêu đề section): `#6C4FF2` (tím)
- Background main: `#F3F4F6` (xám nhạt)
- Section card bg: `#FFFFFF`
- Section border: `#E5E7EB`
- Body text: `#1F2937`
- Muted text: `#6B7280`

Nếu user yêu cầu palette khác, chỉ đổi giá trị, không đổi cấu trúc.

---

## Hướng dẫn viết nội dung từng section

Đây là phần quan trọng nhất khi user chọn "cả layout + nội dung". Mỗi section có template viết riêng — chi tiết đầy đủ ở `references/section-templates.md`. Tóm tắt nhanh:

- **Section 1 (Giới thiệu)**: 3 câu trả lời 3 câu hỏi — vấn đề là gì, tại sao quan trọng, tại sao khó.
- **Section 2 (Yêu cầu/Thách thức)**: 3-5 bullet, mỗi bullet là một yêu cầu **đo được** hoặc thách thức kỹ thuật **rõ ràng**.
- **Section 3 (Phương pháp)**: insight 1 câu + pipeline 3-5 bước đánh số + 1 câu khác baseline. Hình `method/` đặt ở đây.
- **Section 4 (Kiến trúc)**: hình `algorithm/` hoặc `malware_flow/` chiếm 60-70% diện tích + 3-5 bullet giải thích thành phần.
- **Section 5 (Kết quả)**: bảng/biểu đồ từ `ket_qua_thuc_nghiem/` + 2-3 dòng diễn giải có **số liệu cụ thể**.
- **Section 6 (Kết luận)**: 3 bullet đóng góp + 1-2 bullet hướng phát triển.

Đọc `references/section-templates.md` để xem ví dụ tốt/xấu cho từng loại nội dung.

---

## Những lỗi hay gặp cần tránh

1. **Bỏ qua Bước 2 confirm gate** — nhảy thẳng vào sửa code khi user chưa duyệt outline. ❌
2. **Layout 1 cột** — biến poster thành báo cáo. Luôn đúng 2 cột × 6 sections. ❌
3. **Section không đánh số** — số dẫn mắt người đọc. ❌
4. **Đổi tên file ảnh trong `src/imports/`** — không bao giờ. ❌
5. **Bịa nội dung học thuật** — nếu thiếu data cho section nào, hỏi user; nội dung sai có hậu quả thật. ❌
6. **Thay đổi nhỏ giọt mà không show outline** — user không nắm được tổng thể. ❌
7. **Section "Kết luận" trống / sáo rỗng** — bắt buộc phải có 3 đóng góp + 1-2 hướng phát triển. ❌
8. **Hình quá nhỏ** (<150px) trong section Kiến trúc/Kết quả — mất chi tiết, mất ý nghĩa. ❌

---

## Reference files

- `references/layout-examples.md` — Code Tailwind đầy đủ cho layout 2 cột × 6 sections + biến thể palette
- `references/checklist.md` — Checklist self-check trước khi báo "xong"
- `references/section-templates.md` — Template viết nội dung chi tiết cho từng section, có ví dụ tốt/xấu
