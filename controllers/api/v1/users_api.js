const User = require('../../../models/user');
const JWT = require('jsonwebtoken');


module.exports.createSession = async function(req, res) {
   try {
     let user = await User.findOne({email: req.body.email});
     
     if (!user || user.password != req.body.password) {
        return res.json(422, {
            message: 'Invalid username/password'
        });
     }

     return res.json(200, {
        message: 'Signed In Successfully, here is your token, please keep it safe',
        data: {
            token: JWT.sign(user.toJSON(), 'codial', {expiresIn: 10000})
        }
     })
   } catch(err) {
     console.log('*****', err);
     return res.json(500, {
        message: 'Internal Server Error'
     });
   }
}