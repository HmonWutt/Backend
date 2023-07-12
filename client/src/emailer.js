const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");

const CLIENT_ID =
  "539052762848-4ehetuj80a9aob5qvk8g67jouv4o7s3v.apps.googleusercontent.com";

const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const REFERSH_TOKEN =
  //"1//049xt1u8xPpMrCgYIARAAGAQSNwF-L9IrRqwQrTDjYPf7kxKsM-FLij-bVhPEDFw2GNvPwz8-iu-aFlOt47kMrWLlrfYd62ixeH4";
  "1//04wFaqOoY4zz2CgYIARAAGAQSNwF-L9IrrfeCFnf-2012_hu5hKd_S1e2TLZKJRZur9ZGXbmTyJb-P2ylfoT5h-0wWrCKrvJUsuM";
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFERSH_TOKEN });

async function sendMail() {
  try {
    const AccessToken = await oAuth2Client.getAccessToken();
    const Transport = nodemailer.createTransport({
      service: "gmail",

      auth: {
        type: "OAuth2",
        user: "wtthumon@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFERSH_TOKEN,
        accessToken: AccessToken,
      },
    });

    const mailOptions = {
      from: "Remidder 🔔 <wtthumon@gmail.com>",
      to: "wtthumon@gmail.com",
      subject: "This is a reminder to clean bedsheets",
      text: "This is a reminder to clean bedsheets",
      html: "<h3>This is a reminder to clean bedsheets</h3>",
    };
    const result = await Transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.error(error.message);
  }
}
sendMail()
  .then((result) => console.log("Reminder sent", result))
  .catch((error) => console.log(error.message));
//export default sendMail;
//
