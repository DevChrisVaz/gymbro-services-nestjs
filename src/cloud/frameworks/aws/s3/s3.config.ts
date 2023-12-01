export default () => ({
  s3BucketName: "gymbro-images",
  s3BucketRegion: "us-east-2",
  s3PublicKey: "AKIAW5GOTOSUMSNLWM6V",
  s3PrivateKey: process.env.AWS_SECRET_KEY,
});
