import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get()
  findAll() {
    return this.coffeesService.findAll();
  }

  @Get('/list-res')
  findAll2(@Res() response) {
    // 使用response对象自定义响应
    // 注意：使用response对象后，Nest将不会再处理响应, 不建议使用
    response.status(200).send('This action returns all coffees');
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
    // return `This action returns a #${params.id} coffee`;
    return this.coffeesService.findOne(+params.id);
  }

  // 路由中的url参数
  @Get(':id')
  findOneCopy(@Param('id') id: string) {
    // params是所有的请求参数
    return `This action returns a #${id} coffee copy`;
  }

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

  @Get('list3')
  findAllFlavorsCopy3(@Query() pagenationDTO) {
    const { limit, offset } = pagenationDTO;
    return `limit: ${limit}, offset: ${offset}`;
  }

  // Body Params
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  // get parts from Body Params
  @Post('copy')
  createCopy(@Body('name') name: string) {
    return name;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(+id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(+id);
  }
}
