const express = require('express');
const app = express(); 
const conn = require('./config/db'); // Impor koneksi database
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Route untuk mendapatkan data pengguna
app.get('/get-pengguna', (req, res) => {
    const queryStr = "SELECT * FROM pengguna WHERE deleted_at IS NULL";
    conn.query(queryStr, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                "success": false,
                "message": err.sqlMessage,
                "data": null
            });
        } else {
            res.status(200).json({
                "success": true,
                "message": "Sukses menampilkan data",
                "data": results
            });
        }
    });
});

// Route untuk menyimpan data pengguna
app.post('/store-pengguna', (req, res) => {
    console.log('Request body:', req.body); // Logging body request
    const param = req.body;
    const nama = param.nama; // Pastikan menggunakan nama variabel yang sama
    const jurusan = param.jurusan;
    const now = new Date();

    const queryStr = "INSERT INTO pengguna (nama, jurusan, created_at) VALUES (?, ?, ?)";
    const values = [nama, jurusan, now];

    conn.query(queryStr, values, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                "success": false,
                "message": err.sqlMessage,
                "data": null
            });
        } else {
            res.status(200).json({
                "success": true,
                "message": "Sukses menyimpan data",
                "data": results
            });
        }
    });
});

// Route untuk mendapatkan pengguna berdasarkan ID
app.get('/get-pengguna-by-id', (req, res) => {
    const param = req.query;
    const id = param.id;

    const queryStr = "SELECT * FROM pengguna WHERE deleted_at IS NULL AND id = ?";
    const values = [id];

    conn.query(queryStr, values, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                "success": false,
                "message": err.sqlMessage,
                "data": null
            });
        } else {
            res.status(200).json({
                "success": true,
                "message": "Sukses menampilkan data",
                "data": results
            });
        }
    });
});

// Route untuk mengupdate data pengguna
app.post('/update-pengguna', (req, res) => {
    const param = req.body;
    const id = param.id;
    const nama = param.nama;
    const jurusan = param.jurusan;

    const queryStr = "UPDATE pengguna SET nama = ?, jurusan = ? WHERE id = ? AND deleted_at IS NULL";
    const values = [nama, jurusan, id];

    conn.query(queryStr, values, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                "success": false,
                "message": err.sqlMessage,
                "data": null
            });
        } else {
            res.status(200).json({
                "success": true,
                "message": "Sukses mengupdate data",
                "data": results
            });
        }
    });
});


app.post('/deleted-pengguna', function (req, res) {
    const param = req.body;
    const id = param.id;
    const now = new Date();

    const queryStr = "UPDATE pengguna SET deleted_at = ? WHERE id = ?";
    const values = [now, id];

    conn.query(queryStr, values, (err,results) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                "success": false,
                "message": err.sqlMessage,
                "data": null
            });
        } else {
            res.status(200).json({
                "success": true,
                "message": "Sukses mengupdate data",
                "data": results
            });
        }
    });
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
