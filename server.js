const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 4000; // Chung ta se chay server nay o cong 4000

// 1. Cau hinh CORS
// Cho phep trang web o cong 8080 (frontend) duoc phep goi den cong 4000
app.use(cors());

// 2. Tao thu muc 'uploads' neu no chua ton tai
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// 3. Cau hinh Multer (thu vien upload file)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Noi luu file
    },
    filename: function (req, file, cb) {
        // Tao ten file duy nhat = Thoi gian + Ten goc
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8'); // Xu ly ten file co dau
        cb(null, uniqueSuffix + '-' + originalName);
    }
});

const upload = multer({ storage: storage });

// 4. Bien thu muc 'uploads' thanh PUBLIC
// De trinh duyet co the truy cap file qua URL
// Vi du: http://localhost:4000/uploads/ten_file.jpg
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 5. Tao API endpoint de nhan file
// Trang web (app.js) se goi API nay
app.post('/upload', upload.single('productFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ error: 'No file uploaded.' });
    }

    // Tao duong link (URL) day du cua file
    const fileUrl = `http://localhost:${port}/uploads/${req.file.filename}`;

    // Tra ve URL cho frontend
    res.status(200).send({ fileUrl: fileUrl });
});

// 6. Khoi dong may chu
app.listen(port, () => {
    console.log(`[Storage Server] Dang chay tai http://localhost:${port}`);
});
