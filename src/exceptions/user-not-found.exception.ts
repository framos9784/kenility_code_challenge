import { NotAcceptableException } from '@nestjs/common';

export class UserNotFoundException extends NotAcceptableException {
    constructor(error?: string) {
        super('error.user_not_found', error);
    }
}
