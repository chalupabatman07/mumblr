import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType({ description: 'Users registration progress' })
export class Registration extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public readonly id!: string;

  @Field(() => Boolean)
  @Column({ type: 'boolean', nullable: false, default: false })
  public verifiedPhoneNumber!: boolean;

  @Field(() => Boolean)
  @Column({ type: 'boolean', nullable: false, default: false })
  public verifiedEmail!: boolean;

  @Field(() => Boolean)
  @Column({ type: 'boolean', nullable: false, default: false })
  public completedEmailEntry!: boolean;

  @Field(() => Boolean)
  @Column({ type: 'boolean', nullable: false, default: false })
  public completedNameEntry!: boolean;

  @Field(() => Boolean)
  @Column({ type: 'boolean', nullable: false, default: false })
  public completedBirthdayEntry!: boolean;

  @Field(() => Boolean)
  @Column({ type: 'boolean', nullable: false, default: false })
  public completedGenderEntry!: boolean;

  @Field(() => Boolean)
  @Column({ type: 'boolean', nullable: false, default: false })
  public completedOrSkippedSexualOrientationEntry!: boolean;

  @Field(() => Boolean)
  @Column({ type: 'boolean', nullable: false, default: false })
  public completedShowMeEntry!: boolean;

  @Field(() => Boolean)
  @Column({ type: 'boolean', nullable: false, default: false })
  public completedOrSkippedSchoolEntry!: boolean;

  @Field(() => Boolean)
  @Column({ type: 'boolean', nullable: false, default: false })
  public completedOrSkippedPassionsEntry!: boolean;

  @Field(() => Boolean)
  @Column({ type: 'boolean', nullable: false, default: false })
  public completedProfileAnswersEntry!: boolean;
}
