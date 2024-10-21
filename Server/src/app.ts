import { AuthModule, ChatModule, UserModule } from '@modules';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { cwd } from 'process';
import { PrismaModule } from './prisma';

@Module({
  imports: [
    ChatModule,
    AuthModule,
    UserModule,
    ServeStaticModule.forRoot({
      rootPath: join(cwd(), 'src', 'client'),
      serveRoot:'/static'
    }),
    PrismaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
