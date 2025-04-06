import { IsNotEmpty } from "class-validator";

export class CharacteristicsProductDTO {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;
  }