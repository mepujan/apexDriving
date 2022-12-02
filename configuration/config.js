import dotenv from 'dotenv';

dotenv.config();

export const config= {
    databaseString : process.env.DATABASE_CONNECTION_STRING,
    secret_key : process.env.SECRET_KEY,
    sendmail_apikey: process.env.SENDMAIL_API_KEY
}
