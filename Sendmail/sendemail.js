//import { setApiKey, send } from '@sendgrid/mail';

import pkg from '@sendgrid/mail';
import { config } from '../configuration/config.js';

pkg.setApiKey(config.sendmail_apikey)

export const sendmail = (email,username,booking_date) => {
    var time = new Date(booking_date);
  const formatted_time = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    const email_body = {
        from: 'mepujan10@gmail.com',
        to: email,
        subject: 'Appointment confirmation',
        text: `
        Welcome ${username}, 
        Your booking is confirmed on ${booking_date.toJSON().slice(0, 10)} ${formatted_time}. 
        Thank you!`,
    }
    
    pkg.send(email_body)
    .then((response) => {
        console.log('SendGrid Email sent: ' + response)
    })
    .catch((error) => {
        console.error(error)
    })
}