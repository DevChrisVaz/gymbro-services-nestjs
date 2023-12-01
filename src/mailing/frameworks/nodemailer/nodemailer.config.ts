export default () => ({
  nodemailerEmailService: "hotmail",
  nodemailerHost: "smtp.office365.com",
  nodemailerPort: 587,
  nodemailerUser: process.env.NODEMAILER_USER,
  nodemailerPass: process.env.NODEMAILER_PASSWORD,
});
