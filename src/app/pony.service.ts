import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PonyService {
  private baseURL = 'https://ponychallenge.trustpilot.com/pony-challenge/maze';
  constructor(private http: HttpClient) {}

  createMaze({ ponyName, width, height, difficulty }) {
    return this.http.post(this.baseURL, {
      'maze-width': width,
      'maze-height': height,
      'maze-player-name': ponyName,
      difficulty
    });
  }
}
