import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Conversation extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public readonly id!: string;
}
