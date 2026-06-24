# React Axios Pokédex Demo

Project nhỏ giúp người mới học cách React gọi một API công khai bằng Axios. Ứng dụng tải danh sách Pokémon, hỗ trợ tìm kiếm, tải lại dữ liệu và gọi thêm endpoint khi xem chi tiết.

## Công nghệ

- React + Vite (JavaScript)
- Axios
- CSS thuần, responsive cơ bản

Project không có backend, database, đăng nhập hay API key.

## Cài đặt và chạy

Yêu cầu máy đã cài Node.js phiên bản 18 trở lên.

```bash
npm install
npm run dev
```

Sau đó mở địa chỉ Vite hiển thị trong terminal, thường là `http://localhost:5173`.

Kiểm tra bản build production:

```bash
npm run build
npm run preview
```

## API được sử dụng

Project dùng [PokéAPI](https://pokeapi.co), một REST API miễn phí có dữ liệu Pokémon bằng tiếng Anh. API dùng HTTPS, không cần tài khoản hoặc API key. Hai endpoint đang dùng là:

```text
GET https://pokeapi.co/api/v2/pokemon?limit=30
GET https://pokeapi.co/api/v2/pokemon/{name}
```

PokéAPI phù hợp vì dữ liệu dễ nhận biết, có ảnh minh họa và tài liệu công khai rõ ràng. Giao diện hướng dẫn vẫn dùng tiếng Việt, còn tên và loại Pokémon giữ nguyên tiếng Anh theo dữ liệu gốc.

## Luồng hoạt động của Axios

1. Khi `HomePage` xuất hiện, hook `usePokemon` chạy `fetchPokemon` trong `useEffect`.
2. `fetchPokemon` gọi `getPokemonList` trong `src/api/pokemonApi.js`.
3. Hàm API dùng `axiosClient.get("/pokemon")` và truyền `limit: 30` qua `params`.
4. Axios ghép endpoint với `baseURL` đã cấu hình trong `axiosClient.js`.
5. Khi API trả dữ liệu, hook lưu kết quả vào state `pokemon`; React render lại danh sách.
6. Khi bấm một item, `usePokemonDetails` gọi `/pokemon/{name}` và hiển thị ảnh, loại, chiều cao và cân nặng.
6. Nếu request lỗi, `catch` lưu thông báo vào state `error`. Khối `finally` luôn tắt trạng thái `loading`.

Nút **Tải lại** gọi lại cùng hàm `fetchPokemon`. Ô tìm kiếm chỉ lọc 30 Pokémon đã tải ở trình duyệt, không gửi thêm request API.

## Cấu trúc thư mục

```text
src/
├── api/
│   ├── axiosClient.js   # Cấu hình Axios dùng chung
│   └── pokemonApi.js    # Các hàm gọi endpoint Pokémon
├── components/
│   ├── PokemonCard.jsx  # Một thẻ Pokémon
│   ├── PokemonDetail.jsx# Hộp thoại chi tiết
│   └── PokemonList.jsx  # Danh sách Pokémon
├── hooks/
│   ├── usePokemon.js    # Request danh sách, loading và error
│   └── usePokemonDetails.js # Request chi tiết một Pokémon
├── pages/
│   └── HomePage.jsx     # Ghép dữ liệu và giao diện trang chính
├── App.jsx              # Component gốc
├── main.jsx             # Điểm khởi chạy React
└── styles.css           # CSS toàn ứng dụng
```

## Những điểm nên đọc trong code

- **Axios dùng để làm gì?** Axios là thư viện gửi HTTP request từ trình duyệt tới API. Project dùng `axios.get()` để lấy danh sách và chi tiết Pokémon.
- **API được gọi ở đâu?** Hai request thật đều nằm trong `src/api/pokemonApi.js`; các hook gọi lại các hàm này và quản lý trạng thái.
- **Dữ liệu vào component thế nào?** API → hàm trong `pokemonApi` → hook → state → `HomePage` → `PokemonList` → `PokemonCard` hoặc `PokemonDetail`.
- **Loading và error hoạt động thế nào?** Trước request, `loading` là `true` và `error` được xóa. Thành công thì cập nhật dữ liệu; thất bại thì cập nhật `error`. `finally` đặt `loading` về `false` trong cả hai trường hợp.
- **Vì sao tách `axiosClient`?** `baseURL`, timeout và các cấu hình chung chỉ viết một lần. Nếu API đổi địa chỉ hoặc cần thêm header chung, ta chỉ sửa tại một nơi.

> Lưu ý: React `StrictMode` trong môi trường development có thể chạy effect hai lần để phát hiện side effect không an toàn. Bản production chỉ thực hiện request theo vòng đời bình thường.
