import 'reflect-metadata';

import { buildSchema, Field, ID, Int, ObjectType, Query, Resolver } from 'type-graphql';

import { data } from './data';

@ObjectType()
class Book {
  @Field(() => ID)
  id?: string;

  @Field()
  name!: string;

  @Field(() => Int)
  numPages!: number;
}

@ObjectType()
class Author {
  @Field(() => ID)
  id?: string;

  @Field()
  name!: string;

  @Field()
  company!: string;

  @Field(() => [Book])
  books!: Book[];
}

@Resolver(Author)
class SimpleResolver {
  @Query(() => [Author])
  authors() {
    return data;
  }
}

export function createTypeGraphQLSchema() {
  return buildSchema({
    resolvers: [SimpleResolver],
  });
}
