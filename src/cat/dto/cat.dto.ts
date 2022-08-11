import { CreateCatInterface } from '../../../types/cat/dto';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateCatDto implements CreateCatInterface {
   @IsString()
   color: string;

   @IsString()
   email: string;

   @IsBoolean()
   isPies: boolean;

   @IsNumber()
   level: number;

   @IsString()
   name: string;
}
