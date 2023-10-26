import nodemailer from 'nodemailer';

// class Nodemailer {
//     constructor(
//         private readonly host: string,
//         private readonly port: number,

//     ) {

//     }
// }

const transporter = nodemailer.createTransport({
  host: '',
  port: 0,
  secure: false,
  auth: {
    user: '',
    pass: '',
  },
});

export default transporter;
