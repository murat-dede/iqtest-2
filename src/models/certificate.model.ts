import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid'
import { Score } from "./score.model";

@Entity()
export class Certificate {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column({nullable: true})
    description: string

    @OneToOne(() => Score, (score) => score.certificate)
    @JoinColumn()
    score: Score
}