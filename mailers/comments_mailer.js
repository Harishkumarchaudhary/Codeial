const nodeMailer = require('../config/nodemailer');

//this is another way of exporting a function
exports.newComment = (comment) => {
    console.log('inside new comment mailer');
    nodeMailer.transporter.sendMail({
       from: "kumarharish.test@gmail.com",
       to: comment.user.email,
       subject: 'New comment published',
       html: "<h1>Yup, your comment is now published</h1>"
    }, (err, info) => {
        if (err) {
            console.log('Error in sending the mail', err);
            return;
        }
        console.log('Message sent', info);
        return;
    });
}