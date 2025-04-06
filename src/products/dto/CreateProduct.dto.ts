import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsPositive, MaxLength, Min, ValidateNested } from "class-validator";
import { ImageProductDTO } from "./ImageProduct.dto";
import { Type } from "class-transformer";
import { CharacteristicsProductDTO } from "./CharacteristicsProduts.dto";

export class CreateProductDTO {
  @IsNotEmpty()
  name: string;

  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 2 })
  value: number;

  @Min(0)
  quantity: number;

  @IsNotEmpty()
  @MaxLength(1000)
  description: string;

  @IsArray()
  @ValidateNested()
  @ArrayMinSize(1)
  @Type(() => CharacteristicsProductDTO)
  characteristics: CharacteristicsProductDTO[];

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => ImageProductDTO)
  images: ImageProductDTO[];

  @IsNotEmpty()
  categories: string;
}
