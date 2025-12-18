import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity() // sql用小写命名表coffee
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column({ default: 0 })
  recommendations: number;

  // @Column('json', { nullable: true })
  @JoinTable() // 表示该表是主表
  @ManyToMany((type) => Flavor, (falvor) => falvor.coffees, {
    cascade: true, // 级联操作
  })
  flavors: Flavor[];
}
