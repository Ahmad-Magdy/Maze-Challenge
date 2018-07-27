import { GameState } from './game-state.interface';

export interface MazeData {
  pony: number;
  domokun: number;
  'end-point': number;
  size: number[];
  difficulty: number;
  maze_id: string;
  'game-state': GameState;
  data: string[][];
}
