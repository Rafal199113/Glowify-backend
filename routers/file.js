const express = require('express');
const router = express.Router();
const fs = require('fs');

router.post('/file/users/:id/download', (req, res) => {
    const userId = req.params.id; // Pobranie ID użytkownika z parametru
    console.log(userId)
    const filePath = "./files/" + userId + "/avatar.jpg" // Ścieżka do pliku użytkownika
    console.log(filePath);
    // Sprawdzanie, czy plik istnieje
    if (fs.existsSync(filePath)) {

        res.download(filePath, 'profile-picture.jpg', (err) => {
            if (err) {
                console.error('Error while sending file:', err);
                res.status(500).json({ message: 'Error while downloading the file' });
            }
        });
    } else {
        res.status(200).json({ message: 'File not exists' });
    }
});

module.exports = router;