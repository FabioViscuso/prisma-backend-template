/*
    This file acts as a register for the variables used in the .env file
    Also allows the possibility to use fallback values
*/
/*
    To change the fallback secret, run this line on your terminal
    node -e "console.log(crypto.randomBytes(32).toString('hex'))"
    And feel free to change the number of random bytes depending on your needs
*/

import "dotenv/config";

export const env = {
    /* The fallback assumes you're using postgres */
    DATABASE_URL: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/test-db?schema=public",
    AUTH_SECRET: process.env.AUTH_SECRET || "70812b699e021454f977ef6a575ef5105e885af009c664f4e5a874fc3f064a72",
    PORT: Number(process.env.PORT) || 8080
};
