import { Module } from "@nestjs/common";
import { MailerRepositoryContract } from "src/mailing/domain/repositories/mailer.repository";
import { NodeMailerRepositoryImpl } from "./nodemailer.repository";

@Module({
    providers: [
        {
            provide: MailerRepositoryContract,
            useClass: NodeMailerRepositoryImpl
        }
    ],
    exports: [MailerRepositoryContract]
})
export class NodeMailerModule { }