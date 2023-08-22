import { Provider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

export default () => ({
   algorithm:  "",
   key: "",
   iv: ""
});

export const configProviders: Provider[] = [
    {
        provide: 'ALGORITHM',
        useFactory: (configService: ConfigService) => configService.get<string>('algorithm'),
        inject: [ConfigService]
    },
    {
        provide: 'KEY',
        useFactory: (configService: ConfigService) => configService.get<string>('key'),
        inject: [ConfigService]
    },
    {
        provide: 'IV',
        useFactory: (configService: ConfigService) => configService.get<string>('iv'),
        inject: [ConfigService]
    }
]