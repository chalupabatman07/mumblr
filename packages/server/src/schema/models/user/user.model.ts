import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Gender, SexualOrientation, ShowPreference } from '../../enums';

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

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  public name?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  public birthday?: string;

  @Field(type => Gender, { nullable: true })
  @Column({ type: 'enum', enum: Gender, nullable: true })
  public gender?: Gender;

  @Field(type => SexualOrientation, { nullable: true })
  @Column({ type: 'enum', enum: SexualOrientation, nullable: true })
  public sexualOrientation?: SexualOrientation;

  @Field(type => ShowPreference, { nullable: true })
  @Column({ type: 'enum', enum: ShowPreference, nullable: true })
  public showPreference?: ShowPreference;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  public school?: string;
}
