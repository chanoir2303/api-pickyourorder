import {IsString} from "class-validator";
import {IsInt} from "class-validator";

export class CreateOrderDto {

    @IsString()
    readonly status: string;

    @IsString()
    readonly customer: string;

    @IsString({each: true})
    readonly orderContent: string[];

    @IsInt()
    readonly totalPrice: number;

    @IsInt()
    readonly totalPaid: number;

    @IsString()
    readonly deliverSlot: string;
}
