import React from "react";

export default function QuestionsPage() {
  return (
    <main className="flex flex-col h-full p-6">
      <div className="flex items-center justify-center mb-8">
        <h1 className="pb-4 text-3xl font-bold ">~~~ Câu hỏi thường gặp ~~~</h1>
      </div>

      <div className="space-y-8">
        {/* Về chúng tôi */}
        <section>
          <h2 className="mb-2 text-2xl font-semibold">Về chúng tôi</h2>
          <p className="text-lg">
            <strong>MIelts</strong> là nền tảng hỗ trợ học tiếng Anh, đặc biệt
            là luyện thi IELTS. Chúng tôi cung cấp các bài luyện thi, mẹo vặt và
            tài liệu học tập giúp bạn chuẩn bị tốt nhất cho kỳ thi IELTS. Đồng
            thời chúng tôi còn cung cấp khả năng theo dõi kết quả học tập giúp
            nâng cao quá trình học tập của bản thân.
          </p>
          <p className="text-lg">
            <strong>Email liên lạc:</strong> MIelts.webapp@gmail.com
          </p>
          <p className="text-lg">
            <strong>SĐT:</strong> 0123456789
          </p>
        </section>

        {/* Listening Test */}
        <section>
          <h2 className="mb-2 text-2xl font-semibold">Listening Test</h2>
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-bold">
              Tổng quan về bài Listening Test
            </h3>
            <p className="mt-2 text-lg">
              Bài thi Listening của IELTS bao gồm 4 phần, mỗi phần sẽ có một
              đoạn hội thoại hoặc monologue ngắn. Các câu hỏi sẽ kiểm tra khả
              năng nghe của bạn và hiểu các thông tin quan trọng từ các tình
              huống khác nhau.
            </p>
            <p className="mt-2 text-lg">
              <strong>Cấu trúc bài thi Listening:</strong>
              <ul className="ml-4 list-disc list-inside">
                <li>
                  Phần 1: Hội thoại giữa hai người trong tình huống thông
                  thường.
                </li>
                <li>Phần 2: Đơn thoại về một chủ đề quen thuộc.</li>
                <li>
                  Phần 3: Hội thoại giữa nhiều người trong một bối cảnh học
                  thuật.
                </li>
                <li>
                  Phần 4: Đơn thoại về một chủ đề học thuật hoặc phức tạp.
                </li>
              </ul>
            </p>
            <p className="mt-2 text-lg">
              Bạn sẽ nghe mỗi đoạn hai lần. Sau mỗi phần, bạn sẽ có thời gian để
              trả lời các câu hỏi.
            </p>
            <h3 className="mt-4 text-lg font-semibold">Câu hỏi thường gặp</h3>
            <ul className="ml-4 text-lg list-disc list-inside">
              <li>
                <strong>Hỏi:</strong> Mỗi phần của bài Listening dài bao lâu?
              </li>
              <li>
                <strong>Trả lời:</strong> Mỗi phần thường kéo dài khoảng 5-10
                phút.
              </li>
              <li>
                <strong>Hỏi:</strong> Làm thế nào để cải thiện kỹ năng nghe?
              </li>
              <li>
                <strong>Trả lời:</strong> Luyện nghe hàng ngày và làm các bài
                thi mô phỏng sẽ giúp bạn cải thiện khả năng nghe nhanh chóng.
              </li>
            </ul>
          </div>
        </section>

        {/* Reading Test */}
        <section>
          <h2 className="mb-2 text-2xl font-semibold">Reading Test</h2>
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-bold">Tổng quan về bài Reading Test</h3>
            <p className="mt-2 text-lg">
              Bài thi Reading của IELTS bao gồm 3 đoạn văn với các câu hỏi liên
              quan. Mỗi đoạn văn sẽ có độ dài và mức độ khó khác nhau. Bạn cần
              đọc và trả lời các câu hỏi dựa trên thông tin có trong các đoạn
              văn đó.
            </p>
            <p className="mt-2 text-lg">
              <strong>Cấu trúc bài thi Reading:</strong>
              <ul className="ml-4 list-disc list-inside">
                <li>
                  Phần 1: Đoạn văn ngắn với các câu hỏi về thông tin chi tiết.
                </li>
                <li>
                  Phần 2: Đoạn văn trung bình với các câu hỏi về ý nghĩa tổng
                  quát.
                </li>
                <li>
                  Phần 3: Đoạn văn dài, phức tạp với các câu hỏi yêu cầu suy
                  luận.
                </li>
              </ul>
            </p>
            <h3 className="mt-4 text-lg font-semibold">Câu hỏi thường gặp</h3>
            <ul className="ml-4 text-lg list-disc list-inside">
              <li>
                <strong>Hỏi:</strong> Cần bao nhiêu thời gian để hoàn thành bài
                Reading?
              </li>
              <li>
                <strong>Trả lời:</strong> Bạn có 60 phút để hoàn thành 3 đoạn
                văn.
              </li>
              <li>
                <strong>Hỏi:</strong> Làm thế nào để đọc nhanh và hiểu nội dung?
              </li>
              <li>
                <strong>Trả lời:</strong> Tập trung vào các từ khóa và luyện tập
                đọc các đoạn văn phức tạp sẽ giúp bạn cải thiện khả năng đọc
                nhanh.
              </li>
            </ul>
          </div>
        </section>

        {/* Writing Test */}
        <section>
          <h2 className="mb-2 text-2xl font-semibold">Writing Test</h2>
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-bold">Tổng quan về bài Writing Test</h3>
            <p className="mt-2 text-lg">
              Bài thi Writing của IELTS gồm hai phần: một bài luận ngắn và một
              bài viết dài. Bạn cần phải viết về một chủ đề cho phần 1 và phân
              tích một chủ đề phức tạp cho phần 2.
            </p>
            <p className="mt-2 text-lg">
              <strong>Cấu trúc bài thi Writing:</strong>
              <ul className="ml-4 list-disc list-inside">
                <li>Phần 1: Mô tả một đồ thị, biểu đồ hoặc bảng dữ liệu.</li>
                <li>
                  Phần 2: Viết một bài luận về một vấn đề xã hội, môi trường
                  hoặc giáo dục.
                </li>
              </ul>
            </p>
            <h3 className="mt-4 text-lg font-semibold">Câu hỏi thường gặp</h3>
            <ul className="ml-4 text-lg list-disc list-inside">
              <li>
                <strong>Hỏi:</strong> Phần 1 của bài Writing có yêu cầu gì đặc
                biệt?
              </li>
              <li>
                <strong>Trả lời:</strong> Bạn cần mô tả chính xác đồ thị, biểu
                đồ hoặc bảng dữ liệu bằng cách sử dụng ngôn ngữ rõ ràng và mạch
                lạc.
              </li>
              <li>
                <strong>Hỏi:</strong> Làm thế nào để viết bài luận tốt?
              </li>
              <li>
                <strong>Trả lời:</strong> Tập trung vào việc phát triển ý tưởng
                rõ ràng, đưa ra các luận điểm cụ thể và hỗ trợ với ví dụ.
              </li>
            </ul>
          </div>
        </section>

        {/* Speaking Test */}
        <section>
          <h2 className="mb-2 text-2xl font-semibold">Speaking Test</h2>
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-bold">
              Tổng quan về bài Speaking Test
            </h3>
            <p className="mt-2 text-lg">
              Bài thi Speaking của IELTS được chia thành 3 phần, trong đó bạn sẽ
              nói chuyện trực tiếp với giám khảo. Bài thi này đánh giá khả năng
              giao tiếp của bạn trong các tình huống thông thường và phức tạp.
            </p>
            <p className="mt-2 text-lg">
              <strong>Cấu trúc bài thi Speaking:</strong>
              <ul className="ml-4 list-disc list-inside">
                <li>
                  Phần 1: Giới thiệu về bản thân và trả lời các câu hỏi chung.
                </li>
                <li>
                  Phần 2: Thuyết trình về một chủ đề cụ thể trong vòng 2 phút.
                </li>
                <li>
                  Phần 3: Thảo luận về một vấn đề phức tạp trong khoảng 10 phút.
                </li>
              </ul>
            </p>
            <h3 className="mt-4 text-lg font-semibold">Câu hỏi thường gặp</h3>
            <ul className="ml-4 text-lg list-disc list-inside">
              <li>
                <strong>Hỏi:</strong> Bài thi Speaking có thể làm gì để cải
                thiện kỹ năng nói?
              </li>
              <li>
                <strong>Trả lời:</strong> Thực hành nói hàng ngày và tham gia
                vào các cuộc trò chuyện thực tế sẽ giúp bạn tự tin hơn trong
                phần thi này.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
