import {IsString} from "class-validator";
import {IsInt} from "class-validator";

export class CreateProductDto {

    @IsString()
    readonly name: string;

    @IsString()
    readonly description: string;

    @IsInt()
    readonly price: number;

    @IsInt()
    readonly tva: number;

}