import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'auth/auth.module';
import { UsersModule } from 'users/users.module';
import { QueueModule } from 'queue/queue.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './data/sqlite.db',
      entities: [__dirname + '/**/*.entity.{ts,js}'],
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
