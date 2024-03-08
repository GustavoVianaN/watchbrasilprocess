import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { Movies } from "./entities/movies.entity";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";
import { MoviesController } from "./controllers/movies.controller";
import { Users } from "./entities/users.entity";
import { UsersController } from "./controllers/users.controller";

@Module({
  imports: [
    ConfigModule.forRoot(),
    /*
    KeycloakConnectModule.register({
      authServerUrl: process.env.NODEJS_KEYCLOAC_AUTO_SERVER_URL,
      "ssl-required": "external",
      resource: process.env.NODEJS_KEYCLOAC_RESOURCE,,
      "verify-token-audience": true,
      realm: process.env.NODEJS_KEYCLOAC_RELM,
      clientId: process.env.NODEJS_KEYCLOAC_CLIENT_ID,
      secret: process.env.NODEJS_KEYCLOAC_SECRET,
      'confidential-port': 0
    }),
    */
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [Movies, Users],
      synchronize: true,
    } as TypeOrmModuleOptions),
    JwtModule,
    TypeOrmModule.forFeature([Movies, Users]),
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
  ],
  controllers: [MoviesController, UsersController],
  /*
 
  providers: [
    Events,
    // This adds a global level authentication guard,
    // you can also have it scoped
    // if you like.
    //
    // Will return a 401 unauthorized when it is unable to
    // verify the JWT token or Bearer header is missing.
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    // This adds a global level resource guard, which is permissive.
    // Only controllers annotated with @Resource and 
    // methods with @Scopes
    // are handled by this guard.
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    // New in 1.1.0
    // This adds a global level role guard, which is permissive.
    // Used by `@Roles` decorator with the 
    // optional `@AllowAnyRole` decorator for allowing any
    // specified role passed.
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
  */
})
export class AppModule {}
