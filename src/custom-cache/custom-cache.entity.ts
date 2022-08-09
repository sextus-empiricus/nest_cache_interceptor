import {
   BaseEntity,
   Column,
   CreateDateColumn,
   Entity,
   PrimaryGeneratedColumn,
   UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CustomCache extends BaseEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   controller: string;

   @Column()
   method: string;

   @Column({
      type: 'text',
   })
   value: string;

   @CreateDateColumn()
   createdAt: Date;

   @UpdateDateColumn()
   updatedAt: Date;
}
