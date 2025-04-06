import { IsNotEmpty } from "class-validator";

export class ImageProductDTO {
    @IsNotEmpty()
    url: string;

    @IsNotEmpty()
    description: string;
  }