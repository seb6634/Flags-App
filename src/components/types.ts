export type User = {
  id: number;
  email: string;
  username: string;
  password: string;
  favorites_countries: string;
  best_score: number;
  theme: string;
  avatar: string;
  score_sharing: "true" | "false";
};

export type Country = {
  name: Name;
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: Currencies;
  idd: IDD;
  capital: string[];
  population: number;
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: {
    [key: string]: string;
  };
  translations: Translations;
  latlng: number[];
  landlocked: boolean;
  area: number;
  flag: string;
  flags: Flags;
  demonyms: Demonyms;
};

export type Name = {
  common: string;
  official: string;
  nativeName: {
    [key: string]: {
      official: string;
      common: string;
    };
  };
};

export type Currencies = {
  [key: string]: {
    name: string;
    symbol: string;
  };
};

export type IDD = {
  root: string;
  suffixes: string[];
};

export type Translations = {
  [key: string]: {
    official: string;
    common: string;
  };
};

export type Demonyms = {
  [key: string]: {
    f: string;
    m: string;
  };
};

export type Flags = {
  svg: string;
  png: string;
};

//
export type GameOptions = {
  id: string;
  score: number;
  duration: number;
};

export type GameStep = {
  id: string;
  question: string;
  answers: Answer[];
};

export type Answer = {
  name: string;
  cca3: string;
};
