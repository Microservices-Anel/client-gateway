import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, ORDERS_SERVICE } from 'src/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ORDERS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.ordersMicroserviceOptions.host,
          port: envs.ordersMicroserviceOptions.port
        }
      }
      
    ])
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
