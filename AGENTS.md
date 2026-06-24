# AGENTS.md

## Mục tiêu project

Project này là một React demo nhỏ để học cách gọi API công khai bằng Axios. Ưu tiên code dễ hiểu, cấu trúc rõ ràng, không làm quá phức tạp.

## Quy định chung

* Chỉ tạo project React demo đơn giản.
* Không thêm backend.
* Không thêm database.
* Không thêm authentication.
* Không thêm Redux, Zustand hoặc state management phức tạp.
* Không dùng thư viện UI nặng.
* Không tạo quá nhiều file không cần thiết.
* Ưu tiên code dễ đọc cho người mới học React.

## Công nghệ được phép dùng

* React
* Vite
* Axios
* CSS thường hoặc CSS module đơn giản
* JavaScript

## API

* Chỉ dùng API công khai không cần API key.
* Ưu tiên JSONPlaceholder hoặc PokéAPI.
* Không dùng API có giới hạn phức tạp hoặc cần đăng nhập.

## Quy định về code

* Tách file cấu hình Axios vào `src/api/axiosClient.js`.
* Không hardcode URL API ở nhiều nơi.
* Component phải ngắn, dễ đọc.
* Tên biến, tên hàm phải rõ nghĩa.
* Có xử lý `loading`, `error`, và dữ liệu rỗng.
* Không viết logic gọi API lặp lại ở nhiều component nếu có thể tách ra.

## Quy định để tránh chạy lâu và tốn token

* Không tự ý cài thêm thư viện nếu không thật sự cần.
* Không tạo tính năng ngoài yêu cầu.
* Không refactor toàn bộ project nếu chỉ cần sửa một phần nhỏ.
* Không generate file quá dài hoặc code thừa.
* Không chạy lệnh build/test nhiều lần liên tục.
* Chỉ chạy lệnh cần thiết:

  * `npm install` nếu thiếu dependencies
  * `npm run dev` để kiểm tra chạy được
  * `npm run build` một lần cuối nếu cần xác nhận project build thành công
* Nếu gặp lỗi, sửa đúng lỗi đó trước, không viết lại toàn bộ project.
* Trước khi sửa nhiều file, hãy đọc cấu trúc project hiện tại.
* Khi hoàn thành, tóm tắt ngắn gọn các file đã tạo/sửa.

## Không được làm

* Không copy code quá phức tạp từ template lớn.
* Không thêm router nếu project không thật sự cần nhiều trang.
* Không thêm TypeScript nếu chưa cần.
* Không dùng API key giả.
* Không để secret, token hoặc thông tin nhạy cảm trong code.
* Không tạo nhiều component chỉ để làm project nhìn lớn hơn.

## Kết quả mong muốn

Project phải chạy được bằng:

```bash
npm install
npm run dev
```

Người đọc code phải hiểu được:

* Axios được cấu hình ở đâu
* API được gọi ở đâu
* Dữ liệu được render ra UI như thế nào
* Loading và error được xử lý như thế nào
