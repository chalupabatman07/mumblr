import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

import { Gender, SexualOrientation } from '../../enums';

@Entity()
@ObjectType()
export class Profile extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public readonly id!: string;

  @Field(() => ID)
  @Column()
  // TODO: for now we are going to just be auto generating a uuid
  // but need to replace this with the actual userId
  @Generated('uuid')
  public readonly userId!: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  public aboutMe?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  public jobTitle?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  public company?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  public school?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  public livingIn?: string;

  @Field(type => Gender)
  @Column({ type: 'enum', enum: Gender })
  public gender!: Gender;

  @Field(type => SexualOrientation)
  @Column({ type: 'enum', enum: SexualOrientation })
  public sexualOrientation!: SexualOrientation;
}
