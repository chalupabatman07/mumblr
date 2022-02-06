import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';

import { Registration } from '..';

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
  @Column({ type: 'boolean', nullable: false, default: false })
  public verified!: boolean;

  @Field(type => Registration)
  @OneToOne(() => Registration, { cascade: true })
  @JoinColumn()
  public registration!: Registration;
  @RelationId((user: User) => user.registration)
  public registrationId!: string;
}
