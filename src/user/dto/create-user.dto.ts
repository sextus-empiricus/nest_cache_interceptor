import { CreateUserInterface } from '../../../types/user/dto';

export class CreateUserDto implements CreateUserInterface {
   email: string;
   password: string;
}
