import { DataSource } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { User } from "./src/users/user.entity";
import { File } from './src/file/file.entity';

const SALT_ROUNDS = 10;

const AppDataSource = new DataSource({
    type: 'sqlite',
    database: './data/sqlite.db',
    entities: [User, File],
    synchronize: true,
});

async function seed() {
    await AppDataSource.initialize();

    const userRepo = AppDataSource.getRepository(User);
    const existing = await userRepo.findOneBy({ email: "test@example.com" });

    if(!existing) {
        const hashedPassword = await bcrypt.hash('password', SALT_ROUNDS);
        const user = userRepo.create({
            email: 'test@example.com',
            password: hashedPassword,
        });
        await userRepo.save(user);

        console.log('user seeded!!')
    } else {
        console.log('user already exist');
    }

    await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error('Seed failed', err);
});