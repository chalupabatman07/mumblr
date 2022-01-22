import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Drinking, Pets, Smoking, Zodiac } from '../../enums';

@Entity()
@ObjectType()
export class Lifestyle extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public readonly id!: string;

  @Field(type => Drinking, { nullable: true })
  @Column({ type: 'enum', enum: Drinking, nullable: true })
  public drinking?: Drinking;

  @Field(type => Smoking, { nullable: true })
  @Column({ type: 'enum', enum: Smoking, nullable: true })
  public smoking?: Smoking;

  @Field(type => Smoking, { nullable: true })
  @Column({ type: 'enum', enum: Smoking, nullable: true })
  public marijuana?: Smoking;

  @Field(type => Zodiac, { nullable: true })
  @Column({ type: 'enum', enum: Zodiac, nullable: true })
  public zodiac?: Zodiac;

  @Field(type => Pets, { nullable: true })
  @Column({ type: 'enum', enum: Pets, nullable: true })
  public pets?: Pets;
}
