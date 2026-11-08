# S-Rent Backend

Backend REST độc lập cho nền tảng tìm và thuê phòng trọ sinh viên, dùng Java 21, Spring Boot 3.5, PostgreSQL, Flyway, JWT và MinIO.

## Chạy bằng Docker

```bash
cp .env.example .env
# Thay các giá trị replace-with-* bằng secret mạnh
docker compose up --build -d
docker compose ps
docker compose logs -f backend
```

- Health: <http://localhost:3001/actuator/health>
- Frontend: <http://localhost:5173>
- Swagger UI: <http://localhost:3001/swagger-ui/index.html>
- OpenAPI JSON: <http://localhost:3001/v3/api-docs>
- MinIO Console: <http://localhost:9001>

Flyway tự chạy migration khi backend khởi động. Hibernate dùng `ddl-auto=validate`, không tự sửa schema. Bucket public chứa media phòng; bucket private chứa eKYC, hợp đồng và bằng chứng, không cho anonymous và chỉ cấp presigned URL ngắn hạn.

Compose build MinIO Community từ release chính thức đã ghim trong `infra/minio/Dockerfile`, giúp bản dựng có thể lặp lại mà không phụ thuộc một tag container thay đổi.

```bash
docker compose down
```

Chỉ thêm `-v` khi muốn xóa hẳn dữ liệu PostgreSQL và MinIO.

## Tài khoản demo (chỉ profile `dev`)

| Vai trò | Email | Mật khẩu |
|---|---|---|
| Student | `student@srent.local` | `Student@123` |
| Landlord | `landlord@srent.local` | `Landlord@123` |
| Admin | `admin@srent.local` | `Admin@123` |

Profile `prod` không tạo tài khoản demo. Gọi `POST /api/v1/auth/login`, sau đó dùng JWT Bearer trong Swagger.

## Chạy test

```bash
cd sRent-backend
./mvnw test
```

## API cho Frontend

Tất cả API dùng prefix `/api/v1`.

### Auth, hồ sơ, khu trọ và phòng

- `POST /auth/register`, `POST /auth/login`
- `GET|PUT /users/me`
- `POST /properties`, `GET /properties/my`
- `POST /rooms`, `PUT /rooms/{id}`, `GET /rooms`, `GET /rooms/{id}`, `GET /rooms/my`
- `POST /rooms/{id}/submit`, `PATCH /admin/rooms/{id}/review`
- `POST /rooms/{id}/images/upload-request`, `POST /rooms/{id}/images/complete`, `GET /rooms/{id}/images`

Search room hỗ trợ `city`, `district`, `minPrice`, `maxPrice`, `minArea`, `amenity`, `page`, `size`, `sort`.

### Video GPS 50 m

- `POST /rooms/{id}/video/upload-request`
- upload trực tiếp bằng presigned PUT URL nhận được
- `POST /rooms/{id}/video/complete`
- `GET /rooms/{id}/video`
- `PATCH /admin/videos/{id}/review`

GPS dùng Haversine, ngưỡng độ chính xác và thời gian lấy vị trí. Đây chỉ là kiểm tra vị trí thiết bị theo dữ liệu client, không chứng minh video thật; không dùng AI hoặc gyroscope.

### Chat, booking, payment mô phỏng

- `POST|GET /conversations`
- `GET|POST /conversations/{id}/messages`, `PATCH /conversations/{id}/read`
- `POST /bookings`, `GET /bookings/my`, `GET /bookings/landlord`
- `PATCH /bookings/{id}/accept|reject|cancel`
- `POST /payments`, `POST /payments/{id}/confirm|refund|release`, `GET /payments/my`

Accept booking dùng transaction, pessimistic lock trên phòng và partial unique index PostgreSQL. Payment mặc định là `MOCK`; không giữ, hoàn hoặc giải ngân tiền thật.

### eKYC và hợp đồng

- `POST /landlords/verification/upload-request`, `POST /landlords/verification`, `GET /landlords/verification/me`
- `GET /admin/verifications`, `PATCH /admin/verifications/{id}/review`
- `POST /contracts`, `POST /contracts/{id}/upload`, `POST /contracts/{id}/analyze`
- `GET /contracts/{id}`, `GET /contracts/{id}/analysis`, `PATCH /admin/contracts/{id}/review`

`EKYC_PROVIDER=mock` và `CONTRACT_ANALYSIS_PROVIDER=mock` trả `simulated=true`. Chỉ đặt `external` khi endpoint/API key hợp lệ. eKYC không tự duyệt; phân tích hợp đồng không phải tư vấn pháp lý và phải được Admin publish trước khi sinh viên xem.

### CT01, khiếu nại và Admin

- `POST /ct01`, `GET /ct01/my`, `GET|PUT /ct01/{id}`, `GET /ct01/{id}/pdf`
- `POST|GET /disputes`, `PATCH /disputes/{id}/respond`
- `POST /disputes/{id}/evidence/upload-request`, `POST /disputes/{id}/evidence/complete`
- `GET /admin/dashboard`, `GET /admin/transactions`, `GET /admin/audit-logs`
- `GET /admin/users`, `PATCH /admin/users/{id}/status`
- `PATCH /admin/disputes/{id}/review`

PDF CT01 dùng font Unicode và luôn ghi **BẢN NHÁP**; hệ thống không tự nộp đến cơ quan công an.

## Trạng thái tích hợp ngoài

- MinIO: tích hợp thật trong Compose, URL có hạn.
- Zalo Identity: interface riêng; adapter hiện trả rõ “chưa cấu hình”, không chấp nhận token giả.
- Payment: mock có audit log, không giao dịch tiền thật.
- eKYC: mock mặc định; adapter HTTP external chỉ hoạt động khi có cấu hình thật. Quyết định cuối luôn do Admin.
- Contract AI: mock mặc định với 5 nhóm rủi ro; adapter HTTP external có sẵn. Kết quả không phải kết luận pháp lý.

Không lưu file nhị phân trong PostgreSQL. Endpoint riêng tư kiểm tra participant/owner; toàn bộ `/api/v1/admin/**` chỉ dành cho `ADMIN`.
