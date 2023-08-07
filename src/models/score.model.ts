import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid'
import { User } from "./user.model";
import { Certificate } from "./certificate.model";

@Entity()
export class Score {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column()
    score: number

    @ManyToOne(() => User, (user) => user.scores)
    user: User

    @OneToOne(() => Certificate, (certificate) => certificate.score)
    certificate: Certificate


}