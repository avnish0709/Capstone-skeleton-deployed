import Link from 'next/link';
import FavouriteButton from '../components/FavouriteButton';

const FAVOURITE_MOVIES = [
  {
    imdbID: "tt1877830",
    Title: "The Batman",
    Year: "2022",
    Poster: "https://m.media-amazon.com/images/M/MV5BMmU5NGJmZzAtMGNlZi00ODYzLTkyMzUtNjllZTg5YWMyXkeyXFqcGc@._V1_SX300.jpg",
    Type: "movie"
  },
  {
    imdbID: "tt2527338",
    Title: "Star Wars: Episode IX - The Rise of Skywalker",
    Year: "2019",
    Poster: "https://m.media-amazon.com/images/M/MV5BODg5ZTnMUTUtYThlNy00NjJjLWE0MGUtYmQ1NDgwMTUwMjQ1XkeyXFqcGc@._V1_SX300.jpg",
    Type: "movie"
  },
  {
    imdbID: "tt4154756",
    Title: "Avengers: Infinity War",
    Year: "2018",
    Poster: "https://m.media-amazon.com/images/M/MV5BMjMxNjNyMjM2M15BMl5BanBnXkFtZTgwNzY1MTU1NTM@._V1_SX300.jpg",
    Type: "movie"
  }
];

export default function FavouritesPage() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto px-4 py-8">
      {/* Header Info */}
      <section className="text-center flex flex-col gap-3 max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 dark:from-white dark:via-indigo-200 dark:to-white bg-clip-text text-transparent sm:text-5xl">
          Your Favourites
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">
          Manage your personal collection of saved movies and series
        </p>

        {/* User Badge Info */}
        <div className="mt-4 flex items-center justify-center gap-3 bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/50 rounded-2xl px-5 py-3 w-fit mx-auto shadow-sm">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Logged in as: <strong className="text-indigo-600 dark:text-indigo-400">avnish.internship@gmail.com</strong>
          </span>
          <button className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-red-200 hover:border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200">
            Logout
          </button>
        </div>
      </section>

      {/* Movies Grid */}
      <section className="mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {FAVOURITE_MOVIES.map((movie) => (
            <article key={movie.imdbID} className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
              <Link href={`/movie/${movie.imdbID}`} className="flex flex-col flex-grow">
                {/* Poster Wrapper */}
                <div className="aspect-[2/3] w-full bg-slate-100 dark:bg-slate-850 relative overflow-hidden">
                  {movie.Poster ? (
                    <img
                      src={movie.Poster}
                      alt={`${movie.Title} Poster`}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-slate-400 dark:text-slate-500">
                      <span className="text-4xl">🎬</span>
                      <span className="text-sm font-medium">No Image</span>
                    </div>
                  )}
                  <span className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-sm text-white px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider">
                    {movie.Type}
                  </span>
                </div>

                {/* Movie info area */}
                <div className="p-5 flex flex-col gap-4 flex-grow">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base line-clamp-2 min-h-[3rem] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {movie.Title}
                    </h3>
                    <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                      {movie.Year}
                    </span>
                  </div>
                </div>
              </Link>
              <div className="px-5 pb-5 mt-auto">
                <FavouriteButton initialIsFavourite={true} />
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
