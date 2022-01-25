import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Message, Participant } from '..';

@Entity()
@ObjectType()
export class Conversation extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public readonly id!: string;

  @Field(type => [Participant])
  @OneToMany(() => Participant, (participant: Participant) => participant.conversation)
  @JoinColumn()
  public participants!: Participant[];

  @Field(type => [Message], { nullable: 'items' })
  @OneToMany(() => Message, (message: Message) => message.conversationId)
  @JoinColumn()
  public messages!: Message[];
}
