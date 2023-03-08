import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("products")
export class Product {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  weight: number;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    default: () => 'CURRENT_TIMESTAMP'
  })
  createAt: Date;

  @CreateDateColumn({
    name: "updated_at",
    type: "timestamp",
    default: () => 'CURRENT_TIMESTAMP'
  })
  updatedAt: Date;

  constructor() {
    if(!this.id) {
      this.id = uuid()
    }
  }
}
