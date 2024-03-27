import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(path.join(), ".env") });
export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwt: {
    jwt_secret: process.env.JWT_SECRET,
    expires_in: process.env.EXPIRES_IN,
    refresh_token: process.env.REFRESH_TOKEN_SECRET,
    refresh_token_expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN,
    reset_pass_secret: process.env.RESET_PASS_TOKEN,
    reset_pass_token_expire_in: process.env.RESET_PASS_TOKEN_EXPIRES_IN,
    },
  
    reset_pass_link: process.env.RESET_PASS_LINK,
    emailSender: {
        email: process.env.EMAIL,
        app_password:process.env.APP_PASSWORD
    }
};
