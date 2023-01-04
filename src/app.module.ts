import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ApiConfigService } from './modules/shared/services/api-config.service';
import { SharedModule } from './modules/shared/shared.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersController } from './modules/users/users.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [SharedModule],
      useFactory: async (configService: ApiConfigService) => {
        return {
          ...configService.mongooseConfig,
          connectionFactory: (connection) => {
            connection.plugin(require('mongoose-paginate-v2'));
            return connection;
          },
        };
      },
      inject: [ApiConfigService],
    }),
    UsersModule,
    AuthModule
  ],
  providers: [],
  controllers: [UsersController],
})
export class AppModule {}
