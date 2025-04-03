export const gameRequestCriterias = ['popular', 'trending', 'relevant'] as const;

export type GameRequestCriteria = (typeof gameRequestCriterias)[number];

export type GameRequestSortOrder = 'ascending' | 'descending';

export type GameRequest = {
  provider?: string;
  gameName?: string;
  sortCriteria?: GameRequestCriteria;
  sortOrder?: GameRequestSortOrder;
};

export type Game = {
  id: number;
  name: string;
  provider: string;
  href?: string;
  imageURL: string;
  altName: string;
  accentColor1: string;
  accentColor2: string;
  accentColor3: string;
  popular: boolean;
  trending: boolean;
  relevant: boolean;
};
