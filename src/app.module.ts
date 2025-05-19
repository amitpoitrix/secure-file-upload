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

@Module({
  imports: [
    BullModule.forRoot({
        connection: {
            host: 'localhost',
            port: 6379
        }
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './data/sqlite.db',
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
