import { Field, Int, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Message extends BaseEntity {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn('increment')
  public readonly id?: number;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar' })
  public conversationId?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar' })
  public sentBy?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar' })
  public content?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'timestamp without time zone' })
  public sentAt?: string;
}
