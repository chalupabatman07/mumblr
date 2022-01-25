import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';

import { Conversation } from '..';

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

  @Field(type => Conversation)
  @OneToOne(() => Conversation, { cascade: true })
  @JoinColumn()
  public conversation!: Conversation;
  @RelationId((match: Match) => match.conversation)
  public conversationId!: string;
}
