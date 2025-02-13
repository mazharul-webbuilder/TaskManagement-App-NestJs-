import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['username'])
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  /***
   * Method to hash the password before saving it to the database
   * @param password The password to hash
   */
  async validatePassword(password: string): Promise<boolean> {
    const hashedPassword = await bcrypt.hash(password, this.salt);
    return hashedPassword === this.password;
  }
}