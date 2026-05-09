# Section Content Templates

Hướng dẫn viết nội dung cho từng section, kèm ví dụ tốt/xấu để biết khi nào đúng.

---

## Section 1 — Giới thiệu

**Nhiệm vụ**: làm người đọc hiểu vấn đề trong 30 giây.

**Cấu trúc 3 câu**:
1. **Vấn đề là gì?** Định nghĩa miền bài toán bằng thuật ngữ chuyên ngành.
2. **Tại sao quan trọng?** Quy mô, hậu quả thực tế, ai bị ảnh hưởng.
3. **Tại sao khó?** 1-2 lý do khiến giải pháp truyền thống không đủ.

### Ví dụ TỐT

> Phần mềm hiện đại được xây dựng từ hàng nghìn thư viện mã nguồn mở; npm là kho thư viện lớn nhất của JavaScript và xuất hiện trong hầu hết ứng dụng web. Lợi dụng cơ chế này, kẻ tấn công đăng tải thư viện chứa mã độc để đánh cắp dữ liệu hoặc chiếm quyền hệ thống ngay khi lập trình viên `npm install`. Mã độc thường được "nguỵ trang" tinh vi, né tránh được cả công cụ phân tích tĩnh truyền thống lẫn review thủ công.

3 câu, đủ vấn đề/quy mô/khó khăn. Có thuật ngữ chuyên ngành (npm, install, phân tích tĩnh).

### Ví dụ XẤU

> Hiện nay, công nghệ phát triển rất nhanh và kéo theo nhiều vấn đề về bảo mật. Mã độc đang ngày càng tinh vi và gây hại lớn cho người dùng. Việc nghiên cứu giải pháp phát hiện mã độc là rất cần thiết và mang ý nghĩa thực tiễn cao.

Sáo rỗng, không có miền cụ thể (mã độc nói chung? trên nền tảng nào?), không có lý do tại sao khó.

---

## Section 2 — Yêu cầu / Thách thức

**Nhiệm vụ**: liệt kê 3-5 bullet, mỗi bullet **một yêu cầu đo được** hoặc **một thách thức kỹ thuật rõ ràng**.

### Ví dụ TỐT

> - Phát hiện gói npm độc với F1 ≥ 0.85 trên dataset 5000 gói.
> - Thời gian phân tích < 2s/gói để khả thi tích hợp vào CI.
> - Xử lý được mã JavaScript bị obfuscate (mã hoá tên biến, encoded strings).
> - Phát hiện cả các dạng tấn công gián tiếp qua `postinstall` script và dynamic import.

Mỗi bullet đo được hoặc cụ thể về kỹ thuật. Không có "hệ thống cần tốt".

### Ví dụ XẤU

> - Hệ thống cần chính xác cao
> - Phải nhanh và hiệu quả
> - Có thể mở rộng được trong tương lai
> - Dễ sử dụng cho lập trình viên

Tất cả đều mơ hồ. "Chính xác cao" là bao nhiêu? "Nhanh" là bao nhiêu giây?

---

## Section 3 — Phương pháp nghiên cứu

**Nhiệm vụ**: giải thích approach trong 30 giây cho người ngoài chuyên ngành con.

**Cấu trúc**:
1. **Insight chính** (1 câu): ý tưởng cốt lõi — tại sao cách này khác và tốt hơn.
2. **Pipeline** (3-5 bước đánh số, mỗi bước 1 dòng): các giai đoạn xử lý.
3. **Khác baseline** (1 câu): điểm khác biệt với SOTA hoặc cách thường làm.

Hình `src/imports/method/method.png` đặt cạnh hoặc dưới text — minh hoạ pipeline.

### Ví dụ TỐT

> **Insight**: kết hợp slicing tĩnh để khoanh vùng đoạn mã rủi ro, rồi dùng LLM phân loại — giảm 90% chi phí so với gọi LLM trên toàn file.
>
> **Pipeline**:
> 1. Parse JS → AST → trích xuất các sink nhạy cảm (`eval`, `child_process.exec`, `fs.writeFile`).
> 2. Taint-Based Slicing: lần ngược dòng dữ liệu vào sink, lấy lát cắt code liên quan.
> 3. Lát cắt được embed + đưa qua LLM phân loại risk score [0,1].
> 4. Max-aggregation các slice trong cùng package → score tổng → ngưỡng 0.8 ⇒ "độc".
>
> **Khác baseline**: SOTA dùng LLM toàn file (chậm, tốn token); ta chỉ đưa lát cắt → nhanh hơn 10×, F1 cao hơn 0.04.

### Ví dụ XẤU

> Chúng tôi sử dụng mô hình ngôn ngữ lớn (LLM) kết hợp với các kỹ thuật phân tích tĩnh để phát hiện mã độc trong các gói npm. Phương pháp này tận dụng được sức mạnh của AI hiện đại và mang lại kết quả tốt.

Không có pipeline cụ thể, không có insight, không có số liệu so sánh.

---

## Section 4 — Kiến trúc hệ thống

**Nhiệm vụ**: cho người đọc thấy tổng thể hệ thống và các thành phần.

**Cấu trúc**:
1. **Hình sơ đồ** (`algorithm/` hoặc `malware_flow/`) chiếm ~60-70% diện tích section.
2. Bên dưới hình: 3-5 bullet **ngắn**, mỗi bullet giải thích 1 thành phần.

Format bullet: **Tên thành phần**: chức năng 1 câu.

### Ví dụ TỐT

> [Hình malware_flow/m_flow.png chiếm phần lớn section]
>
> - **AST Parser**: dùng `acorn` để parse JS, trả về cây cú pháp chuẩn ESTree.
> - **Taint Tracker**: lan truyền nhãn taint từ source (param, env, network) đến sink.
> - **Slice Builder**: cắt subtree AST tương ứng với mỗi slice rồi serialize lại thành code đọc được.
> - **LLM Classifier**: GPT-4-mini với system prompt zero-shot, output JSON `{score: float, reason: string}`.
> - **Aggregator**: max-pool các slice → label package + sinh báo cáo.

Hình + tên rõ + chức năng cụ thể.

### Ví dụ XẤU

> Hệ thống của chúng tôi bao gồm nhiều thành phần khác nhau, kết hợp với nhau để tạo nên một quy trình hoàn chỉnh từ đầu vào là mã nguồn đến đầu ra là kết quả phân loại.

Không có sơ đồ, không liệt kê thành phần — vô nghĩa.

---

## Section 5 — Kết quả thực nghiệm

**Nhiệm vụ**: chứng minh phương pháp work bằng **số liệu cụ thể**.

**Cấu trúc**:
1. Bảng/biểu đồ từ `src/imports/ket_qua_thuc_nghiem/` (đủ to để đọc được).
2. Bên dưới: 2-3 dòng diễn giải:
   - Phương pháp đề xuất đạt X (metric Y), cải thiện Z so với baseline.
   - Một observation thú vị (cái gì hoạt động tốt nhất / kém nhất, edge case…).

### Ví dụ TỐT

> [Bảng kết quả với các cột Method/Precision/Recall/F1/Time]
>
> Phương pháp đề xuất đạt **F1 = 0.89**, vượt baseline mã hoá toàn file (F1 = 0.85) và phương pháp chỉ dùng phân tích tĩnh thuần (F1 = 0.71). Thời gian trung bình **1.4s/gói**, đạt yêu cầu < 2s. Đáng chú ý: với gói có obfuscation nặng, recall giảm nhẹ (0.82) nhưng precision vẫn ổn định 0.91 — gợi ý hướng cải thiện ở phase decode trước slicing.

Có số cụ thể, so sánh, và 1 observation.

### Ví dụ XẤU

> Kết quả thực nghiệm cho thấy phương pháp đề xuất đạt hiệu quả tốt, vượt trội so với các phương pháp truyền thống. Hệ thống chạy nhanh và chính xác.

Không có số nào → vô giá trị.

---

## Section 6 — Kết luận

**Nhiệm vụ**: chốt 3 đóng góp + 1-2 hướng phát triển.

**Cấu trúc**:
1. **Đóng góp** (3 bullet, mỗi bullet 1 dòng): điểm chính đề tài đã làm được.
2. **Hướng phát triển** (1-2 bullet): cải tiến tương lai cụ thể.

### Ví dụ TỐT

> **Đóng góp**:
> - Đề xuất pipeline kết hợp Taint-Based Slicing và LLM, giảm 10× thời gian inference so với gọi LLM trên toàn file.
> - Xây dựng dataset 5000 gói npm có nhãn (50% độc, 50% lành) — public hoá để cộng đồng dùng.
> - Đạt F1 = 0.89 trên dataset, vượt SOTA 0.04 điểm.
>
> **Hướng phát triển**:
> - Mở rộng sang Python (PyPI) với cùng kiến trúc.
> - Tích hợp dynamic analysis cho gói có obfuscation cực nặng.

### Ví dụ XẤU

> Đề tài đã hoàn thành các mục tiêu đề ra và đạt kết quả khả quan. Trong tương lai, nhóm sẽ tiếp tục nghiên cứu và phát triển hệ thống để mang lại giá trị cao hơn cho người dùng.

Sáo rỗng, không có gì cụ thể — không nói được đề tài đóng góp gì.

---

## Nguyên tắc chung khi viết nội dung học thuật

1. **Cụ thể > tổng quát**: thay "rất nhanh" bằng "1.4s/gói".
2. **Số liệu > mô tả**: thay "kết quả tốt" bằng "F1 = 0.89".
3. **Thuật ngữ chuyên ngành**: dùng đúng từ kỹ thuật (taint, slicing, AST), không dịch lủng củng.
4. **Một câu = một ý**: không nhồi 3 ý vào 1 câu dài.
5. **Không sáo rỗng**: tránh "hiệu quả cao", "tiềm năng lớn", "ý nghĩa thực tiễn", "đáp ứng nhu cầu".
6. **Nếu không biết, hỏi user**: thà trống còn hơn bịa số liệu sai.
