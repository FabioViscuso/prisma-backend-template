import express from "express";
import cors from "cors";
import { PrismaClient } from '@prisma/client';
import { env } from "./config/env.config";

// express app init
const app = express();
// exporting the Prisma Client instance avoids us making new instances
export const prisma = new PrismaClient();

// allow cors
app.use(cors());

//parse all req of content-type (application/json)
app.use(express.json());

//parse all req url-encoded
app.use(express.urlencoded({ extended: true }));

// route for making sure the server is online
app.get('/onlinetest', (req, res) => {
    res.json({ message: 'server online' })
});

// routes
import { authRoutes } from "./routes/auth.routes";
import { productRoutes } from "./routes/product.routes";
import { userRoutes } from "./routes/user.routes";
app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api', userRoutes);

// start function chains the server startup after a succesful db connection
function start() {
    prisma.$connect()
        .then(() =>
            // if connection is successful, run server start
            app.listen(env.PORT, () => {
                console.log('server running correctly on port ' + env.PORT);
                // call the seeding function if server has started
                seed()
                    .then(async () => {
                        console.log('Seed function run correctly');
                        await prisma.$disconnect();
                    })
                    .catch(async (err) => {
                        console.error('Seed function encountered an error: ' + err);
                        await prisma.$disconnect();
                        process.exit(1);
                    })
            })
        )
        .catch((err) =>
            // if db connection is down, server won't start and this log is shown instead
            console.log('Server not started: DB connection unsuccesful. Error: ' + err)
        )
}
start();

// seed db function
async function seed() {
    const seedUsers = await prisma.users.findMany();
    const seedProducts = await prisma.products.findMany();

    // if seedUsers is null/undefined, then the table is empty or non-existing
    // in that case, we proceed with seeding
    if (!seedUsers || seedUsers.length === 0) {
        const test_users =
            [
                {
                    username: 'testUser',
                    email: 'test@email.com',
                    password: 'testpassword'
                },
                {
                    username: 'testUser2',
                    email: 'test@othermail.com',
                    password: 'anotherpassword'
                },
            ];

        test_users.forEach(test_user => {
            prisma.users.create({
                data: test_user
            })
                .then(() => console.log('Seeding successful'))
                .catch(err => console.error('Error while seeding: ' + err))
        });
    };

    // if seedProducts is null/undefined/empty, then the table is empty or non-existing
    // in that case, we proceed with seeding
    if (!seedProducts || seedProducts.length === 0) {
        const test_products =
            [
                {
                    productName: 'testProduct',
                    description: 'a nice test product',
                    price: 9.99
                },
                {
                    productName: 'testProduct2',
                    description: 'an even nicer test product',
                    price: 100.00
                },
            ];

        test_products.forEach(product => {
            prisma.products.create({
                data: product
            })
                .then(() => console.log('Seeding successful'))
                .catch(err => console.error('Error while seeding: ' + err))
        });
    };

    if (seedUsers && seedProducts) {
        console.log('DB already seeded, skipping seed operation');
    };
}
