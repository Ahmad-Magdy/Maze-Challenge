import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MazeData } from './interfaces/maze-data.interface';
import { GameState } from './interfaces/game-state.interface';

@Injectable({
  providedIn: 'root'
})
export class PonyService {
  private readonly baseURL =
    'https://ponychallenge.trustpilot.com/pony-challenge/maze';
  constructor(private http: HttpClient) {}

  createMaze({ ponyName, width, height, difficulty }) {
    return this.http.post<{ maze_id: string }>(this.baseURL, {
      'maze-width': width,
      'maze-height': height,
      'maze-player-name': ponyName,
      difficulty
    });
  }

  printMaze(mazeId: string) {
    return this.http.get(`${this.baseURL}/${mazeId}/print`, {
      responseType: 'text'
    });
  }

  getMazeData(mazeId: string) {
    return this.http.get<MazeData>(`${this.baseURL}/${mazeId}`);
  }

  ponyNextMove(mazeId: string, direction: string) {
    return this.http.post<GameState>(`${this.baseURL}/${mazeId}`, {
      direction
    });
  }


}
