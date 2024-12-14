const multer = require('multer');
const fs = require('fs');
const path = require('path');
// Konfiguracja miejsca zapisu i nazwy pliku
const storage = multer.diskStorage({
    limits: { fileSize: 10 * 1024 * 1024 },
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '/', req.body.id);

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath); // Folder, w którym będą przechowywane pliki
    },
    filename: (req, file, cb) => {
        const fileName = 'avatar' + path.extname(file.originalname);
        cb(null, fileName);
    }
});

module.exports = multer({ storage });