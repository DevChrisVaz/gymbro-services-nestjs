import { Provider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

export default () => ({
    salt: 0
});

export const configProviders: Provider[] = [
    {
        provide: 'SALT',
        useFactory: (configService: ConfigService) => configService.get<string>('salt'),
        inject: [ConfigService]
    }
]