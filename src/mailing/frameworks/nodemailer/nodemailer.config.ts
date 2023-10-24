import nodemailer from "nodemailer";

// class Nodemailer {
//     constructor(
//         private readonly host: string,
//         private readonly port: number,

//     ) {

//     }
// }

let transporter = nodemailer.createTransport({
    host: "",
    port: 0,
    secure: false,
    auth: {
        user: "",
        pass: ""
    }
});

export default transporter;