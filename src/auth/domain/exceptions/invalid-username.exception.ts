import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidUserNameException extends HttpException {
    constructor() {
        super("invalid username", HttpStatus.NOT_FOUND);
    }
}