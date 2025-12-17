import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  findAll(): Coffee[] {
    return this.coffees;
  }

  findOne(id: number): Coffee {
    // throw 'a random error';
    const coffee = this.coffees.find((coffee) => coffee.id === id);
    if (!coffee) {
      /*  throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND); */
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  create(createCoffeeDto: any) {
    this.coffees.push(createCoffeeDto);
    return createCoffeeDto;
  }

  update(id: number, updatedCoffee: Partial<Coffee>) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      //   Object.assign(coffee, updatedCoffee);
    }
  }

  remove(id: number) {
    const coffeeIndex = this.coffees.findIndex((coffee) => coffee.id === id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
