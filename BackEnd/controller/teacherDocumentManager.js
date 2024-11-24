const { response } = require('express')
const AWS = require('aws-sdk');




AWS.config.update({
  accessKeyId: 'AKIA3C6FMGTN77WERHOE',  
  secretAccessKey: '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',
  region: 'ap-south-1' 
});

const s3 = new AWS.S3();


const upload = (req, res, next) => {


try{

  //////////////////////////////
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < 4; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  result = result+'.png'
  ////////////////////////////////
   
    let buffer = req.file.buffer;
    let fileName = result;

    const params = {
      Bucket: 'ob-upload',
      Key: fileName,    
      Body: buffer   
  };

  s3.upload(params, (err, data) => {
      if (err) {
          res.json({
            success: false,
            message: 'Document uploaded fail!'+err,
            code: 400,
        });
      }
      console.log(`File uploaded successfully. ${data.Location}`);

      res.json({
        success: true,
        message: 'Document uploaded successfully!',
        code: 200,
        data : data
    });
  })
    
    //////////////////////////////////////

   
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({ message: 'Error processing file', error });
  }



}

module.exports = {
  upload
}