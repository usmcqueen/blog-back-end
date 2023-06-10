// require('dotenv').config()
// const fs = require('fs')
// const S3 = require('aws-sdk/clients/s3')

// const bucketName = process.env.AWS_BUCKET_NAME
// const region = process.env.AWS_BUCKET_REGION
// const accessKeyId = process.env.AWS_ACCESS_KEY
// const secretAccessKey = process.env.AWS_SECRET_KEY

// const s3 = new S3({
//   region,
//   accessKeyId,
//   secretAccessKey
// })

// // uploads a file to s3
// function uploadFile(file) {
//   const fileStream = fs.createReadStream(file.path)

//   const uploadParams = {
//     Bucket: bucketName,
//     Body: fileStream,
//     Key: file.filename
//   }

//   return s3.upload(uploadParams).promise()
// }
// exports.uploadFile = uploadFile


// // downloads a file from s3
// function getFileStream(fileKey) {
//   const downloadParams = {
//     Key: fileKey,
//     Bucket: bucketName
//   }

//   return s3.getObject(downloadParams).createReadStream()
// }
// exports.getFileStream = getFileStream





https://cap-img.s3.us-east-1.amazonaws.com/5a6cdccd38e3c9b1286dbd4b80d6299293656c6eba2e4cfb59f2372df0b0fe6f?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAX6ORRUMIQM5N322L%2F20230610%2Fus-east-1%2Fs3%2Faws4_req