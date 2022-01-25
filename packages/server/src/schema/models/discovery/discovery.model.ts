import { Field, ID, Int, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ShowPreference } from '../../enums';

@Entity()
@ObjectType()
export class Discovery extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public readonly id!: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  public location?: string;

  @Field(() => Int, { nullable: true })
  @Column({ type: 'integer', nullable: true })
  public distance?: number;

  @Field(type => ShowPreference, { nullable: true })
  @Column({ type: 'enum', enum: ShowPreference, nullable: true })
  public showPreference?: ShowPreference;

  @Field(() => Int, { nullable: true })
  @Column({ type: 'integer', nullable: true })
  public agePreferenceStart?: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: 'integer', nullable: true })
  public agePreferenceEnd?: number;

  @Field(() => Boolean, { nullable: true })
  @Column({ type: 'boolean', nullable: true })
  public showOnlyInAgeRange?: boolean;

  @Field(() => Boolean, { nullable: true })
  @Column({ type: 'boolean', nullable: true })
  public showGlobal?: boolean;

  @Field(() => Boolean, { nullable: true })
  @Column({ type: 'boolean', nullable: true })
  public showMe?: boolean;
}
