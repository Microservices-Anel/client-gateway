import { ArrayMinSize, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { OrderItemDto } from "./order-item.dto";

export class CreateOrderDto {

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type( () => OrderItemDto )
    items: OrderItemDto[]

    

    // Codigo de la orden vieja 
    // @IsNumber()
    // @IsPositive()
    // totalAmount: number;

    // @IsNumber()
    // @IsPositive()
    // totalItems: number;

    // @IsEnum( OrderStatusList, {
    //     message: `Possible status values are ${ OrderStatusList }`
    // })
    // @IsOptional()
    // status: OrderStatus = OrderStatus.PENDING

    // @IsBoolean()
    // @IsOptional()
    // paid: boolean = false


    
}
