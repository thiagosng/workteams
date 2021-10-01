import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('profiles')
class Profile {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;
}

export default Profile;
