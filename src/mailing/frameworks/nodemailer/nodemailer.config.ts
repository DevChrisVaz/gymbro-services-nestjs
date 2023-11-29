export default () => ({
  nodemailerEmailService: process.env.NODEMAILER_EMAIL_SERVICE,
  nodemailerHost: process.env.NODEMAILER_HOST,
  nodemailerPort: process.env.NODEMAILER_PORT,
  nodemailerUser: process.env.NODEMAILER_USER,
  nodemailerPass: process.env.NODEMAILER_PASSWORD,
});
