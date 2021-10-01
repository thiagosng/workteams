import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('accounts')
class Accounts {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  initialBalance: number;

  @Column()
  initialBalanceAt: number;

  @Column()
  active: number;

  @Column()
  createdBy: number;

  @CreateDateColumn()
  createdAt: Date;
}

export default Accounts;
