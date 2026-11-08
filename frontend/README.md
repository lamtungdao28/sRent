# S-Rent Frontend

Frontend React cho nền tảng tìm và thuê phòng trọ sinh viên S-Rent. Giao diện dùng tiếng Việt, mobile-first, có phân quyền `STUDENT`, `LANDLORD`, `ADMIN` và gọi trực tiếp REST API Backend `/api/v1`.

## Công nghệ

- React 19, TypeScript strict, Vite
- Tailwind CSS, component UI nội bộ theo cấu trúc shadcn, Lucide React
- React Router, TanStack Query, Axios
- React Hook Form, Zod, Sonner

## Chạy toàn bộ bằng Docker

Từ thư mục gốc dự án:

```bash
cp .env.example .env
docker compose up --build -d
docker compose ps
```

Mở `http://localhost:5173`. Container Nginx của frontend phục vụ React SPA và proxy `/api` nội bộ đến service `backend:3001`; hostname nội bộ này không xuất hiện trong trình duyệt.

Các cổng có thể cấu hình trong `.env`:

```text
FRONTEND_PORT=5173
BACKEND_PORT=3001
```

Nếu thay đổi biến `VITE_*`, cần build lại image frontend vì Vite nhúng chúng ở build time:

```bash
docker compose up --build -d frontend
```

## Chạy frontend local để phát triển

Backend cần chạy tại `http://localhost:3001`:

```bash
cd ..
cp .env.example .env
docker compose up --build -d
```

Frontend:

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev -- --host 0.0.0.0
```

Mở `http://localhost:5173`. Vite proxy `/api` đến Backend nên component không hardcode `localhost`. File `.env.local` chỉ cần cho chế độ phát triển local; Docker Compose nhận biến từ file `.env` ở thư mục gốc.

Build production:

```bash
npm run build
```

## Biến môi trường

| Biến | Mặc định | Ý nghĩa |
|---|---|---|
| `VITE_API_BASE_URL` | `/api/v1` | Base path REST API |
| `VITE_ENABLE_AI_DEV_MOCKS` | `false` | Chỉ cho phép hiển thị mock AI trong development; hiện component ưu tiên dữ liệu Backend và không tự báo thành công |
| `FRONTEND_PORT` | `5173` | Cổng host của container frontend; khai báo trong `.env` gốc |

## Tài khoản demo Backend (`dev` profile)

| Vai trò | Email | Mật khẩu |
|---|---|---|
| Sinh viên | `student@srent.local` | `Student@123` |
| Chủ trọ | `landlord@srent.local` | `Landlord@123` |
| Admin | `admin@srent.local` | `Admin@123` |

Không dùng các tài khoản này ở production.

## Màn hình và luồng đã triển khai

### Sinh viên

- Đăng nhập, đăng ký, hồ sơ
- Trang chủ, tìm kiếm theo query URL, chi tiết phòng, ảnh và video đã duyệt
- Chat theo phòng với polling 5 giây
- Tạo/hủy booking và theo dõi trạng thái
- Tạo, xác nhận và xem lịch sử thanh toán mô phỏng
- Tạo/upload hợp đồng PDF, yêu cầu phân tích và xem kết quả đã được Admin công bố
- Tạo, xem lịch sử và tải PDF nháp CT01
- Tạo và theo dõi khiếu nại

### Chủ trọ

- Dashboard tổng hợp từ phòng và booking được phép truy cập
- Tạo khu trọ; tạo/sửa/gửi duyệt phòng; upload ảnh
- Upload video đúng chuỗi GPS → presigned MinIO → complete → chờ Admin
- Gửi tài liệu eKYC và theo dõi trạng thái kiểm duyệt
- Chấp nhận/từ chối yêu cầu thuê; chat

### Admin

- Dashboard hệ thống, quản lý khóa/mở tài khoản
- Hàng đợi duyệt phòng, video, eKYC, phân tích hợp đồng
- Quản lý tranh chấp và giao dịch mô phỏng

## Trạng thái AI và kiểm duyệt

- eKYC và phân tích hợp đồng nằm trong adapter riêng: `src/api/ekyc.api.ts`, `src/api/contract.api.ts`.
- UI hiển thị rõ `simulated=true` là mô phỏng.
- eKYC chỉ là “Đã duyệt” khi Backend trả `APPROVED`.
- Kết quả hợp đồng chỉ công bố cho sinh viên khi Backend trả `PUBLISHED`.
- Không có OCR, eKYC model hoặc mô hình AI chạy trong trình duyệt.
- Năm trạng thái UX chuẩn bị sẵn: Chưa gửi, Đang xử lý, Chờ Admin duyệt, Đã duyệt, Bị từ chối.

## Điều chỉnh Backend tối thiểu

Frontend phát hiện hai contract thiếu khiến luồng không thể hoàn tất và đã bổ sung tối thiểu:

1. `POST /rooms/{id}/video/upload-request` trả thêm `uploadToken`, đúng với request bắt buộc của bước `/video/complete`.
2. Thêm `GET /admin/rooms` và `GET /admin/videos` để Admin có danh sách cần kiểm duyệt; endpoint review cũ được giữ nguyên.

Backend vẫn là nguồn quyết định nghiệp vụ, đặc biệt với GPS 50 m, booking cạnh tranh và quyền truy cập.

## Kiểm tra trên điện thoại

1. Chạy Vite với `--host 0.0.0.0`.
2. Cấu hình `CORS_ALLOWED_ORIGINS` Backend chứa origin IP LAN của máy phát triển.
3. Mở `http://<IP-LAN>:5173` trên điện thoại.
4. Camera và Geolocation cần HTTPS ngoài `localhost`; dùng reverse proxy/tunnel HTTPS khi kiểm tra video GPS.
5. `MINIO_PUBLIC_ENDPOINT` phải là URL điện thoại truy cập được, không dùng hostname nội bộ Docker `minio`.

## Cấu trúc chính

```text
src/
├── api/          # Axios client và adapter từng module
├── components/   # UI, common states, room, layout
├── features/     # auth, student, landlord, admin, chat
├── providers/    # AuthProvider
├── routes/       # ProtectedRoute, RoleGuard
├── types/        # TypeScript contract đối chiếu Java DTO
├── App.tsx       # lazy route tree
└── main.tsx      # providers và bootstrap
```

Chi tiết endpoint và mức tích hợp nằm trong [FRONTEND_API_INTEGRATION.md](./FRONTEND_API_INTEGRATION.md).
