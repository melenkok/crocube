const { Storage } = require('@google-cloud/storage');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const cloudStorage = new Storage({
  keyFilename: process.env.KEYFILE,
  projectId: process.env.PROJECT_ID,
});
const bucketName = process.env.BUCKET_NAME;
const bucket = cloudStorage.bucket(bucketName);

const uploadFile = (f, folderName) => {
  return new Promise((resolve, reject) => {
    const { originalname, buffer } = f;
    var filename = originalname.toLowerCase().split(' ').join('-');

    const blob = bucket.file(`${folderName}/${filename}`);

    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on('error', (err, res) => {
      reject(err);
    });

    blobStream.on('finish', async (data) => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${folderName}/${blob.name}`;
      resolve(publicUrl);
    });

    blobStream.end(buffer);
  });
};

exports.upload = async (req, res) => {
  try {
    for (var i = 0; i < req.files.length; i++) {
      if (!req.files[i]) {
        return res.status(400).send({ message: 'Please upload a file!' });
      }
      await uploadFile(req.files[i], req.body.folderName);
    }

    return res.status(200).send({
      message: 'Uploaded the files successfully',
    });
  } catch {
    res.status(500).send({ message: 'Error' });
  }
};

// multer.array('files'),
//   function (req, res, next) {
//     if (!req.file) {
//       res.status(400).send('No file uploaded.');
//       return;
//     }
//     const blob = bucket.file(req.file.originalname);
//     const blobStream = blob.createWriteStream();
//     blobStream.on('error', (err) => {
//       next(err);
//     });
//     blobStream.on('finish', () => {
//       // The public URL can be used to directly access the file via HTTP.
//       const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

//       res.status(200).json({ publicUrl });
//     });
//     blobStream.end(req.file.buffer);
//     console.log(req.file);
//   },
