<<<<<<< HEAD
import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ORDERS_SERVICE } from 'src/config';
import { catchError } from 'rxjs';
=======
import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe, Query, Patch } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ORDERS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';
import { OrderPaginationDto, StatusDto } from './dto';
>>>>>>> fb8fa3fcd3c3803077f1cb96441938c61000bc33

@Controller('orders')
export class OrdersController {
  constructor(
<<<<<<< HEAD
    @Inject(ORDERS_SERVICE ) private readonly ordersClient: ClientProxy,
=======
    @Inject(ORDERS_SERVICE) private readonly ordersClient: ClientProxy
>>>>>>> fb8fa3fcd3c3803077f1cb96441938c61000bc33
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('createOrder', createOrderDto)
      .pipe(
        catchError( err => {
          throw new RpcException(err)
        })
      )
  }

  @Get()
<<<<<<< HEAD
  findAll() {
    return this.ordersClient.send('findAllOrders', {})
=======
  findAll(@Query() paginationDto: OrderPaginationDto) {
    return this.ordersClient.send('findAllOrders', paginationDto)
>>>>>>> fb8fa3fcd3c3803077f1cb96441938c61000bc33
    .pipe(
      catchError( err => {
        throw new RpcException(err)
      })
    )
  }

<<<<<<< HEAD
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersClient.send('findOneOrder', { id })
    .pipe(
      catchError( err => {
        throw new RpcException(err)
      })
    )
  }

=======
  @Get('id/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersClient.send('findOneOrder', { id })
      .pipe(
        catchError( err => {
          throw new RpcException(err)
        })
      )
  }

  @Get(':status')
  findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto
  ) {

    return this.ordersClient.send('findAllOrders', { 
      ...paginationDto,
      status: statusDto.status
     })
      .pipe(
        catchError( err => {
          throw new RpcException(err)
        })
      )
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto
  ){
    return this.ordersClient.send('changeOrderStatus', { 
      id,
      status: statusDto.status
     })
      .pipe(
        catchError( err => {
          throw new RpcException(err)
        })
      )
  }


>>>>>>> fb8fa3fcd3c3803077f1cb96441938c61000bc33
}
