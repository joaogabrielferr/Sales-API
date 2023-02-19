import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

//an entity maps a class to a database table
@Entity('product')
class Product{

  @PrimaryGeneratedColumn('uuid')
  id : string;

  @Column()
  name : string;

  @Column('decimal')
  price : number;

  @Column('int')
  quantity : number;

  @CreateDateColumn()
  createdAt : Date;

  @UpdateDateColumn()
  updatedAt : Date;

}

export default Product;
