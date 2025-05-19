import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'auth/auth.module';
import { UsersModule } from 'users/users.module';
import { QueueModule } from 'queue/queue.module';
import { FileModule } from './file/file.module';
import { User } from 'user/user.entity';
import { File } from './file/file.entity';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRoot({
        connection: {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT),
        }
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DATABASE_PATH,
      entities: [User, File],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    FileModule,
    QueueModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
