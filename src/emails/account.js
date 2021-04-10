const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'linchi.clinic@gmail.com',
    subject: 'Thanks for joining in!',
    text: `Welcome to the app, ${name}. Let me know how you get along with the app`,
  })
}

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'linchi.clinic@gmail.com',
    subject: 'Account cancellation',
    text: `We are sorry to see you leave, ${name}. Is there anything we can do to get better?`,
  })
}

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail,
}
