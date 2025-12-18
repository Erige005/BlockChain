🛡️ Copyright Pro Ultimate (DApp)

Hệ thống Xác thực & Chuyển nhượng Bản quyền Số trên nền tảng Blockchain Ethereum.

📖 Giới thiệu

Copyright Pro là một ứng dụng phi tập trung (Decentralized Application - DApp) giải quyết bài toán xác thực quyền sở hữu trí tuệ và tự động hóa quy trình chuyển nhượng tài sản số.

Dự án áp dụng mô hình Hybrid Architecture (Kiến trúc lai), kết hợp sức mạnh bảo mật của Blockchain (On-chain) và khả năng lưu trữ linh hoạt của Web truyền thống (Off-chain).

✨ Tính năng nổi bật (V5.0 Ultimate)

Đăng ký tác quyền (Proof of Existence): Tạo bằng chứng sở hữu vĩnh viễn với mã Hash SHA-256.

Sàn giao dịch (Marketplace): Mua, bán, chuyển nhượng quyền sở hữu trực tiếp (P2P).

Cơ chế Hoa hồng (Royalty): Tác giả gốc tự động nhận % hoa hồng vĩnh viễn mỗi khi tác phẩm được bán lại.

Truy xuất nguồn gốc (Provenance): Xem lại toàn bộ lịch sử giao dịch từ lúc khởi tạo.

SocialFi On-chain: Tích hợp tính năng Like và Bình luận phi tập trung.

Chứng nhận số: Xuất file PDF chứng nhận sở hữu có giá trị tham khảo pháp lý.

🛠️ Công nghệ sử dụng (Tech Stack)

Thành phần

Công nghệ

Vai trò

Blockchain

Hardhat Network

Mạng Ethereum giả lập cục bộ (Localhost).

Smart Contract

Solidity (v0.8.20)

Logic nghiệp vụ, quản lý trạng thái sở hữu.

Frontend

HTML5 / Bootstrap 5

Giao diện người dùng (Dashboard UI).

Web3 Logic

Ethers.js (v6)

Thư viện kết nối Frontend với Blockchain (RPC).

Backend Storage

Node.js / Express

Máy chủ lưu trữ file media (Ảnh/Video).

🚀 Hướng dẫn Cài đặt & Chạy (Localhost)

Để chạy dự án, bạn cần mở 3 cửa sổ Terminal riêng biệt.

Bước 0: Chuẩn bị môi trường

Yêu cầu máy tính đã cài đặt:

Node.js (Khuyên dùng v18 hoặc v20)

Ví MetaMask trên trình duyệt Chrome/Edge.

Bước 1: Khởi chạy Blockchain (Terminal 1)

# Di chuyển vào thư mục dự án
cd hardhat-tutorial

# Cài đặt các gói phụ thuộc (chạy lần đầu)
npm install

# Khởi động mạng Hardhat
npx hardhat node


⚠️ LƯU Ý: Giữ terminal này chạy liên tục. Nó sẽ cung cấp 20 tài khoản ví thử nghiệm với 10.000 ETH.

Bước 2: Khởi chạy Server Lưu trữ (Terminal 2)

# Di chuyển vào thư mục dự án
cd hardhat-tutorial

# Chạy server lưu trữ ảnh
node server.js


Server sẽ chạy tại http://localhost:4000.

Bước 3: Deploy & Chạy Frontend (Terminal 3)

# 1. Triển khai Smart Contract lên mạng Local
npx hardhat run scripts/deploy.js --network localhost

# -> COPY ĐỊA CHỈ CONTRACT VỪA SINH RA (Ví dụ: 0x5Fb...)

# 2. Cập nhật file app.js
# Mở file app.js và thay thế biến `contractAddress` bằng địa chỉ vừa copy.

# 3. Chạy giao diện Web
npx http-server .


Truy cập Web tại: http://127.0.0.1:8080

⚙️ Cấu hình Ví MetaMask (Quan trọng)

Để kết nối được với mạng Localhost, bạn cần cấu hình MetaMask như sau:

Thêm mạng thủ công:

Network Name: Hardhat Local

RPC URL: http://127.0.0.1:8545

Chain ID: 31337

Currency Symbol: ETH

Nhập tài khoản (Import Account):

Lấy Private Key của Account #0 hoặc Account #1 từ Terminal 1.

Vào MetaMask -> Import Account -> Dán Private Key.

Reset Ví (Nếu bị lỗi):

Nếu gặp lỗi Nonce hoặc kết nối, vào Cài đặt -> Nâng cao -> Xóa dữ liệu hoạt động (Clear activity data).

🧪 Kịch bản Demo (Testing Scenario)

Đăng ký (Vai trò Tác giả):

Dùng Ví A đăng ký một ảnh. Đặt phí hoa hồng 10%.

Niêm yết bán:

Ví A niêm yết bán ảnh đó với giá 100 ETH.

Mua hàng (Vai trò Người sưu tầm):

Chuyển sang Ví B.

Vào tab "Sàn Giao Dịch", mua ảnh giá 100 ETH.

Kiểm tra Hoa hồng:

Dùng Ví B bán lại ảnh cho Ví C giá 200 ETH.

Kiểm tra số dư Ví A -> Sẽ thấy Ví A tự động nhận được tiền hoa hồng từ giao dịch của B và C.

Xem Lịch sử:

Bấm vào nút "Chi tiết" để xem toàn bộ dòng thời gian giao dịch minh bạch.

📝 Thông tin tác giả

Sinh viên: Nguyễn Nhật Nam  

Mã sinh viên: 23020557

Lớp/Môn học: Công nghệ Blockchain

Dự án được xây dựng với mục đích học tập và nghiên cứu.