import React from "react";

export default function IeltsPrepsPage() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12">
      <h1 className="mb-8 text-4xl font-bold text-slate-600">
        ~~~ Ielts Preparation ~~~{" "}
      </h1>
      <p className="mb-6 text-lg">
        Một số lộ trình để cải thiện điểm thi từng kỹ năng:
      </p>

      <div className="max-w-4xl space-y-8">
        {/* Phần Listening */}
        <section>
          <h2 className="mb-2 text-2xl font-semibold">Kỹ Năng Listening</h2>
          <table className="min-w-full text-lg border border-collapse border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left border border-gray-300">
                  Bước
                </th>
                <th className="px-4 py-2 text-left border border-gray-300">
                  Chi Tiết
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 font-semibold border border-gray-300">
                  Bước 1
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  Bắt đầu với các bài thi mẫu và luyện nghe qua các podcast hoặc
                  video tiếng Anh đơn giản. Tập trung vào việc hiểu nội dung
                  chính.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold border border-gray-300">
                  Bước 2
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  Tăng dần độ khó, nghe các bài thi IELTS thực tế và luyện các
                  dạng câu hỏi khác nhau như điền từ vào chỗ trống, chọn đáp án
                  đúng, và trả lời câu hỏi chi tiết.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold border border-gray-300">
                  Bước 3
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  Chú trọng luyện nghe với các đoạn hội thoại dài (monologue) để
                  cải thiện khả năng nghe thông tin chi tiết trong một khoảng
                  thời gian dài.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold border border-gray-300">
                  Bước 4
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  Ghi chú lại các từ vựng mới khi nghe và ôn tập chúng để cải
                  thiện khả năng hiểu từ vựng trong ngữ cảnh.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold border border-gray-300">
                  Bước 5
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  Thực hiện các bài thi Listening hoàn chỉnh để cải thiện tốc độ
                  và khả năng phân bổ thời gian hợp lý.
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Phần Reading */}
        <section>
          <h2 className="mb-2 text-2xl font-semibold">Kỹ Năng Reading</h2>
          <table className="min-w-full text-lg border border-collapse border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left border border-gray-300">
                  Bước
                </th>
                <th className="px-4 py-2 text-left border border-gray-300">
                  Chi Tiết
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 font-semibold border border-gray-300">
                  Bước 1
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  Đọc các đoạn văn ngắn với chủ đề quen thuộc, chú trọng vào
                  việc xác định thông tin chính trong bài.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold border border-gray-300">
                  Bước 2
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  Tăng dần độ dài và độ khó của bài đọc. Thực hành với các bài
                  thi IELTS Reading để cải thiện khả năng đọc hiểu nhanh.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold border border-gray-300">
                  Bước 3
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  Luyện tập các câu hỏi như điền từ vào chỗ trống, trắc nghiệm,
                  và câu hỏi về chi tiết trong bài đọc.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold border border-gray-300">
                  Bước 4
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  Làm các bài thi Reading trong thời gian giới hạn để luyện kỹ
                  năng đọc nhanh và hiểu đúng thông tin.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold border border-gray-300">
                  Bước 5
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  Rà soát lại các câu trả lời và kiểm tra lại lỗi sai để cải
                  thiện độ chính xác trong các bài thi sau.
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Phần Writing */}
        <section>
          <h2 className="mb-2 text-2xl font-semibold">Kỹ Năng Writing</h2>
          <table className="min-w-full text-lg border border-collapse border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left border border-gray-300">
                  Bước
                </th>
                <th className="px-4 py-2 text-left border border-gray-300">
                  Chi Tiết
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 font-semibold border border-gray-300">
                  Bước 1
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  Làm quen với cấu trúc bài viết IELTS, đặc biệt là Writing Task
                  1 (mô tả đồ thị, bảng số liệu) và Task 2 (viết bài luận). Hiểu
                  rõ yêu cầu và cách triển khai bài viết.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold border border-gray-300">
                  Bước 2
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  Thực hành viết bài luận hàng ngày, bắt đầu với Task 1 và dần
                  chuyển sang Task 2. Chú trọng việc phát triển dàn ý bài viết
                  và sự mạch lạc trong các đoạn văn.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold border border-gray-300">
                  Bước 3
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  Đảm bảo sử dụng từ vựng và ngữ pháp chính xác. Tập trung vào
                  việc dùng câu phức tạp và tránh lặp lại từ vựng.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold border border-gray-300">
                  Bước 4
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  Đọc lại bài viết của mình và kiểm tra lỗi ngữ pháp, từ vựng.
                  Sửa chữa lỗi để cải thiện chất lượng bài viết.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold border border-gray-300">
                  Bước 5
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  Thực hành viết bài luận trong thời gian giới hạn, đặc biệt là
                  Task 2, để cải thiện khả năng quản lý thời gian.
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Phần Speaking */}
        <section>
          <h2 className="mb-2 text-2xl font-semibold">Kỹ Năng Speaking</h2>
          <table className="min-w-full text-lg border border-collapse border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left border border-gray-300">
                  Bước
                </th>
                <th className="px-4 py-2 text-left border border-gray-300">
                  Chi Tiết
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 font-semibold border border-gray-300">
                  Bước 1
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  Bắt đầu bằng việc luyện tập các câu hỏi cơ bản và trả lời
                  chúng một cách tự nhiên, mạch lạc.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold border border-gray-300">
                  Bước 2
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  Phát triển câu trả lời dài hơn và chi tiết hơn. Chú trọng vào
                  việc sử dụng từ vựng phong phú và ngữ pháp chính xác.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold border border-gray-300">
                  Bước 3
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  Ghi âm lại các phần trả lời và nghe lại để nhận xét về phát âm
                  và cấu trúc câu trả lời.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold border border-gray-300">
                  Bước 4
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  Tập trả lời câu hỏi phức tạp và thử nghiệm các kỹ thuật phát
                  triển câu trả lời để cải thiện mạch lạc và lưu loát.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold border border-gray-300">
                  Bước 5
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  Thực hành thi Speaking với người khác hoặc giáo viên để cải
                  thiện khả năng giao tiếp trong môi trường thi thật.
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
