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

export type CreateProfileInput = {
  aboutMe?: InputMaybe<Scalars['String']>;
  age: Scalars['Int'];
  company?: InputMaybe<Scalars['String']>;
  gender: Gender;
  jobTitle?: InputMaybe<Scalars['String']>;
  livingIn?: InputMaybe<Scalars['String']>;
  school?: InputMaybe<Scalars['String']>;
  sexualOrientation: SexualOrientation;
};

export type Discovery = {
  __typename?: 'Discovery';
  agePreferenceEnd?: Maybe<Scalars['Int']>;
  agePreferenceStart?: Maybe<Scalars['Int']>;
  distance?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  location?: Maybe<Scalars['String']>;
  showGlobal?: Maybe<Scalars['Boolean']>;
  showMe?: Maybe<Scalars['Boolean']>;
  showOnlyInAgeRange?: Maybe<Scalars['Boolean']>;
  showPreference?: Maybe<ShowPreference>;
};

/** Does the user drink */
export enum Drinking {
  Drinker = 'DRINKER',
  Nondrinker = 'NONDRINKER',
  SocialDrinker = 'SOCIAL_DRINKER',
}

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

export type Lifestyle = {
  __typename?: 'Lifestyle';
  drinking?: Maybe<Drinking>;
  id: Scalars['ID'];
  marijuana?: Maybe<Smoking>;
  pets?: Maybe<Pets>;
  smoking?: Maybe<Smoking>;
  zodiac?: Maybe<Zodiac>;
};

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
  createProfile: Profile;
  publisherMutation: Scalars['String'];
  sendMessage: Scalars['String'];
  updateDiscovery: Discovery;
  updateLifestyle: Lifestyle;
  updateProfile: Profile;
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

export type MutationCreateProfileArgs = {
  input: CreateProfileInput;
};

export type MutationPublisherMutationArgs = {
  message: Scalars['String'];
};

export type MutationSendMessageArgs = {
  message: Scalars['String'];
};

export type MutationUpdateDiscoveryArgs = {
  input: UpdateDiscoveryInput;
};

export type MutationUpdateLifestyleArgs = {
  input: UpdateLifestyleInput;
};

export type MutationUpdateProfileArgs = {
  input: UpdateProfileInput;
};

export type Participant = {
  __typename?: 'Participant';
  id: Scalars['ID'];
  userId: Scalars['String'];
};

/** Pets that users can have */
export enum Pets {
  AllPets = 'ALL_PETS',
  Bird = 'BIRD',
  Cat = 'CAT',
  Dog = 'DOG',
  Fish = 'FISH',
  PetFree = 'PET_FREE',
  Reptile = 'REPTILE',
}

export type Profile = {
  __typename?: 'Profile';
  aboutMe?: Maybe<Scalars['String']>;
  age: Scalars['Int'];
  company?: Maybe<Scalars['String']>;
  discovery: Discovery;
  gender: Gender;
  id: Scalars['ID'];
  jobTitle?: Maybe<Scalars['String']>;
  lifestyle: Lifestyle;
  livingIn?: Maybe<Scalars['String']>;
  school?: Maybe<Scalars['String']>;
  sexualOrientation: SexualOrientation;
  userId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  getAllMessages: Array<Message>;
  getConversationById: Conversation;
  getDiscoveries: Array<Discovery>;
  getLifestyles: Array<Lifestyle>;
  getMatches: Array<Match>;
  getMessagesByConversationId: Array<Message>;
  getProfile: Array<Profile>;
  me: User;
  myProfile: Profile;
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

/** Does the user smoke? */
export enum Smoking {
  Nonsmoker = 'NONSMOKER',
  Smoker = 'SMOKER',
  SmokerWhileDrinking = 'SMOKER_WHILE_DRINKING',
  SocialSmoker = 'SOCIAL_SMOKER',
}

export type Subscription = {
  __typename?: 'Subscription';
  normalSubscription: Scalars['String'];
  receiveMessage: Scalars['String'];
  subscribeByConversationId: Conversation;
};

export type UpdateDiscoveryInput = {
  agePreferenceEnd: Scalars['Int'];
  agePreferenceStart: Scalars['Int'];
  discoveryId: Scalars['String'];
  distance: Scalars['Int'];
  location: Scalars['String'];
  showGlobal: Scalars['Boolean'];
  showMe: Scalars['Boolean'];
  showOnlyInAgeRange: Scalars['Boolean'];
  showPreference: ShowPreference;
};

export type UpdateLifestyleInput = {
  drinking?: InputMaybe<Drinking>;
  lifestyleId: Scalars['String'];
  marijuana?: InputMaybe<Smoking>;
  pets?: InputMaybe<Pets>;
  smoking?: InputMaybe<Smoking>;
  zodiac?: InputMaybe<Zodiac>;
};

export type UpdateProfileInput = {
  aboutMe?: InputMaybe<Scalars['String']>;
  company?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Gender>;
  jobTitle?: InputMaybe<Scalars['String']>;
  livingIn?: InputMaybe<Scalars['String']>;
  profileId: Scalars['String'];
  school?: InputMaybe<Scalars['String']>;
  sexualOrientation?: InputMaybe<SexualOrientation>;
};

/** User auth information */
export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  phoneNumber: Scalars['String'];
};

/** The zodiac belt signs */
export enum Zodiac {
  Aquarius = 'AQUARIUS',
  Aries = 'ARIES',
  Cancer = 'CANCER',
  Capricorn = 'CAPRICORN',
  Gemini = 'GEMINI',
  Leo = 'LEO',
  Libra = 'LIBRA',
  Pisces = 'PISCES',
  Sagittarius = 'SAGITTARIUS',
  Scorpio = 'SCORPIO',
  Taurus = 'TAURUS',
  Virgo = 'VIRGO',
}
