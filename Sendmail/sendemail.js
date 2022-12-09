//import { setApiKey, send } from '@sendgrid/mail';

import pkg from '@sendgrid/mail';
import { config } from '../configuration/config.js';

pkg.setApiKey(config.sendmail_apikey)

export const sendmail = (email,username,booking_date) => {
    var time = new Date(booking_date);
  const formatted_time = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    const email_body = {
        from: 'apexdriving78@gmail.com',
        to: email,
        subject: 'Appointment confirmation',
        html:`
            <h3>Welcome ${username}</h3><br/>
            <p>Your Schedule has been confirmed for the date 
                <strong>${booking_date.toJSON().slice(0, 10)} at ${formatted_time}</strong>.
                Please be on time. <br/>
                Thankyou for choosing Apex Driving.
            </p>
        `
    }
    
    pkg.send(email_body)
    .then((response) => {
        console.log('SendGrid Email sent: ' + response)
    })
    .catch((error) => {
        console.error(error)
    })
}