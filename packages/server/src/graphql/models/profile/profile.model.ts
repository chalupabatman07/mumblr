import { Field, ID, Int, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';

import { Gender, SexualOrientation } from '../../enums';
import { Discovery, Lifestyle } from '..';

@Entity()
@ObjectType()
export class Profile extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public readonly id!: string;

  @Field(() => ID)
  @Column()
  public userId!: string;

  @Field(() => Int)
  @Column({ type: 'integer' })
  public age!: number;

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
  public lifestyle!: Lifestyle;
  @RelationId((profile: Profile) => profile.lifestyle)
  public lifestyleId!: string;

  @Field(type => Discovery)
  @OneToOne(() => Discovery, { cascade: true })
  @JoinColumn()
  public discovery!: Discovery;
  @RelationId((profile: Profile) => profile.discovery)
  public discoveryId!: string;
}
