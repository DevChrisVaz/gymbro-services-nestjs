export default () => ({
  s3BucketName: process.env.AWS_BUCKET_NAME,
  s3BucketRegion: process.env.AWS_BUCKET_REGION,
  s3PublicKey: process.env.AWS_PUBLIC_KEY,
  s3PrivateKey: process.env.AWS_SECRET_KEY,
});
