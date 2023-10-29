
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
    name: 'production'
}

module.exports = development;