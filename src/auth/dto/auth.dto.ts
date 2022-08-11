import { RegisterInterface } from '../../../types/auth';

export class RegisterDto implements RegisterInterface {
   email: string;
   password: string;
}
