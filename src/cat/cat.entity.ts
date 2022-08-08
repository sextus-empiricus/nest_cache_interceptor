import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Cat extends BaseEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   name: string;

   @Column()
   email: string;

   @Column()
   color: string;

   @Column({
      default: false,
   })
   isPies: boolean;

   @Column({
      type: 'int',
      default: 1,
   })
   level: number;

   @CreateDateColumn()
   createdAt: Date;

   @UpdateDateColumn()
   updatedAt: Date;
}