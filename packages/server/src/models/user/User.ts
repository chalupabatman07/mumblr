import { Min } from 'class-validator';
import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType({ description: 'User auth information' })
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public readonly id!: string;

  @Field(() => String)
  @Column({ type: 'varchar', unique: true })
  public email!: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  @Min(5)
  public password!: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  public phoneNumber!: string;
}
