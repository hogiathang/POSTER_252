Create a portrait academic graduation poster, A1 portrait (1684×2384 px 
@200dpi). Vietnamese-language thesis poster for HCMUT. Flat, clean, 
academic-modern. No gradients, no shadows, no 3D. Generous whitespace. 
Build everything with auto-layout frames, named color/text styles.

═══════════════════════════════════
DESIGN TOKENS
═══════════════════════════════════
Colors:
- Navy:        #042C53  (header, primary accents)
- Navy light:  #185FA5  (solution accents)
- Soft blue:   #E6F1FB  (solution cards, info pills)
- Coral text:  #791F1F   /  Coral bg: #FCEBEB  (problem)
- Teal text:   #0F6E56   /  Teal bg:  #E1F5EE  (results)
- Forest:      #04342C  (featured metric card, white text on it)
- Neutral bg:  #F1EFE8
- White:       #FFFFFF
- Text:        #2C2C2A primary / #5F5E5A secondary / #888780 muted
- Borders:     #E5E3DB (0.5px)

Type: Inter, weights 400 + 500 only. Sentence case throughout. 
Small labels: letter-spacing 1.5px.

Shape: radius 8/12/16px. Section padding 56×44px. Card padding 24px.

═══════════════════════════════════
LAYOUT (top → bottom)
═══════════════════════════════════

1) HEADER — full width, height 96px, bg #042C53
   - Logo: white square 72px radius 12px, text "BK" in navy
   - Two lines white text:
       "Trường Đại học Bách Khoa — ĐHQG-HCM" (16px medium)
       "Khoa Khoa học và Kỹ thuật Máy tính" (13px, 70% opacity)
   - Right: 2 pill badges, bg rgba(255,255,255,0.12), radius 8px:
       "Mã đề tài  CO4029"
       "Nhóm  HCMUT_MALLLM"

2) HERO — bg #F1EFE8, padding 80px vertical, centered
   - Pill (bg #E6F1FB, text #042C53): 
       shield icon + "An toàn chuỗi cung ứng phần mềm"
   - Title (48px medium, line-height 1.25, max-width 80%):
       "Phát hiện gói npm độc hại bằng cắt lát mã dựa trên LLM"
   - Subtitle (18px italic, #5F5E5A):
       "Taint-Based Code Slicing for LLMs-based Malicious 
        NPM Package Detection"

3) PEOPLE STRIP — full width, height 120px, white bg, 0.5px lines 
   above and below, vertical divider 60/40
   
   LEFT (60%) — label "Sinh viên thực hiện" (12px letter-spaced)
     3-column grid:
       "Hồ Gia Thắng"      / "MSSV 2213187"
       "Nguyễn Đăng Khoa"  / "MSSV 2211618"
       "Phạm Quang Minh"   / "MSSV 2212075"
     (Names 14px medium, MSSV 12px #888780)
   
   RIGHT (40%) — label "Giảng viên hướng dẫn"
       "Ths. Trần Trương Tuấn Phát"
       "TS. Vũ Đức Lý"

4) SECTION 01 — VẤN ĐỀ  white bg, padding 60×56px
   Header: 48px icon square (bg #FCEBEB, color #791F1F, alert-triangle), 
           "01 — Vấn đề" label, title 20px medium:
       "Tấn công chuỗi cung ứng npm ngày càng tinh vi"
   
   Paragraph (14px, line-height 1.7):
     "Các gói npm độc hại sử dụng obfuscation và logic phức tạp 
      để né tránh phát hiện. LLMs hiểu ngữ nghĩa tốt nhưng bị giới hạn 
      cửa sổ ngữ cảnh — chia chuỗi đơn giản gây phân mảnh ngữ nghĩa, 
      làm suy giảm độ chính xác."
   
   3-column grid (cards bg #F1EFE8, radius 8px, padding 16px), each 
   with a coral icon #A32D2D on top:
     trending-up: "Obfuscation tăng nhanh, vượt qua cơ chế truyền thống"
     window-min:  "Cửa sổ ngữ cảnh LLM hạn chế, chi phí cao"
     shuffle:     "JS bất đồng bộ: callback, Promise khó truy vết"

5) SECTION 02 — GIẢI PHÁP  white bg, padding 60×56px
   Header: 48px icon (bg #E6F1FB, color #042C53, lightbulb), 
           "02 — Giải pháp", title:
       "Cắt lát mã ngữ nghĩa định hướng dòng nhiễm"
   
   PIPELINE — 4 nodes, evenly spaced, connected by ">" chevrons 
   (16px, #888780). Each node 200×120px, radius 12px, 28px icon top, 
   14px medium title, 12px subtitle:
     1. neutral (bg #F1EFE8): package icon, "Gói npm" / "JS source"
     2. blue (bg #E6F1FB):    binary-tree, "Taint slicing" / "Trích lát nhạy cảm"
     3. blue (bg #E6F1FB):    cpu, "DeepSeek-Coder" / "6.7B params"
     4. teal (bg #E1F5EE):    check-circle, "Phán định" / "Malicious / Benign"
   
   Below: 2-column highlight cards (white bg, 0.5px border, radius 8px):
     LEFT  — flow-stairs icon #185FA5 + "Taint-based Slicing":
       "Truy vết luồng dữ liệu từ source rủi ro (env, network, fs) 
        đến sink nhạy cảm (eval, exec, writeFile)."
     RIGHT — refresh icon #185FA5 + "Heuristic Backtracking":
       "Tái dựng luồng dữ liệu cho callback và Promise — đặc thù 
        bất đồng bộ của hệ sinh thái JavaScript."

6) SECTION 03 — KẾT QUẢ  white bg, padding 60×56px
   Header: 48px icon (bg #E1F5EE, color #0F6E56, bar-chart), 
           "03 — Kết quả", title:
       "Tăng độ chính xác, giảm mạnh chi phí inference"
   
   2-column row, ratio 60/40:
     LEFT — label "Độ chính xác trên DeepSeek-Coder-6.7B"
       Two horizontal bars, height 22px, track #F1EFE8, radius 4px:
         Bar 1: fill #B4B2A9 to 75.41% — label "Chia 500-token (baseline)" + "75.41%"
         Bar 2: fill #1D9E75 to 87.04% — label "Taint slicing (đề xuất)" + "87.04%" (medium)
       Below: arrow-up icon + "+11.63 điểm phần trăm" (teal #0F6E56)
     
     RIGHT — featured card, bg #04342C, white text, radius 12px, 
             padding 24px, full height:
       Tiny label (opacity 0.7): "Giảm dung lượng mã"
       Massive number (72px medium): ">99%"
       Description (12px, opacity 0.85): 
         "Bảo toàn hành vi độc hại quan trọng, vượt qua giới hạn 
          cửa sổ ngữ cảnh LLM."
   
   3-column metric strip (bg #F1EFE8, radius 8px, centered):
     "87.04%" / "Accuracy"
     "+11.6"  / "điểm % so với baseline"
     ">99%"   / "Code reduction"

7) FOOTER — full width, height 56px, bg #F1EFE8, 12px #5F5E5A
   Left:  document icon + "Preprint: arXiv:2512.12313"
   Right: "HK1 2025–2026 · Đồ án chuyên ngành CO4029"

═══════════════════════════════════
ICONS: Tabler outline only. 24px in cards, 28px in pipeline, 20px footer.
ACCESSIBILITY: min 14px body, 12px captions. Text on colored fills uses 
the darkest shade of the same color family.
OUTPUT: single Figma frame A1 portrait, auto-layout, named styles.