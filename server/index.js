const express = require('express');
const { Storage } = require('@google-cloud/storage');
const cors = require('cors');
const Multer = require('multer');
const axios = require('axios');
const uploadController = require('./controllers/uploadController');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
require('dotenv').config();

app.use(express.static('../client/build'));

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024, // no larger than 15mb, you can change as needed.
  },
});
app.use(cors());

app.post(
  '/upload-file-to-cloud-storage',
  multer.any(),
  uploadController.upload,
);

app.post('/verify-token', async (req, res) => {
  const { token, secret_key } = req.body;

  try {
    let response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`,
    );

    return res.status(200).json({
      success: true,
      message: 'Token successfully verified',
      verification_info: response.data,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: 'Error verifying token',
    });
  }
});

const path = require('path');

app.use(express.static(path.resolve(__dirname, 'public/build')));

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/build', 'index.html'));
});

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
