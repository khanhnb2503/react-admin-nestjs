import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { FireormModule } from 'nestjs-fireorm';
import { AccessControlModule } from 'nest-access-control';

import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { loggerConfig } from 'src/common/logger.helper';
import { AppController } from './app.controller';
import configuration from 'src/config/configuration';
import { AppService } from './app.service';
import { GroupsModule } from '../groups/groups.module';
import { PermissionsModule } from '../permissions/permissions.module';
import { roles } from 'src/roles/app.role';
import { AccesscontrolModule } from '../accessControl/access-control.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', 'public'),
    }),
    AccessControlModule.forRoles(roles),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        loggerConfig(
          process.env.NODE_ENV,
          configService.get('logger.autoLogging'),
        ),
    }),
    FireormModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        firestoreSettings: {
          projectId: configService.get<string>('firebase.projectId'),
          credentials: {
            client_email: configService.get<string>('firebase.clientEmail'),
            private_key: configService
              .get<string>('firebase.privateKey')
              .replace(/\\n/g, '\n'),
          },
          ignoreUndefinedProperties: true,
        },
        fireormSettings: {
          validateModels: true,
        },
      }),
    }),
    UsersModule,
    AuthModule,
		GroupsModule,
		PermissionsModule,
    // AccesscontrolModule
  ],
  controllers: [AppController],
  providers: [
		AppService,
	],
})
export class AppModule {}
