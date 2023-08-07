import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {v4 as uuid} from 'uuid'
import { User } from "./user.model";

@Entity()
export class Product {
    
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column()
    name: string

    @Column()
    product_id: string

    @Column()
    price: string

    @Column()   
    status: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @ManyToOne(()=> User, (user) => user.products)
    user: User

}