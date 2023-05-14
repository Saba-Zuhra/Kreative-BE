import nodemailer from "nodemailer";

export const sendMail = async (to, subject, body) => {
  try {
    const mailTransport = nodemailer.createTransport({
      service: "gmail",
      host: "smtpout.secureserver.net",
      secure: true,
      tls: {
        ciphers: "SSLv3",
      },
      requireTLS: true,
      port: 465,
      debug: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailDetails = {
      from: process.env.EMAIL,
      to: to,
      subject: subject,
      html: body,
    };

    const result = await mailTransport.sendMail(mailDetails);
    return result;
  } catch (err) {
    console.log(err);
    return;
  }
};

export const sendMailWithAttachment = async (to, subject, body, attachment) => {
  try {
    const mailTransport = nodemailer.createTransport({
      service: "gmail",
      host: "smtpout.secureserver.net",
      secure: true,
      tls: {
        ciphers: "SSLv3",
      },
      requireTLS: true,
      port: 465,
      debug: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailDetails = {
      from: process.env.EMAIL,
      to: to,
      subject: subject,
      html: body,
      attachments: attachment,
    };

    const result = await mailTransport.sendMail(
      mailDetails,
      function (err, info) {}
    );
    return result;
  } catch (err) {
    console.log(err);
    return;
  }
};
