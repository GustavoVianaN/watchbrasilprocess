"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const movies_entity_1 = require("./entities/movies.entity");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const movies_controller_1 = require("./controllers/movies.controller");
const users_entity_1 = require("./entities/users.entity");
const users_controller_1 = require("./controllers/users.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: process.env.TYPEORM_CONNECTION,
                host: process.env.TYPEORM_HOST,
                port: process.env.TYPEORM_PORT,
                username: process.env.TYPEORM_USERNAME,
                password: process.env.TYPEORM_PASSWORD,
                database: process.env.TYPEORM_DATABASE,
                entities: [movies_entity_1.Movies, users_entity_1.Users],
                synchronize: true,
            }),
            jwt_1.JwtModule,
            typeorm_1.TypeOrmModule.forFeature([movies_entity_1.Movies, users_entity_1.Users]),
            axios_1.HttpModule,
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
            }),
        ],
        controllers: [movies_controller_1.MoviesController, users_controller_1.UsersController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map