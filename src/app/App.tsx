import {FileText} from 'lucide-react';
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
import systemPrompt from '../imports/system_prompt/prompt.png';

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E5E7EB] py-8">
      <div className="w-[1240px] min-h-[1754px] mx-auto bg-white" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
        <header className="bg-[#0B2B61] text-white px-10 py-6 flex items-start gap-6">
          <img
            src={bachKhoaLogo}
            alt="Logo Bách Khoa"
            className="w-24 h-24 object-contain bg-white rounded p-1"
          />
          <div className="flex-1">
            <div className="text-base font-semibold uppercase tracking-wider">
              Trường Đại học Bách Khoa — ĐHQG-HCM
            </div>
            <div className="text-sm opacity-90 mb-3">Khoa Khoa học và Kỹ thuật Máy tính</div>
            <h1 className="text-4xl font-bold leading-tight mb-3">
              Nghiên cứu ứng dụng mô hình ngôn ngữ lớn trong phát hiện mã độc trên hệ sinh thái npm
            </h1>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="opacity-80 font-semibold">GVHD</div>
                <div>Ths. Trần Trương Tuấn Phát</div>
                <div>TS. Vũ Đức Lý</div>
              </div>
              <div>
                <div className="opacity-80 font-semibold">SVTH</div>
                <div>Nguyễn Đăng Khoa — MSSV 2211618</div>
                <div>Hồ Gia Thắng — MSSV 2213187</div>
                <div>Phạm Quang Minh — MSSV 2212075</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <div className="px-3 py-2 rounded bg-white/15">HK252-DATN-396</div>
            <div className="px-3 py-2 rounded bg-white/15">Nhóm HCMUT_MALLLM</div>
          </div>
        </header>

        <main className="grid grid-cols-2 gap-5 p-8 bg-[#F3F4F6]">
          <section className="bg-white border border-[#E5E7EB] rounded-md p-5">
            <div className="flex items-center gap-3 mb-3 pb-2 border-b border-[#E5E7EB]">
              <div className="w-10 h-10 rounded bg-[#6C4FF2] text-white font-bold text-lg flex items-center justify-center">
                1
              </div>
              <h2 className="text-2xl font-bold text-[#6C4FF2]">Giới thiệu</h2>
            </div>
            <div className="text-[13px] leading-relaxed text-[#1F2937] space-y-2">
              <p>
                Npm là kho thư viện lớn nhất của JavaScript và xuất hiện trong đa số ứng dụng web hiện đại.
              </p>
              <p>
                Mã độc có thể bị cài vào thư viện mã nguồn mở để đánh cắp dữ liệu hoặc chiếm quyền hệ thống
                khi lập trình viên cài đặt.
              </p>
              <p>
                Các thư viện độc hại thường được ngụy trang tinh vi nên khó phát hiện bằng công cụ truyền thống.
              </p>
              <p>
                Đề tài tập trung rút gọn mã nguồn để LLM chỉ phân tích đoạn đáng ngờ, nâng hiệu quả phát hiện.
              </p>
            </div>
            <img
              src={malwareFlow}
              alt="Vong doi mot cuoc tan cong npm dien hinh"
              className="mt-3 w-full max-h-[220px] object-contain rounded-md border border-[#E5E7EB]"
            />
          </section>

          <section className="bg-white border border-[#E5E7EB] rounded-md p-5">
            <div className="flex items-center gap-3 mb-3 pb-2 border-b border-[#E5E7EB]">
              <div className="w-10 h-10 rounded bg-[#6C4FF2] text-white font-bold text-lg flex items-center justify-center">
                2
              </div>
              <h2 className="text-2xl font-bold text-[#6C4FF2]">Yêu cầu / Thách thức</h2>
            </div>
            <div className="text-[13px] leading-relaxed text-[#1F2937] space-y-2">
              <p>Phát hiện mã độc từ mã nguồn npm ở quy mô lớn, nhiều thư viện và phụ thuộc chéo.</p>
              <p>Giới hạn ngữ cảnh của LLM khi đưa toàn bộ mã nguồn vào phân tích.</p>
              <p>Hành vi độc hại nằm rải rác trong callback bất đồng bộ, khó truy vết bằng rule tĩnh.</p>
              <p>Giảm nhiễu từ code lành tính để ưu tiên phần mã rủi ro cao.</p>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <img
                  src={report1}
                  alt="Bao cao trich xuat hanh vi nghi van"
                  className="w-full max-h-[200px] object-contain rounded-md border border-[#E5E7EB]"
                />
                <div className="mt-1 text-[11px] text-[#6B7280]">Report 1: Trich xuat hanh vi</div>
              </div>
              <div>
                <img
                  src={report2}
                  alt="Bao cao ngan gon ma nguon"
                  className="w-full max-h-[200px] object-contain rounded-md border border-[#E5E7EB]"
                />
                <div className="mt-1 text-[11px] text-[#6B7280]">Report 2: Loc ma nguon</div>
              </div>
            </div>
            <div className="mt-3">
              <img
                src={report3}
                alt="Bao cao tong hop ket qua"
                className="w-full max-h-[200px] object-contain rounded-md border border-[#E5E7EB]"
              />
              <div className="mt-1 text-[11px] text-[#6B7280]">Report 3: Tong hop ket qua</div>
            </div>
          </section>

          <section className="bg-white border border-[#E5E7EB] rounded-md p-5">
            <div className="flex items-center gap-3 mb-3 pb-2 border-b border-[#E5E7EB]">
              <div className="w-10 h-10 rounded bg-[#6C4FF2] text-white font-bold text-lg flex items-center justify-center">
                3
              </div>
              <h2 className="text-2xl font-bold text-[#6C4FF2]">Phương pháp nghiên cứu</h2>
            </div>
            <div className="text-[13px] leading-relaxed text-[#1F2937] space-y-2">
              <p>Kết hợp Code Slicing và LLM để chỉ đưa các đoạn mã rủi ro vào phân tích.</p>
              <p>
                Taint-Based Slicing cho JavaScript bất đồng bộ trên CPG, tập trung vào
                <span className="font-semibold"> eval</span>,<span className="font-semibold"> child_process.exec</span>,
                <span className="font-semibold"> fs.writeFile</span>.
              </p>
              <p>Kết quả lát cắt được tổng hợp bằng max-aggregation, phân loại theo ngưỡng 0.8.</p>
              <p>Thêm bước phân loại nhóm thư viện để hỗ trợ diễn giải rủi ro.</p>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <img
                src={methodFlow}
                alt="Phuong phap phat hien ma doc"
                className="w-full max-h-[200px] object-contain rounded-md border border-[#E5E7EB]"
              />
              <img
                src={systemPrompt}
                alt="Prompt phan tich cho LLM"
                className="w-full max-h-[200px] object-contain rounded-md border border-[#E5E7EB]"
              />
            </div>
            <img
              src={categoryFlow}
              alt="So do phan loai"
              className="mt-3 w-full max-h-[180px] object-contain rounded-md border border-[#E5E7EB]"
            />
          </section>

          <section className="bg-white border border-[#E5E7EB] rounded-md p-5">
            <div className="flex items-center gap-3 mb-3 pb-2 border-b border-[#E5E7EB]">
              <div className="w-10 h-10 rounded bg-[#6C4FF2] text-white font-bold text-lg flex items-center justify-center">
                4
              </div>
              <h2 className="text-2xl font-bold text-[#6C4FF2]">Kiến trúc hệ thống</h2>
            </div>
            <img
              src={taintAnalysis}
              alt="So do phan tich taint tren CPG"
              className="w-full max-h-[280px] object-contain rounded-md border border-[#E5E7EB]"
            />
            <div className="text-[13px] leading-relaxed text-[#1F2937] space-y-2 mt-3">
              <p>Pipeline gồm trích xuất CPG → taint analysis → slicing → prompt LLM → phân loại rủi ro.</p>
              <p>Tầng phân tích tĩnh đảm bảo bao phủ dòng dữ liệu nhạy cảm xuyên qua callback.</p>
              <p>LLM nhận đầu vào đã rút gọn để tăng tín hiệu, giảm nhiễu và thời gian suy luận.</p>
              <p>Kết quả được hợp nhất theo thư viện và theo nhóm hành vi.</p>
            </div>
          </section>

          <section className="bg-white border border-[#E5E7EB] rounded-md p-5">
            <div className="flex items-center gap-3 mb-3 pb-2 border-b border-[#E5E7EB]">
              <div className="w-10 h-10 rounded bg-[#6C4FF2] text-white font-bold text-lg flex items-center justify-center">
                5
              </div>
              <h2 className="text-2xl font-bold text-[#6C4FF2]">Kết quả thực nghiệm</h2>
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

          <section className="bg-white border border-[#E5E7EB] rounded-md p-5">
            <div className="flex items-center gap-3 mb-3 pb-2 border-b border-[#E5E7EB]">
              <div className="w-10 h-10 rounded bg-[#6C4FF2] text-white font-bold text-lg flex items-center justify-center">
                6
              </div>
              <h2 className="text-2xl font-bold text-[#6C4FF2]">Kết luận</h2>
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