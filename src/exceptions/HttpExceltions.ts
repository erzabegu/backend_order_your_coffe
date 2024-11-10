import {HttpException} from "./root";

export class InternalException extends HttpException {
    constructor(message: string, errors?: any) {
        super(message, 502, errors);
    }
}

export class InvalidEmailOrPasswordException extends HttpException {
    constructor(message: string) {
        super(message, 502);
    }
}

export class EntryNotFoundException extends HttpException {
    constructor(message: string) {
        super(message, 502);
    }
}

export class UnauthorizedException extends HttpException {
    constructor(message: string) {
        super(message, 502);
    }
}