import { Body, Controller, Get, Param, Post } from '@nestjs/common';

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
  @Get(':id')
  findOne(@Param() params) {
    // params是所有的请求参数
    return `This action returns a #${params.id} coffee`;
  }

  // 路由中的url参数
  @Get(':id')
  findOneCopy(@Param('id') id: string) {
    // params是所有的请求参数
    return `This action returns a #${id} coffee copy`;
  }

  // Body Params
  @Post()
  create(@Body() body) {
    return body;
  }

  // get parts from Body Params
  @Post('/copy')
  createCopy(@Body('name') name: string) {
    return name;
  }
}
