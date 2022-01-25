import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';

import { Conversation } from '..';

@Entity()
@ObjectType()
export class Participant extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public readonly id!: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  public userId!: string;

  @ManyToOne(type => Conversation)
  @JoinColumn()
  public conversation!: Conversation;
  @RelationId((participant: Participant) => participant.conversation)
  public conversationId!: string;
}
