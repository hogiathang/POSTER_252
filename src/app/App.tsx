import {Download, FileText} from 'lucide-react';
import bachKhoaLogo from '../imports/bachkhoa_logo.png';
import malwareFlow from '../imports/malware_flow/m_flow.png';
import methodFlow from '../imports/method/method.png';
import categoryFlow from '../imports/categories/category.png';
import taintAnalysis from '../imports/algorithm/taint-base-analysis.png';
import resultRq1 from '../imports/ket_qua_thuc_nghiem/result_rq_1.png';
import resultRq2 from '../imports/ket_qua_thuc_nghiem/result_rq_2.png';
import report1 from '../imports/reason/Report_1.png';
import report2 from '../imports/reason/Report_2.png';
import report3 from '../imports/reason/Report_3.png';
import challenge from '../imports/challenge/challenges.png';
import systemPrompt from '../imports/system_prompt/prompt.png';
import requirement from '../imports/requirements/requirements.png';
import sample1 from '../imports/samples/sample.png';

export default function App() {
  const handleExportPdf = () => {
    window.print();
  };

  return (
    <div className="poster-print-shell min-h-screen flex items-center justify-center bg-[#E5E7EB] py-8">
      <div className="fixed top-4 right-4 z-50 print:hidden">
        <button
          type="button"
          onClick={handleExportPdf}
          aria-label="Xuất poster dưới dạng PDF"
          className="inline-flex items-center gap-2 rounded-md bg-[#0B2B61] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#17408D] transition-colors"
        >
          <Download className="h-4 w-4" />
          Xuất PDF
        </button>
      </div>
      <div className="poster-print-root w-[1240px] min-h-[1754px] mx-auto bg-white" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
        <header className="bg-[#0B2B61] text-white px-10 py-6 flex items-start gap-6 relative overflow-hidden">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            <defs>
              <pattern id="grid-header" patternUnits="userSpaceOnUse" width="80" height="80">
                <circle cx="0" cy="0" r="3" fill="white" opacity="0.25" />
                <circle cx="80" cy="0" r="3" fill="white" opacity="0.25" />
                <circle cx="0" cy="80" r="3" fill="white" opacity="0.25" />
                <circle cx="80" cy="80" r="3" fill="white" opacity="0.25" />
                <line x1="0" y1="0" x2="80" y2="0" stroke="white" strokeWidth="1" opacity="0.15" />
                <line x1="0" y1="0" x2="0" y2="80" stroke="white" strokeWidth="1" opacity="0.15" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-header)" />
          </svg>
          <img
            src={bachKhoaLogo}
            alt="Logo Bách Khoa"
            className="w-24 h-24 object-contain bg-white rounded p-1 relative z-10"
          />
          <div className="flex-1 relative z-10">
            <div className="text-base font-semibold uppercase tracking-wider">
              Trường Đại học Bách Khoa — ĐHQG-HCM
            </div>
            <div className="text-sm opacity-90 mb-3">Khoa Khoa học và Kỹ thuật Máy tính</div>
            <h1 className="text-4xl font-bold leading-tight mb-3">
              Ứng dụng mô hình ngôn ngữ lớn trong phát hiện mã độc trên hệ sinh thái npm
            </h1>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="opacity-80 font-semibold">Giảng Viên Hướng Dẫn:</div>
                <div>Ths. Trần Trương Tuấn Phát</div>
                <div>TS. Vũ Đức Lý</div>
              </div>
              <div>
                <div className="opacity-80 font-semibold">Sinh viên thực hiện:</div>
                <div>Nguyễn Đăng Khoa — MSSV 2211618</div>
                <div>Hồ Gia Thắng — MSSV 2213187</div>
                <div>Phạm Quang Minh — MSSV 2212075</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-sm relative z-10">
            <div className="px-3 py-2 rounded bg-white/15">HK252-DATN-396</div>
            <div className="px-3 py-2 rounded bg-white/15">Nhóm HCMUT_MALLLM</div>
          </div>
        </header>

        <main className="grid grid-cols-2 gap-5 p-8 bg-[#F3F4F6] relative">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            <defs>
              <pattern id="grid-body" patternUnits="userSpaceOnUse" width="100" height="100">
                <circle cx="0" cy="0" r="2.5" fill="#0B2B61" opacity="0.18" />
                <circle cx="100" cy="0" r="2.5" fill="#0B2B61" opacity="0.18" />
                <circle cx="0" cy="100" r="2.5" fill="#0B2B61" opacity="0.18" />
                <circle cx="100" cy="100" r="2.5" fill="#0B2B61" opacity="0.18" />
                <circle cx="50" cy="50" r="1.5" fill="#0B2B61" opacity="0.12" />
                <line x1="0" y1="0" x2="100" y2="0" stroke="#0B2B61" strokeWidth="0.8" opacity="0.12" />
                <line x1="0" y1="0" x2="0" y2="100" stroke="#0B2B61" strokeWidth="0.8" opacity="0.12" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-body)" />
          </svg>
          <section className="bg-white border border-[#E5E7EB] rounded-md p-5 relative z-10">
            <div className="flex items-center gap-3 mb-4 pb-2 border-b border-[#E5E7EB]">
              <div className="w-10 h-10 rounded bg-[#0B2B61] text-white font-bold text-lg flex items-center justify-center">
                1
              </div>
              <h2 className="text-2xl font-bold text-[#0B2B61]">Giới thiệu</h2>
            </div>
            <div className="text-sm leading-relaxed text-[#1F2937] space-y-3 text-justify">
              <p>
                Hệ sinh thái npm hiện là một trong những nền tảng quản lý thư viện JavaScript lớn nhất thế giới,
                đóng vai trò quan trọng trong phát triển ứng dụng web hiện đại. Tuy nhiên, sự phát triển nhanh chóng
                cùng mô hình đóng góp mở đã khiến npm trở thành mục tiêu của nhiều cuộc tấn công bằng mã độc trong chuỗi cung ứng phần mềm (Software Supply Chain Attacks).
              </p>

              <p>
                Mô hình ngôn ngữ lớn (Large Language Models – LLMs) mở ra khả năng phân tích ngữ nghĩa mã nguồn
                và hỗ trợ phát hiện các hành vi bất thường trong mã JavaScript. Nghiên cứu này tập trung khảo sát
                khả năng ứng dụng LLM trong hỗ trợ phát hiện hành vi độc hại trong các package npm.
              </p>
            </div>
            <div className="mt-4 flex justify-center">
              <img
                src={malwareFlow}
                alt="Vong doi mot cuoc tan cong npm dien hinh"
                className="max-w-full max-h-[260px] object-contain"
              />
            </div>
          </section>

          <section className="bg-white border border-[#E5E7EB] rounded-md p-5 relative z-10">
            <div className="flex items-center gap-3 mb-4 pb-2 border-b border-[#E5E7EB]">
              <div className="w-10 h-10 rounded bg-[#0B2B61] text-white font-bold text-lg flex items-center justify-center">
                2
              </div>
              <h2 className="text-2xl font-bold text-[#0B2B61]">Đặc tả yêu cầu / thách thức</h2>
            </div>

            <div className="mb-5">
              <div className="inline-block bg-[#0B2B61] text-white text-sm font-semibold px-3 py-1 rounded-full mb-2">
                Yêu cầu
              </div>
              <div className="text-[13px] leading-relaxed text-[#1F2937]">
                <img
                  src={requirement}
                  alt="Cac yeu cau can thiet de phat hien ma doc tren npm"
                  className="w-full max-h-[200px] object-contain rounded-md border border-[#E5E7EB]"
                />
              </div>
            </div>

            <div>
              <div className="inline-block bg-[#0B2B61] text-white text-sm font-semibold px-3 py-1 rounded-full mb-2">
                Thách thức
              </div>
              <div className="text-[13px] leading-relaxed text-[#1F2937]">
                <img
                  src={challenge}
                  alt="Cac thach thuc khi ap dung LLM de phat hien ma doc tren npm"
                  className="w-full max-h-[200px] object-contain rounded-md border border-[#E5E7EB]"
                />
              </div>
            </div>
          </section>

          <section className="col-span-2 bg-white border border-[#E5E7EB] rounded-md p-5 relative z-10">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4 pb-2 border-b border-[#E5E7EB]">
              <div className="w-10 h-10 rounded bg-[#0B2B61] text-white font-bold text-lg flex items-center justify-center">
                3
              </div>
              <h2 className="text-2xl font-bold text-[#0B2B61]">Phương pháp</h2>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Cột trái: Phương pháp nghiên cứu */}
              <div className="space-y-4">
                <div className="inline-block bg-[#0B2B61] text-white text-sm font-semibold px-3 py-1 rounded-full">
                  Phương pháp nghiên cứu
                </div>

                <div className="space-y-2 text-justify leading-relaxed">
                  <p>
                    Áp dụng kỹ thuật phân tích mã tĩnh (Static Code Analysis) kết hợp
                    Taint Analysis nhằm trích xuất Program Slicing từ mã nguồn JavaScript.
                  </p>
                  <p>
                    Xây dựng tập thuộc tính dựa trên các API nhạy cảm và luồng dữ liệu
                    để hỗ trợ phân tích hành vi độc hại.
                  </p>
                  <p>
                    Sử dụng mô hình ngôn ngữ lớn (LLMs) để phân tích ngữ nghĩa và
                    nhận diện các hành vi đáng ngờ trong các đoạn mã đã được cắt lát.
                  </p>
                  <p>
                    Kết quả đầu ra bao gồm mức độ rủi ro và giải thích hành vi đáng ngờ
                    trong mã JavaScript.
                  </p>
                </div>

                {/* Thuật toán Taint-Based Slicing 
                <figure className="space-y-1">
                  <img
                    src={taintAnalysis}
                    alt="Thuật toán Taint-Based Slicing"
                    className="w-full object-contain rounded-md border border-[#E5E7EB]"
                  />
                </figure>

                {/* Bảng phân loại API nhạy cảm */}
                <figure className="space-y-1">
                  <img
                    src={categoryFlow}
                    alt="Bảng phân loại các API nhạy cảm và vai trò lây nhiễm"
                    className="w-full object-contain rounded-md border border-[#E5E7EB]"
                  />
                </figure>
              </div>

              {/* Cột phải: Quy trình hoạt động */}
              <div className="space-y-4">
                <div className="inline-block bg-[#0B2B61] text-white text-sm font-semibold px-3 py-1 rounded-full">
                  Quy trình hoạt động
                </div>

                <figure className="flex justify-center">
                  <img
                    src={methodFlow}
                    alt="Quy trình phát hiện mã độc qua 6 bước"
                    className="max-w-[400px] w-full object-contain rounded-md"
                  />
                </figure>

                {/* Ví dụ mẫu 
                <div className="space-y-2 pt-2 border-t border-[#E5E7EB]">
                  <p className="text-sm font-medium text-[#0B2B61]">
                    Ví dụ mẫu về 1 lát cắt mã độc sau khi đi qua công cụ:
                  </p>
                  <figure className="flex justify-center">
                    <img
                      src={sample1}
                      alt="Ví dụ lát cắt mã độc"
                      className="max-w-[400px] w-full object-contain rounded-md border border-[#E5E7EB]"
                    />
                  </figure>
                </div> */}
              </div>
            </div>
          </section>

          <section className="bg-white border border-[#E5E7EB] rounded-md p-5 relative z-10">
            <div className="flex items-center gap-3 mb-3 pb-2 border-b border-[#E5E7EB]">
              <div className="w-10 h-10 rounded bg-[#0B2B61] text-white font-bold text-lg flex items-center justify-center">
                5
              </div>
              <h2 className="text-2xl font-bold text-[#0B2B61]">Kết quả thực nghiệm</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <img
                  src={resultRq1}
                  alt="Ket qua RQ1"
                  className="w-full max-h-[220px] object-contain rounded-md border border-[#E5E7EB]"
                />
                <div className="mt-1 text-[11px] text-[#6B7280]">RQ1: Hieu qua phan loai</div>
              </div>
              <div>
                <img
                  src={resultRq2}
                  alt="Ket qua RQ2"
                  className="w-full max-h-[220px] object-contain rounded-md border border-[#E5E7EB]"
                />
                <div className="mt-1 text-[11px] text-[#6B7280]">RQ2: So sanh voi baseline</div>
              </div>
            </div>
            <div className="text-[13px] leading-relaxed text-[#1F2937] space-y-2 mt-3">
              <p>Biểu đồ cho thấy xu hướng cải thiện khi áp dụng slicing trước khi phân tích bằng LLM.</p>
              <p>Kết quả nhất quán giữa hai câu hỏi nghiên cứu và giảm nhiễu từ thư viện lành tính.</p>
            </div>
          </section>

          <section className="bg-white border border-[#E5E7EB] rounded-md p-5 relative z-10">
            <div className="flex items-center gap-3 mb-3 pb-2 border-b border-[#E5E7EB]">
              <div className="w-10 h-10 rounded bg-[#0B2B61] text-white font-bold text-lg flex items-center justify-center">
                6
              </div>
              <h2 className="text-2xl font-bold text-[#0B2B61]">Kết luận</h2>
            </div>
            <div className="text-[13px] leading-relaxed text-[#1F2937] space-y-2">
              <p>Quy trình slicing + LLM giúp tập trung vào đoạn mã rủi ro, giảm nhiễu khi phân tích.</p>
              <p>Taint-based slicing trên CPG tăng khả năng bắt luồng dữ liệu nhạy cảm trong JS bất đồng bộ.</p>
              <p>Phân loại theo ngưỡng hỗ trợ ưu tiên phát hiện hành vi nguy hiểm.</p>
              <p>Hướng phát triển: mở rộng sang ecosystem khác (PyPI), tối ưu tốc độ phân tích quy mô lớn.</p>
            </div>
          </section>
        </main>

        <footer className="border-t border-[#D1D5DB] px-10 py-4 flex items-center justify-between text-xs text-[#6B7280]">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span>
              <a href="https://arxiv.org/abs/2512.12313">Preprint: arXiv:2512.12313</a>
            </span>
          </div>
          <div>HK252-DATN-396 | Nhóm HCMUT_MALLLM</div>
        </footer>
      </div>
    </div>
  );
}
