import { ConfigModule } from "@nestjs/config";

export default ConfigModule.forRoot({
    envFilePath: '.development.env',
    isGlobal: true
});