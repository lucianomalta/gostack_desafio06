import { Entity, Column, PrimaryGeneratedColumn, Timestamp, ManyToOne, JoinColumn } from 'typeorm';

import Category from './Category';

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column() 
  type: 'income' | 'outcome';

  @Column('decimal')
  value: number;

  @ManyToOne( () => Category)
  @JoinColumn({name: 'category_id'})
  category: Category

  @Column()
  category_id: string;

  @Column('timestamp')
  created_at: Date;

  @Column('timestamp')
  updated_at: Date;

  // constructor({ title, value, type, category_id }: Omit<Transaction, 'id'>) {
  //   this.id = uuid();
  //   this.title = title;
  //   this.value = value;
  //   this.type = type;
  //   this.category_id = category_id;
  // }  
}

export default Transaction;
