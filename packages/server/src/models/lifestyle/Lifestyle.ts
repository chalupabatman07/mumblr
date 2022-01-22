import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

import { Drinking, Pets, Smoking, Zodiac } from '../../enums';

@Entity()
@ObjectType()
export class Lifestyle extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public readonly id!: string;

  @Field(() => ID)
  @Column()
  // TODO: for now we are going to just be auto generating a uuid
  // but need to replace this with the actual profileId
  @Generated('uuid')
  public readonly profileId!: string;

  @Field(type => Drinking)
  @Column({ type: 'enum', enum: Drinking })
  public drinking?: Drinking;

  @Field(type => Smoking)
  @Column({ type: 'enum', enum: Smoking })
  public smoking?: Smoking;

  @Field(type => Smoking)
  @Column({ type: 'enum', enum: Smoking })
  public marijuana?: Smoking;

  @Field(type => Zodiac)
  @Column({ type: 'enum', enum: Zodiac })
  public zodiac?: Zodiac;

  @Field(type => Pets)
  @Column({ type: 'enum', enum: Pets })
  public pets?: Pets;
}
