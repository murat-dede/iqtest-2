import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {v4 as uuid} from 'uuid'
import { Score } from "./score.model";
import { Product } from "./product.model";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column()
    name: string

    @Column()
    surname: string

    @Column()
    email: string

    @Column()
    phone_number:string

    @Column()
    identify_number:string

    @Column()
    country: string

    @Column()
    city: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @OneToMany(() => Score, (score) => score.user)
    scores: Score[]

    @OneToMany(() => Product, (product) => product.user)
    products: Product[]
    
}