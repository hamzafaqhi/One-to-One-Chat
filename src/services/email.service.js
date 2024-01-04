const nodemailer = require('nodemailer');
const config = require("../config/config.js");
const pug = require("pug");
const path = require('path'); 

const transport = nodemailer.createTransport(config.email.smtp);
if (config.env !== 'test') {
  transport.verify().then(() => console.log('Connected to email server')).catch((e) => console.log('Unable to connect to email server. Make sure you have configured the SMTP options in .env',e))
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text = null, html = null) => {
    
    const msg = { from: config.email.from, to, subject,  };
    if(html) 
        msg.html = html
    if(text)
        msg.text = text
    await transport.sendMail(msg);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (user, token) => {
  const subject = 'Reset password';
  const to = user.email;
    // replace this url with the link to the reset password page of your front-end app
    // const text = `Dear customer,
    // To reset your password, enter this token ${token}
    // If you did not request any password resets, then ignore this email.
    // Regards
    // Prime Fit`;
    let reqPath = path.join(__dirname, '../')+'templates/email/password_reset.pug';
    const html = pug.renderFile(reqPath, {userName: user.full_name, userEmail: to, code: user.verify_token})
    let response = await sendEmail(to, subject, null, html);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (user) => {
    const subject = 'Email Verification';
    const to = user.email;
    let reqPath = path.join(__dirname, '../')+'templates/email/email_verification.pug';
    const html = pug.renderFile(reqPath, {userName: user.full_name, userEmail: to, code: user.verify_token})
    let response = await sendEmail(to, subject, null, html);
    return response;
};

const emailService = {
    transport,
    sendEmail,
    sendResetPasswordEmail,
    sendVerificationEmail
  };
module.exports= emailService;