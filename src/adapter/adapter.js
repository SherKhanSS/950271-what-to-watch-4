export const getAdaptedFilm = (film) => {
  return {
    id: film.id,
    title: film.name,
    poster: film.poster_image,
    genre: film.genre,
    year: film.released,
    runTime: film.run_time,
    cover: film.background_image,
    ratingScore: film.rating,
    ratingCount: film.scores_count,
    description: film.description,
    director: film.director,
    starring: film.starring,
    preview: film.preview_video_link,
    videoLink: film.video_link,
    isFavorite: film.is_favorite,
    backgroundColor: film.background_color,
    previewImage: film.preview_image,
  };
};


// ниже разница между моками и реальными данными, оставил пока для разработки
export const comments = [
  {
    text: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director&apos;s funniest and most exquisitely designed movies in years.`,
    author: `Kate Muir`,
    date: `2016-12-24`,
    rating: `8,9`,
  },
];

// const films = [
//   {
//     title: `The Grand Budapest Hotel`,
//     genre: `Drama`,
//     year: 2014,
//     runTime: `1h 39m`,
//     poster: `img/the-grand-budapest-hotel-poster.jpg`,
//     cover: `img/bg-the-grand-budapest-hotel.jpg`,
//     ratingScore: 8.9,
//     ratingCount: 240,
//     textPartOne: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave&apos;s friend and protege.`,
//     textPartTwo: `Gustave prides himself on providing first-className service to the hotel&apos;s guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave&apos;s lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
//     director: `Wes Andreson`,
//     starring: `Bill Murray, Edward Norton, Jude Law, Willem Dafoe and other`,
//     preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
//     comments,
//   },
// ];

// const movie = [{
//   name: `Beach`,
//   poster_image: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/beach.jpg`,
//   preview_image: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/beach.jpg`,
//   background_image: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/beach.jpg`,
//   background_color: `#EBC996`,
//   description: `Vicenarian Richard travels to Thailand and finds himself in possession of a strange map. Rumours state that it leads to a solitary beach paradise, a tropical bliss. Excited and intrigued, he sets out to find it.`,
//   rating: 3.3,
//   scores_count: 207824,
//   director: `Danny Boyle`,
//   starring: [`Leonardo DiCaprio`, `Daniel York`, `Patcharawan Patarakijjanon`],
//   run_time: 119,
//   genre: `Adventure`,
//   released: 2000,
//   id: 1,
//   is_favorite: false,
//   video_link: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
//   preview_video_link: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
// }];
