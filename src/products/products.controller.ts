import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {

  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsCLient: ClientProxy

  ) {}

  @Post()
  createProduct(@Body() createProductDto:CreateProductDto ){
    return this.productsCLient.send({ cmd: 'create_product' }, createProductDto)
      .pipe( 
        catchError( err => {
          throw new RpcException(err)
        })
      )
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto){
    return this.productsCLient.send({ cmd: 'find_all_products' }, paginationDto)
  }

  @Get(':id')
  async findOne(@Param('id' ) id: string){

    return this.productsCLient.send({ cmd: 'find_one_product'}, { id })
      .pipe( 
        catchError( err => { 
          throw new RpcException(err)
        })
      );
    
    // try {
    //   const product = await firstValueFrom(
    //     this.productsCLient.send({ cmd: 'find_one_product'}, { id })
    //   );

    //   return product;
      
    // } catch (error) {
    //   throw new RpcException(error)
    //   // throw new BadRequestException(error)
    // }
    
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto){
    return this.productsCLient.send({ cmd: 'update_product'}, {
      id: id,
      ...updateProductDto
    })
    .pipe(
      catchError( err => {
        throw new RpcException(err)
      })
    )
  }

  @Delete(':id')
  removeProduct(@Param('id') id: string){
    return this.productsCLient.send({ cmd: 'delete_product'}, { id })
      .pipe( 
        catchError( err => {
          throw new RpcException(err)
        })
      )
  }


}
