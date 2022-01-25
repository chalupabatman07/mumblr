import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Match extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public readonly id!: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  public userId!: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  public matchId!: string;
}
