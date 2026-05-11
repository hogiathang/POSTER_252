#!/usr/bin/env python3
"""
verify_pdf.py — Kiểm tra một file PDF có đúng khổ A4 hay không.

Cách dùng:
    python3 verify_pdf.py <path-to-pdf>
    python3 verify_pdf.py <path-to-pdf> --orientation portrait
    python3 verify_pdf.py <path-to-pdf> --orientation landscape
    python3 verify_pdf.py <path-to-pdf> --orientation any        (default)
    python3 verify_pdf.py <path-to-pdf> --tolerance 1.0          (mm, default 1.0)

Exit codes:
    0 — PASS (tất cả các trang đều đúng A4)
    1 — FAIL (ít nhất một trang sai)
    2 — Lỗi (không đọc được file, thiếu thư viện, v.v.)

Skill react-poster-a4-export BẮT BUỘC chạy script này trước khi báo cáo "xong".
"""

import argparse
import sys
from pathlib import Path

# A4 dimensions in mm (ISO 216)
A4_PORTRAIT = (210.0, 297.0)   # width, height
A4_LANDSCAPE = (297.0, 210.0)

# PDF points to mm:  1 pt = 25.4 / 72 mm
PT_TO_MM = 25.4 / 72.0


def points_to_mm(pt: float) -> float:
    return pt * PT_TO_MM


def check_page(width_mm: float, height_mm: float, orientation: str, tol: float):
    """Returns (ok: bool, label: str, expected: tuple)."""
    candidates = []
    if orientation in ("portrait", "any"):
        candidates.append(("A4 portrait", A4_PORTRAIT))
    if orientation in ("landscape", "any"):
        candidates.append(("A4 landscape", A4_LANDSCAPE))

    for label, (ew, eh) in candidates:
        if abs(width_mm - ew) <= tol and abs(height_mm - eh) <= tol:
            return True, label, (ew, eh)

    # Không khớp — pick orientation gần nhất để báo lỗi cho user dễ hiểu
    best = min(candidates, key=lambda c: abs(width_mm - c[1][0]) + abs(height_mm - c[1][1]))
    return False, best[0], best[1]


def load_pdf_pages(pdf_path: Path):
    """Trả về list[(width_mm, height_mm)] cho từng trang. Dùng pypdf nếu có, fallback sang pikepdf."""
    try:
        from pypdf import PdfReader
        reader = PdfReader(str(pdf_path))
        pages = []
        for page in reader.pages:
            box = page.mediabox
            w_pt = float(box.width)
            h_pt = float(box.height)
            pages.append((points_to_mm(w_pt), points_to_mm(h_pt)))
        return pages
    except ImportError:
        pass

    try:
        import pikepdf
        with pikepdf.open(str(pdf_path)) as pdf:
            pages = []
            for page in pdf.pages:
                mb = page.MediaBox
                # MediaBox = [llx, lly, urx, ury]
                llx, lly, urx, ury = [float(x) for x in mb]
                w_pt = urx - llx
                h_pt = ury - lly
                pages.append((points_to_mm(w_pt), points_to_mm(h_pt)))
            return pages
    except ImportError:
        pass

    print("❌ Không tìm thấy pypdf hoặc pikepdf. Cài bằng: pip install pypdf --break-system-packages",
          file=sys.stderr)
    sys.exit(2)


def main():
    ap = argparse.ArgumentParser(description="Verify PDF is A4-sized")
    ap.add_argument("pdf", type=Path, help="Đường dẫn tới file PDF")
    ap.add_argument("--orientation", choices=["portrait", "landscape", "any"], default="any",
                    help="Hướng A4 mong đợi (default: any)")
    ap.add_argument("--tolerance", type=float, default=1.0,
                    help="Sai số cho phép theo mm (default: 1.0)")
    args = ap.parse_args()

    if not args.pdf.exists():
        print(f"❌ File không tồn tại: {args.pdf}", file=sys.stderr)
        sys.exit(2)

    print(f"📄 Đang kiểm tra: {args.pdf}")
    print(f"   Orientation mong đợi: {args.orientation}")
    print(f"   Tolerance: ±{args.tolerance} mm")
    print()

    pages = load_pdf_pages(args.pdf)
    print(f"Tổng số trang: {len(pages)}")
    print()

    all_ok = True
    suspicious_content_cut = False

    for i, (w, h) in enumerate(pages, start=1):
        ok, label, expected = check_page(w, h, args.orientation, args.tolerance)
        ew, eh = expected
        status = "✅ PASS" if ok else "❌ FAIL"
        print(f"  Trang {i}: {w:7.2f} × {h:7.2f} mm   "
              f"(mong đợi {label}: {ew:.1f} × {eh:.1f} mm)   {status}")
        if not ok:
            all_ok = False
            dw = w - ew
            dh = h - eh
            print(f"           → lệch: Δw={dw:+.2f} mm, Δh={dh:+.2f} mm")

            # Cảnh báo các pattern thường gặp
            if w > ew + 20 or h > eh + 20:
                print("           ⚠️  Trang LỚN hơn A4 — có thể `@page size` chưa được áp,")
                print("               hoặc html2canvas đang export full-resolution mà không scale.")
                suspicious_content_cut = True
            elif w < ew - 20 or h < eh - 20:
                print("           ⚠️  Trang NHỎ hơn A4 — có thể đang dùng size mặc định khác (Letter, A5),")
                print("               kiểm tra cấu hình jsPDF / Puppeteer / @page.")
                suspicious_content_cut = True
            # Hoán đổi orientation?
            if abs(w - eh) <= args.tolerance and abs(h - ew) <= args.tolerance:
                print("           ⚠️  Trang đúng kích thước A4 nhưng SAI ORIENTATION (đang ngược chiều).")

    print()
    if all_ok:
        print("🎉 KẾT QUẢ: PASS — File PDF đúng khổ A4.")
        sys.exit(0)
    else:
        print("💥 KẾT QUẢ: FAIL — File PDF KHÔNG đúng khổ A4. Quay lại Bước 2 của skill để sửa.")
        if suspicious_content_cut:
            print("   Gợi ý: xem lại references/ tương ứng với cơ chế export đang dùng.")
        sys.exit(1)


if __name__ == "__main__":
    main()
