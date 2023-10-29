
const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: 'blahsomething',
    db: 'codial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'kumarharish.test@gmail.com',
            pass: 'ebgu uyxb wyfn wdap'
        }
    },
    google_client_id: '1036822726383-v4gf9kmlki9lu1dkjvol27112ob9du64.apps.googleusercontent.com',
    google_client_secret: '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',
    google_callback_url: 'http://localhost:8000/users/auth/google/callback',
    jwt_secret: 'codial'
}

const production = {
    name: process.env.CODIAL_ENVIRONMENT,
    asset_path: process.env.CODIAL_ASSET_PATH,
    session_cookie_key: process.env.CODIAL_SESSION_COOKIE_KEY,
    db: process.env.CODIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CODIAL_SMTP_AUTH_USER,
            pass: process.env.CODIAL_SMTP_AUTH_PASS
        }
    },
    google_client_id: process.env.CODIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODIAL_GOOGLE_CLIENT_SECRET,
    google_callback_url: process.env.CODIAL_GOOGLE_CALLBACK_URLA,
    jwt_secret: process.env.CODIAL_JWT_SECRET
}

module.exports = eval(process.env.CODIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODIAL_ENVIRONMENT);