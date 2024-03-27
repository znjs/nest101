import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }
  getOne(movieId: string): Movie {
    const movie = this.movies.find((movie) => movie?.id === +movieId);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${movieId} not found.`);
    }
    return movie;
  }

  deleteOne(id: string) {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== +id);
  }

  create(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
    return {
      message: 'Movie created successfully',
    };
  }

  update(movieId, movieData) {
    const movie = this.getOne(movieId);
    this.deleteOne(movieId);
    this.movies.push({ ...movie, ...movieData });
    return {
      message: 'Movie updated successfully',
    };
  }
}
