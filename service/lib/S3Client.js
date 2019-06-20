const { S3 } = require('aws-sdk');
const region = 'us-west-2';
const pongrankBucket = 'no bucket for public';

class S3Client {
  constructor() {
    this.client = new S3({ region });
  }

  async get(key) {
    const params = { Bucket: pongrankBucket, Key: key };
    const result = await this.client.getObject(params).promise();

    return JSON.parse(result.Body.toString());
  };

  async list(prefix) {
    const params = {
      Bucket: pongrankBucket,
      Prefix: prefix,
    };

    const { Contents } = await this.client.listObjectsV2(params).promise();
    if (Contents.length < 1) return [];
    
    return Contents.map((resource) => {
      return resource.Key.split(prefix)[1];
    })
  };

  async put(key, data, expireAt=null) {
    const params = {
      Bucket: pongrankBucket,
      Key: key,
      Body: JSON.stringify(data),
    };

    if (expireAt) { params.Expires = expireAt };

    await this.client.putObject(params).promise();
  };

  async putImage(key, img) {
    const params = {
      Bucket: pongrankBucket,
      Key: key,
      Body: Buffer.from(img, 'base64'),
      Metadata: {
        'Content-Type': 'image/jpeg'
      },
      ACL: 'public-read',
    };


    try {
      await this.client.putObject(params).promise();
    } catch (e) {
      console.log('[S3_PUT_FAILURE]', e);
    }
  }
}

module.exports = S3Client;