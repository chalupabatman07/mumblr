import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType({ description: 'User auth information' })
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public readonly id!: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', unique: true, nullable: true })
  public email?: string;

  @Field(() => String)
  @Column({ type: 'varchar', unique: true })
  public phoneNumber!: string;

  @Field(() => Boolean)
  @Column({ type: 'boolean', nullable: false })
  public numberVerified!: boolean;

  @Field(() => Boolean)
  @Column({ type: 'boolean', nullable: false })
  public emailVerified!: boolean;
}
