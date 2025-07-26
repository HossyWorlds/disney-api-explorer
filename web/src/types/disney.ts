export interface Character {
  _id: number;
  name: string;
  imageUrl: string;
  films: string[];
  shortFilms: string[];
  tvShows: string[];
  videoGames: string[];
  parkAttractions: string[];
  allies: string[];
  enemies: string[];
  sourceUrl: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  info: {
    count: number;
    totalPages?: number;
    previousPage?: string;
    nextPage?: string;
  };
  data: T;
}
