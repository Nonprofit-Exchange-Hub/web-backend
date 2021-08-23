import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column('text')
    first_name: string;
  
    @Column('text')
    last_name: string;
  
    @Column({type:'text', unique: true})
    email: string;

    @Column('boolean')
    accept_terms: boolean;
  
    @Column('text')
    password: string;
}
