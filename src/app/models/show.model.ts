export interface Schedule {
  time: string;
  days: string[];
}

export interface Country {
  name: string;
  code: string;
  timezone: string;
}

export interface Network {
  id: number;
  name: string;
  country: Country;
  officialSite: string | null;
}

export interface WebChannel {
  id: number;
  name: string;
  country: Country;
  officialSite: string | null;
}

export interface Externals {
  tvrage: number | null;
  thetvdb: number | null;
  imdb: string | null;
}

export interface Rating {
  average: number | null;
}

export interface Image {
  medium: string;
  original: string;
}

export interface Show {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string | null;
  genres: string[];
  status: string;
  runtime: number | null;
  averageRuntime: number | null;
  premiered: string | null;
  ended: string | null;
  officialSite: string | null;
  schedule: Schedule;
  rating: Rating;
  weight: number;
  network: Network | null;
  webChannel: WebChannel | null;
  dvdCountry: string | null;
  externals: Externals;
  image: Image | null;
  summary: string | null;
  updated: number;
  _links: { self: { href: string }; previousepisode: { href: string } };
}

export interface SearchResult {
  score: number;
  show: Show;
}

export interface ShowsResponse {
  total: number;
  page: number;
  pages: number;
}