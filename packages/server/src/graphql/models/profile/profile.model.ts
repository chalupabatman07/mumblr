import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';

import { Gender, SexualOrientation } from '../../enums';
import { Lifestyle } from '..';

@Entity()
@ObjectType()
export class Profile extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public readonly id!: string;

  @Field(() => ID)
  @Column()
  public userId!: string;

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

  @Field(type => Lifestyle)
  @OneToOne(() => Lifestyle, { cascade: true })
  @JoinColumn()
  lifestyle!: Lifestyle;
  @RelationId((profile: Profile) => profile.lifestyle)
  lifestyleId!: string;
}
