const nodeMailer = require('../config/nodemailer');

//this is another way of exporting a function
exports.newComment = (comment) => {

    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs')
    nodeMailer.transporter.sendMail({
       from: "kumarharish.test@gmail.com",
       to: comment.user.email,
       subject: 'New comment published',
       html: htmlString
    }, (err, info) => {
        if (err) {
            console.log('Error in sending the mail', err);
            return;
        }
        console.log('Message sent', info);
        return;
    });
}