import { Download, FileText } from 'lucide-react';
import bachKhoaLogo from '../imports/bachkhoa_logo.png';
import malwareFlow from '../imports/malware_flow/m_flow.png';
import methodFlow from '../imports/method/method.png';
import categoryFlow from '../imports/categories/category.png';
import taintAnalysis from '../imports/algorithm/taint-base-analysis.png';
import { ResultRq1Chart } from '../components/charts/ResultRq1Chart';
import { ResultRq2Chart } from '../components/charts/ResultRq2Chart';
import { ResultRq3Chart } from '../components/charts/ResultRq3Chart';
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

        {/* MAIN: 2 cột độc lập, mỗi cột tự xếp section liên tiếp */}
        <main className="grid grid-cols-2 gap-4 p-6 bg-[#F3F4F6] relative">
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

          {/* CỘT TRÁI: Giới thiệu → Phương pháp */}
          <div className="flex flex-col gap-4 relative z-10">
            {/* SECTION 1 - GIỚI THIỆU */}
            <section className="bg-white border border-[#E5E7EB] rounded-md p-4">
              <div className="flex items-center gap-3 mb-3 pb-2 border-b border-[#E5E7EB]">
                <div className="w-9 h-9 rounded bg-[#0B2B61] text-white font-bold text-base flex items-center justify-center">
                  1
                </div>
                <h2 className="text-xl font-bold text-[#0B2B61]">Giới thiệu</h2>
              </div>
              <div className="text-[13px] leading-relaxed text-[#1F2937] space-y-2 text-justify">
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
              <div className="mt-3 bg-gradient-to-br from-[#F0F4FA] to-[#E8EEF7] border-l-4 border-[#0B2B61] rounded-md p-3">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-[#0B2B61]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <h3 className="text-sm font-bold text-[#0B2B61]">Đóng góp chính của nghiên cứu</h3>
                </div>
                <ul className="space-y-1 text-[12.5px] text-[#1F2937]">
                  <li className="flex gap-2">
                    <span className="text-[#0B2B61] font-bold flex-shrink-0">▸</span>
                    <span><strong className="text-[#0B2B61]">Đề xuất quy trình cắt lát mã nguồn chuyên biệt cho JavaScript</strong></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#0B2B61] font-bold flex-shrink-0">▸</span>
                    <span><strong className="text-[#0B2B61]">Đánh giá thực nghiệm quy mô trên các dòng LLM hiện đại</strong></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#0B2B61] font-bold flex-shrink-0">▸</span>
                    <span><strong className="text-[#0B2B61]">Khảo sát ảnh hưởng của cấu hình suy luận đến độ tin cậy bảo mật</strong></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#0B2B61] font-bold flex-shrink-0">▸</span>
                    <span><strong className="text-[#0B2B61]">Chứng minh tính ưu việt so với các phương pháp truyền thống</strong></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#0B2B61] font-bold flex-shrink-0">▸</span>
                    <span><strong className="text-[#0B2B61]">Đánh giá chuyên sâu về hiệu quả của kỹ thuật Tinh chỉnh hiệu quả tham số (PEFT)</strong></span>
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 3 - PHƯƠNG PHÁP (dồn lên cột trái) */}
            <section className="bg-white border border-[#E5E7EB] rounded-md p-4">
              <div className="flex items-center gap-3 mb-3 pb-2 border-b border-[#E5E7EB]">
                <div className="w-9 h-9 rounded bg-[#0B2B61] text-white font-bold text-base flex items-center justify-center">
                  3
                </div>
                <h2 className="text-xl font-bold text-[#0B2B61]">Phương pháp</h2>
              </div>

              <div className="flex flex-col gap-3">
                <div className="inline-block self-start bg-[#0B2B61] text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Phương pháp nghiên cứu
                </div>

                <ul className="text-[12.5px] leading-snug text-[#1F2937] space-y-1.5 list-disc pl-5 text-justify">
                  <li>
                    Áp dụng <strong>phân tích mã tĩnh</strong> kết hợp <strong>Taint Analysis</strong> để trích xuất Program Slicing từ mã JavaScript.
                  </li>
                  <li>
                    Xây dựng tập thuộc tính dựa trên <strong>API nhạy cảm</strong> và luồng dữ liệu để phân tích hành vi độc hại.
                  </li>
                  <li>
                    Sử dụng <strong>LLMs</strong> phân tích ngữ nghĩa và nhận diện hành vi đáng ngờ trong các lát cắt mã.
                  </li>
                  <li>
                    Đầu ra: <strong>mức độ rủi ro</strong> và giải thích chi tiết hành vi đáng ngờ.
                  </li>
                </ul>

                <div className="inline-block self-start bg-[#0B2B61] text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Quy trình hoạt động
                </div>

                <figure className="flex justify-center items-center">
                  <img
                    src={methodFlow}
                    alt="Quy trình phát hiện mã độc qua 6 bước"
                    className="w-full max-h-[360px] object-contain rounded-md"
                  />
                </figure>

                <div className="inline-block self-start bg-[#0B2B61] text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Phân loại API nhạy cảm
                </div>

                <figure>
                  <img
                    src={categoryFlow}
                    alt="Bảng phân loại các API nhạy cảm và vai trò lây nhiễm"
                    className="w-full max-h-[240px] object-contain rounded-md border border-[#E5E7EB]"
                  />
                </figure>
              </div>
            </section>
          </div>

          {/* CỘT PHẢI: Đặc tả yêu cầu → Kết quả thực nghiệm */}
          <div className="flex flex-col gap-4 relative z-10">
            {/* SECTION 2 - YÊU CẦU / THÁCH THỨC */}
            <section className="bg-white border border-[#E5E7EB] rounded-md p-4">
              <div className="flex items-center gap-3 mb-3 pb-2 border-b border-[#E5E7EB]">
                <div className="w-9 h-9 rounded bg-[#0B2B61] text-white font-bold text-base flex items-center justify-center">
                  2
                </div>
                <h2 className="text-xl font-bold text-[#0B2B61]">Đặc tả yêu cầu / thách thức</h2>
              </div>

              <div className="mb-3">
                <div className="inline-block bg-[#0B2B61] text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
                  Yêu cầu
                </div>
                <img
                  src={requirement}
                  alt="Cac yeu cau can thiet de phat hien ma doc tren npm"
                  className="w-full max-h-[180px] object-contain rounded-md border border-[#E5E7EB]"
                />
              </div>

              <div>
                <div className="inline-block bg-[#0B2B61] text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
                  Thách thức
                </div>
                <img
                  src={challenge}
                  alt="Cac thach thuc khi ap dung LLM de phat hien ma doc tren npm"
                  className="w-full max-h-[180px] object-contain rounded-md border border-[#E5E7EB]"
                />
              </div>
            </section>

            {/* SECTION 4 - KẾT QUẢ THỰC NGHIỆM */}
            <section className="bg-white border border-[#E5E7EB] rounded-md p-4">
              <div className="flex items-center gap-3 mb-3 pb-2 border-b border-[#E5E7EB]">
                <div className="w-9 h-9 rounded bg-[#0B2B61] text-white font-bold text-base flex items-center justify-center">
                  4
                </div>
                <h2 className="text-xl font-bold text-[#0B2B61]">Kết quả thực nghiệm</h2>
              </div>

              <div className="flex flex-col gap-3">
                {/* RQ1 */}
                <div className="flex flex-col rounded-md border border-[#E5E7EB] bg-white overflow-hidden">
                  <div className="bg-gradient-to-r from-[#0B2B61] to-[#17408D] px-2.5 py-1.5">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white text-[#0B2B61] text-[10px] font-bold flex-shrink-0">
                        RQ1
                      </span>
                      <h3 className="text-[12px] font-semibold text-white leading-tight">
                        Hiệu quả của kỹ thuật Slicing
                      </h3>
                    </div>
                  </div>
                  <div className="w-full h-[200px] p-2">
                    <ResultRq1Chart />
                  </div>
                </div>

                {/* RQ2 */}
                <div className="flex flex-col rounded-md border border-[#E5E7EB] bg-white overflow-hidden">
                  <div className="bg-gradient-to-r from-[#0B2B61] to-[#17408D] px-2.5 py-1.5">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white text-[#0B2B61] text-[10px] font-bold flex-shrink-0">
                        RQ2
                      </span>
                      <h3 className="text-[12px] font-semibold text-white leading-tight">
                        So sánh với các phương pháp truyền thống
                      </h3>
                    </div>
                  </div>
                  <div className="w-full h-[220px] p-2">
                    <ResultRq2Chart />
                  </div>
                </div>

                {/* RQ3 */}
                <div className="flex flex-col rounded-md border border-[#E5E7EB] bg-white overflow-hidden">
                  <div className="bg-gradient-to-r from-[#0B2B61] to-[#17408D] px-2.5 py-1.5">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white text-[#0B2B61] text-[10px] font-bold flex-shrink-0">
                        RQ3
                      </span>
                      <h3 className="text-[12px] font-semibold text-white leading-tight">
                        So sánh giữa các dòng LLM khác nhau
                      </h3>
                    </div>
                  </div>
                  <div className="w-full h-[220px] p-2">
                    <ResultRq3Chart />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>

        {/*   <footer className="border-t border-[#D1D5DB] px-10 py-4 flex items-center justify-between text-xs text-[#6B7280]">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span>
              <a href="https://arxiv.org/abs/2512.12313">Preprint: arXiv:2512.12313</a>
            </span>
          </div>
          <div>HK252-DATN-396 | Nhóm HCMUT_MALLLM</div>
        </footer> */}
      </div>
    </div>
  );
}