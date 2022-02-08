import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthToken = {
  __typename?: 'AuthToken';
  token: Scalars['String'];
};

export type Conversation = {
  __typename?: 'Conversation';
  id: Scalars['ID'];
  messages: Array<Maybe<Message>>;
  participants: Array<Participant>;
};

export type CreateMessageInput = {
  content: Scalars['String'];
  conversationId: Scalars['String'];
};

/** Users genders */
export enum Gender {
  Genderfluid = 'GENDERFLUID',
  Genderqueer = 'GENDERQUEER',
  Male = 'MALE',
  Nonbinary = 'NONBINARY',
  Transgender = 'TRANSGENDER',
  Transmen = 'TRANSMEN',
  Transsexual = 'TRANSSEXUAL',
  Transwomen = 'TRANSWOMEN',
  Women = 'WOMEN',
}

export type Match = {
  __typename?: 'Match';
  conversation: Conversation;
  id: Scalars['ID'];
  matchId: Scalars['String'];
  userId: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  content?: Maybe<Scalars['String']>;
  conversationId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  sentAt?: Maybe<Scalars['String']>;
  sentBy?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createMatch: Match;
  createMessageForConversation: Conversation;
  createMessageForConversationId: Array<Message>;
  createUser: AuthToken;
  publisherMutation: Scalars['String'];
  sendMessage: Scalars['String'];
  updateUser: User;
};

export type MutationCreateMatchArgs = {
  matchId: Scalars['String'];
};

export type MutationCreateMessageForConversationArgs = {
  input: CreateMessageInput;
};

export type MutationCreateMessageForConversationIdArgs = {
  input: CreateMessageInput;
};

export type MutationCreateUserArgs = {
  phoneNumber: Scalars['String'];
};

export type MutationPublisherMutationArgs = {
  message: Scalars['String'];
};

export type MutationSendMessageArgs = {
  message: Scalars['String'];
};

export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type Participant = {
  __typename?: 'Participant';
  id: Scalars['ID'];
  userId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getAllMessages: Array<Message>;
  getConversationById: Conversation;
  getMatches: Array<Match>;
  getMessagesByConversationId: Array<Message>;
  me: User;
};

export type QueryGetConversationByIdArgs = {
  conversationId: Scalars['String'];
};

export type QueryGetMessagesByConversationIdArgs = {
  conversationId: Scalars['String'];
};

/** How the user swings */
export enum SexualOrientation {
  Asexual = 'ASEXUAL',
  Bisexual = 'BISEXUAL',
  Demisexual = 'DEMISEXUAL',
  Gay = 'GAY',
  Lesbian = 'LESBIAN',
  Pansexual = 'PANSEXUAL',
  Queer = 'QUEER',
  Questioning = 'QUESTIONING',
  Straight = 'STRAIGHT',
}

/** Who to show to the user */
export enum ShowPreference {
  Everyone = 'EVERYONE',
  Men = 'MEN',
  Women = 'WOMEN',
}

export type Subscription = {
  __typename?: 'Subscription';
  normalSubscription: Scalars['String'];
  receiveMessage: Scalars['String'];
  subscribeByConversationId: Conversation;
};

export type UpdateUserInput = {
  birthday?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Gender>;
  name?: InputMaybe<Scalars['String']>;
  school?: InputMaybe<Scalars['String']>;
  sexualOrientation?: InputMaybe<SexualOrientation>;
  showPreference?: InputMaybe<ShowPreference>;
};

/** User auth information */
export type User = {
  __typename?: 'User';
  birthday?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  gender?: Maybe<Gender>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  phoneNumber: Scalars['String'];
  school?: Maybe<Scalars['String']>;
  sexualOrientation?: Maybe<SexualOrientation>;
  showPreference?: Maybe<ShowPreference>;
  verified: Scalars['Boolean'];
};
