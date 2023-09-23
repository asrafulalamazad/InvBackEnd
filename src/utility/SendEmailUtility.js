const nodemailer = require('nodemailer');


const SendEmailUtility= async (EmailTo, EmailText, EmailSubject) => {

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "asrafulnodemailer@gmail.com",
            pass: 'gszb lsan rcfn pcnu'
        },
    });


    let mailOptions = {
        from: 'Inv by ASRAFUL <asrafulnodemailer@gmail.com>',
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    };
    return  await transporter.sendMail(mailOptions)

}
module.exports=SendEmailUtility