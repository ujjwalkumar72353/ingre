const express = require('express');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
const path = require('path');
const fs = require('fs');

const cors = require('cors');


const app = express();
// In your backend, make the CORS policy more permissive temporarily:
app.use(cors({
  origin: '*'
}));


app.use(express.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


app.post('/upload', async (req, res) => {
  if (!req.files || !req.files.image) {
    return res.status(400).send({ error: 'No image uploaded.' });
  }

  try {
    const file = req.files.image;

   
    const uploadResult = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'my_uploads',
      resource_type: 'image',
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      access_mode: 'public',
      format: 'jpg',
    });
    
    const imageUrl = uploadResult.secure_url;
    fs.unlinkSync(file.tempFilePath);

    res.send({
      imageUrl
    });

  } catch (err) {
    console.error('Error:', err.response?.data || err.message);
    res.status(500).send({ error: 'Something went wrong.' });
  }
});

app.use(express.static(path.join(__dirname, '../frontened')));

// This will serve the index.html file when someone visits the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontened', 'index.html'));
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
