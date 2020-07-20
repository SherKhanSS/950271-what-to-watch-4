export interface Film {
  backgroundColor: string,
  cover: string,
  description: string,
  director: string,
  genre: string,
  id: number,
  isFavorite: boolean,
  poster: string,
  preview: string,
  previewImage: string,
  ratingCount: number,
  ratingScore: number,
  runTime: number,
  starring: string[],
  title: string,
  videoLink: string,
  year: number,
}

export interface Review {
  id: number,
  user: {
    id: number,
    name: string,
  },
  rating: number,
  comment: string,
  date: string,
}
