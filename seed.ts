import { DataSource } from "typeorm";
import { User } from "./src/users/user.entity";
import * as bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

const AppDataSource = new DataSource({
    type: 'sqlite',
    database: './data/sqlite.db',
    entities: [User],
    synchronize: true,
});

async function seed() {
    await AppDataSource.initialize();

    const userRepo = AppDataSource.getRepository(User);
    const existing = await userRepo.findOneBy({ username: "admin1" });

    if(!existing) {
        const hashedPassword = await bcrypt.hash('password', SALT_ROUNDS);
        const user = userRepo.create({
            username: 'admin1',
            password: hashedPassword,
        });
        await userRepo.save(user);

        console.log('user seeded!!')
    } else {
        console.log('user already exist');
    }

    await AppDataSource.destroy();
}

seed();