import { IPerson } from 'src/users/domain/entities/person.entity';

const verificationEmail = (person: IPerson, token: string) => {
  return `
    <!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Email</title> <!-- Not Needed, Erase -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap"
        rel="stylesheet">
    <style type="text/css">
        body {
            margin: 0;
            padding: 0;
            background-color: #eeeeee;
            font-family: 'Sora', sans-serif;
        }

        table {
            border-spacing: 0;
        }

        td {
            padding: 0;
        }

        img {
            border: 0;
        }

        .wrapper {
            width: 100%;
            table-layout: fixed;
            background-color: #161616;
            padding-bottom: 40px;
        }

        .webkit {
            max-width: 600px;
            background-color: #111111;
        }

        .outer {
            margin: 0;
            width: 100%;
            max-width: 600px;
            border-spacing: 0;
        }

        .padding {
            padding: 15px 30px;
            color: #000000;
        }

        .mailbody {
            color: #ffffff;
            padding: 0 20px 15px;
        }

        .details {
            color: #27be82;
        }

        .content {
            margin: 10px;
            padding: 0 20px 50px;
            background-color: #161616;
            border-radius: 20px;
        }

        @media screen and (max-width: 600px) {}

        @media screen and (max-width: 400px) {}
    </style>
</head>

<body>
    <center class="wrapper">
        <div class="webkit">
            <table class="outer" align="center">
                <tr>
                    <td>
                        <table width="100%" style="border-spacing: 0;">
                            <tr>
                                <td style="background-color: #111111; padding: 20px 40px 0; text-align: left;">
                                    <a href="http://facturandote.com/"><img
                                            src="https://gymbro-images.s3.us-east-2.amazonaws.com/app/logo/4x/horizontal-logo.png" width="160px"
                                            alt="GYMBRO" title="GYMBRO"></a>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table width="100%" style="border-spacing: 0;">
                            <tr>
                                <td class="padding">
                                    <table align="center" class="details">
                                        <tr>
                                            <td>
                                                <table align="center" class="content">
                                                    <tr>
                                                        <td>
                                                            <p style="font-size: 18px; font-weight: bold;">Confirmar
                                                                Cuenta</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <p class="mailbody">Hola, ${person.firstName}. Gracias por
                                                                unirte a GYMBRO, para finalizar tu registro
                                                                es necesario que confirmes tu cuenta de correo.
                                                            </p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <p
                                                                style="color: #ffffff;padding: 0 20px; margin-bottom: 40px;">
                                                                Haz click en el siguiente
                                                                enlace para continuar:</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <a href="https://gymbro-landing-page.vercel.app/confirm-account/${token}"
                                                                style="margin: 0 140px; padding: 20px 25px; outline: none; border: none; 
                                                                        border-radius: 100px; background-color: #27be82; color: #ffffff; font-size: 16px;
                                                                        text-decoration: none;">Confirmar cuenta</a>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <!-- <tr>
                                            <td>
                                                <p style="color: #ffffff; padding: 0 20px">Suscribete para recibir
                                                    ofertas ocasionales,
                                                    <a href="#" target="_blank"
                                                        style="text-decoration: none; color: #27be82;">haz click
                                                        aquí</a>.
                                                </p>
                                            </td>
                                        </tr> -->
                                        <tr>
                                            <td>
                                                <p class="mailbody" style="color: #27be82; font-weight: bold;"><span
                                                        style="color: #ffffff;">Gracias.</span> <br>
                                                    El equipo de GYMBRO.</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table width="100%"
                            style="background-color: #111111; border-spacing: 0; color: #000000; font-size: 14px; border-top: 1px solid #27be82;">
                            <tr>
                                <td style="padding: 20px; text-align: center;">
                                    <a href="http://facturandote.com/"><img
                                        src="https://gymbro-images.s3.us-east-2.amazonaws.com/app/logo/4x/horizontal-logo.png" width="200px"
                                        alt="GYMBRO" title="GYMBRO"></a>
                                    <!-- <p style="margin-top: 18px;">20 #277 Miguel Alemán, Mérida, Yucatán, 97148.</p> -->
                                    <p style="margin-top: 18px; color: #27be82; text-decoration: none;">
                                        gymbro.test@gmail.com</p>
                                    <!-- <p style="margin-top: 18px; color: #220050;">+52 999-927-5000</p> -->
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </center>
</body>

</html>
    `;
};

export default verificationEmail;
