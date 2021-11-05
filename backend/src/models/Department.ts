import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import User from './User';

@Entity('department')
class Department {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  /**
   *  OneToMany:
   *  você precisa fazer a referencia bidirecional apontando para as propriedades que representam suas entidades
   *  não para a coluna que representa a foreign key
   *  () => TabelaQuePretende fazer o relacionamento, tabelaQuePretende => tabelaQuePretende.TabelaAtual
   */

  /**
   * Não precisa do JoinColumn no lado da relação que tem o OneToMany, precisa apenas no ManyToOne
   */

  @OneToMany(() => User, user => user.department)
  user: User[];
}

export default Department;
