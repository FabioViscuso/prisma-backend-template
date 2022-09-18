
# Backend template

This is a basic template tuned for simple e-commerce apps.
It includes basic functionality for creating, updating and deleting users,
as well as CRUD operations for a products table. It handles authorization as well.

## Dependencies

### Dependencies
-    "@prisma/client": The tool that generates queries
-    "bcrypt": For data encryption (eg: passwords)
-    "cors": Allow CORS policy
-    "dotenv": Adds support for .env files
-    "express": The Node.js framework used in this project
-    "jsonwebtoken": Allows creation and signing of JWTs

### DevDependencies
-    "@types/bcrypt"
-    "@types/cors"
-    "@types/express"
-    "@types/jsonwebtoken"
-    "@types/node"
-    "concurrently": Allows running multiple commands in parallel
-    "nodemon": Runs a file and reloads it on change
-    "prisma": Support for migrations and the integrated DB editor (prisma studio)
-    "ts-node": Allows running of .ts files directly
-    "typescript": Typescript support and compiler

## Basic instructions

If you just cloned this repo, please run these steps in order
- 1 : npm i
- 2 : npm run build
- 3 : npx prisma init -OR- create an .env file in the root folder with required variables. For a reference, see app/config/env.config.ts. Prisma init will create an .env file with only a placeholder url for DB connections

Then you will be able to start the project, refer to the section below:

### Scripts

    "build": "tsc"                          Builds .js files. This is mostly useful when deploying

    "build-watch": "tsc --watch"            This builds the project as changes are made, useful in development

    "start": "node build/server.js"         This runs the server once, useful when deploying

    "start-watch": "nodemon --watch app"    This runs the server.ts files directly (no build) and restarts when changes are made, useful in development

    "dev": "concurrently 'npm:build-watch' 'npm:start-watch'"   This runs both the build and the server in watch mode, useful in development


## Directory Tree

📁ROOT-FOLDER

    📁app

        📁config
            🔹env.config.ts             contains a reference to all the env variables

        📁controllers
            🔹users.controller.ts       handles signup & login logic and CRUD operations on users table
            🔹products.controller.ts    handles CRUD operations on products table

        📁middleware
            🔹checkDuplicates.ts        Check username & password
            🔹verifyToken.ts            Check Token + check user-db-roles

        📁routes
            🔹auth.routes.ts            register (user creation) and login
            🔹user.routes.ts            endpoints for user RUD

        🔹server.ts                     the main server file

    📁build
        🔹(contains the generated .js files from build command. Content may vary based on tsc config)

    📁prisma

        📁migrations                    contains subfolders with migration data

        🔹schema.prisma                 contains prisma config and handles the generation of models

    (🔹.env)                                for env variables, you have to create it manually
    🔹.gitignore                            ignored files and folders
    🔹LICENSE                               already set to MIT type, modify this file with your name
    🔹package-lock.json                     complete tree of installed dependencies
    🔹package.json                          general project configuration
    🔹README                                this file
    🔹tsconfig.json                         typescript lint and compiler settings

## REST API reference

### Auth routes
    POST    /api/auth/signup        create user
    POST    /api/auth/signin        login user

### User routes
    PUT     /api/user/pwchange      change user password
    DELETE  /api/user               delete user

### Product routes
    GET     /api/product/:productName   get a single product
    GET     /api/product                get all products
    POST    /api/product                insert new product
    PUT     /api/product                modify product
    DELETE  /api/product                delete product

## Other steps

-   LICENSE file can be modified with your name
-   package.json can be modified with your name, project name, and repo url

## Credits

This project is an overhaul and TypeScript port of this one:
- https://github.com/jagama/Node-Test/

Which was born as a starting point for studying local backend auth
