# Frontend API Integration

Các TypeScript interface được đối chiếu trực tiếp với Java records/entities trong Backend ngày 08/11/2026. Khi Backend đổi DTO, cập nhật adapter và type trước; component không gọi Axios trực tiếp.

| Module | Endpoint | Request chính | Response chính | Trạng thái | Ghi chú |
|---|---|---|---|---|---|
| Auth | `POST /auth/register` | `email,password,fullName,role` | `AuthResponse` | Tích hợp thật | Không cho tự đăng ký ADMIN |
| Auth | `POST /auth/login` | `email,password` | JWT + role | Tích hợp thật | JWT gắn bởi interceptor |
| User | `GET/PUT /users/me` | `UpdateProfileRequest` | `UserResponse` | Tích hợp thật | 401 xóa phiên cục bộ |
| Room | `GET /rooms` | city, district, min/maxPrice, minArea, amenity, page | `Page<RoomResponse>` | Tích hợp thật | Chỉ dùng bộ lọc Backend hỗ trợ |
| Room | `GET /rooms/{id}` | path id | `RoomResponse` | Tích hợp thật | Không gắn nhãn AI xác minh |
| Property | `POST /properties`, `GET /properties/my` | `PropertyController.Request` | property | Tích hợp thật | Tọa độ do chủ trọ nhập/lấy GPS |
| Room owner | `POST/PUT /rooms`, `GET /rooms/my`, `POST /rooms/{id}/submit` | `RoomController.Request` | room | Tích hợp thật | Trạng thái theo enum Backend |
| Images | `POST .../images/upload-request`, `POST .../images/complete`, `GET .../images` | content type/object key | presigned URL/image | Tích hợp thật | Upload trực tiếp MinIO |
| Video | `POST .../video/upload-request`, `POST .../video/complete`, `GET .../video` | GPS + timestamp + content type | upload grant/video | Tích hợp thật | Backend quyết định GPS 50 m; bổ sung `uploadToken` vào response |
| Chat | `POST/GET /conversations` | roomId | conversation | Tích hợp thật | Không tự dùng WebSocket |
| Chat | `GET/POST .../{id}/messages`, `PATCH .../read` | content | page message | Tích hợp thật | Polling 5 giây |
| Booking | `POST /bookings`, `GET /bookings/my`, `PATCH cancel` | roomId, moveInDate, note | booking | Tích hợp thật | Không tự xác định phòng trống |
| Booking landlord | `GET /bookings/landlord`, `PATCH accept/reject` | path id | booking | Tích hợp thật | Backend xử lý lock/xung đột |
| Payment | `POST /payments`, `POST confirm/refund/release`, `GET /payments/my` | bookingId, amount | payment | Tích hợp thật, mô phỏng | UI luôn ghi “mô phỏng” |
| eKYC | `POST .../upload-request`, `POST /landlords/verification`, `GET .../me` | tài liệu + hồ sơ | verification | Tích hợp qua `ekyc.api.ts` | DTO tạm phải đối chiếu khi provider production đổi; không tự duyệt |
| Contract | `POST /contracts`, `POST upload/analyze`, `GET contract/analysis` | booking/title/PDF | contract + risks | Tích hợp qua `contract.api.ts` | Sinh viên chỉ xem analysis `PUBLISHED` |
| CT01 | `POST /ct01`, `GET /ct01/my/{id}`, `PUT /ct01/{id}`, `GET PDF` | booking + thông tin khai | CT01/PDF blob | Tích hợp thật | Luôn ghi BẢN NHÁP |
| Dispute | `POST/GET /disputes`, `PATCH respond` | booking/subject/content | dispute | Tích hợp thật | Evidence API có adapter Backend nhưng chưa có UI upload trong MVP |
| Admin | `GET /admin/dashboard`, `/users`, `/transactions` | filters/page | dashboard/pages | Tích hợp thật | Không có mock fallback |
| Admin room | `GET /admin/rooms`, `PATCH /admin/rooms/{id}/review` | decision/note | queue/review | Tích hợp thật | GET queue được bổ sung tối thiểu |
| Admin video | `GET /admin/videos`, `PATCH /admin/videos/{id}/review` | decision/note | queue/review | Tích hợp thật | GET queue được bổ sung tối thiểu |
| Admin eKYC | `GET /admin/verifications`, `PATCH review` | decision/note | verification | Tích hợp thật | AI không thay Admin |
| Admin contract | `GET /admin/contracts`, `GET contract analysis`, `PATCH review` | decision/note | analysis review | Tích hợp thật | Admin xem risk items trước duyệt |
| Admin dispute | `GET /admin/disputes`, `PATCH review` | status/note | dispute | Tích hợp thật | Không tự phán quyết bằng AI |

## Contract cần đối chiếu khi AI production sẵn sàng

- `Verification`: `provider`, `simulated`, `extractedData`, `anomalyReasons`, `status`.
- `ContractAnalysis`: `provider`, `simulated`, `disclaimer`, `reviewStatus`, `risks[]`.
- Severity của `ContractRisk` hiện là `string` vì Backend provider chưa khai báo enum. Khi Backend chốt enum, đổi thành union TypeScript trong `src/types/api.ts` và mapping nhãn; không cần sửa cấu trúc component.
- Nút “Yêu cầu bổ sung” eKYC hiện dùng quyết định `REJECT` kèm ghi chú vì Backend `Decision` mới có `APPROVE|REJECT`; nên bổ sung decision riêng nếu cần phân biệt báo cáo vận hành.

Không có fallback dữ liệu phòng/chat/booking/payment khi API lỗi. Giao diện hiển thị lỗi kết nối rõ ràng.
