import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get('')
  findAll() {
    return 'This action returns all coffees';
  }

  // 设置url的子路径
  @Get('flavors')
  findAllCopy() {
    return 'This action returns all coffees ,flavors';
  }

  // 路由中的url参数
  /*   @Get(':id')
  findOne(@Param() params) {
    // params是所有的请求参数
    return `This action returns a #${params.id} coffee`;
  }

  // 路由中的url参数
  @Get(':id')
  findOneCopy(@Param('id') id: string) {
    // params是所有的请求参数
    return `This action returns a #${id} coffee copy`;
  } */

  // Query Params
  @Get('list1')
  findAllFlavors(@Query() paginationQuery) {
    return paginationQuery;
  }

  // Get parts from Query Params
  @Get('list2')
  findAllFlavorsCopy(@Query('page') page, @Query('size') size) {
    return { page, size };
  }

  // Body Params
  @Post()
  create(@Body() body) {
    return body;
  }

  // get parts from Body Params
  @Post('copy')
  createCopy(@Body('name') name: string) {
    return name;
  }
}
