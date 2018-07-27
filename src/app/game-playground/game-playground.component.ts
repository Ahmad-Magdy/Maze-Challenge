import { GameState } from './../interfaces/game-state.interface';
import { PonyMovementService } from './../pony-movement.service';
import { PonyService } from './../pony.service';
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  HostListener
} from '@angular/core';
import { MazeData } from '../interfaces/maze-data.interface';

@Component({
  selector: 'app-game-playground',
  templateUrl: './game-playground.component.html',
  styleUrls: ['./game-playground.component.css']
})
export class GamePlaygroundComponent implements OnInit {
  @Input() mazeId: string;
  mazeInText: string;
  finalState: GameState;

  @HostListener('document:keyup', ['$event'])
  handleKeyBoardKey(event: KeyboardEvent) {
    let direction: string;
    switch (event.code) {
      case 'ArrowUp':
        direction = 'north';
        break;
      case 'ArrowDown':
        direction = 'south';
        break;
      case 'ArrowRight':
        direction = 'east';
        break;
      case 'ArrowLeft':
        direction = 'west';
        break;
      default:
        break;
    }
    this.handleMovements(direction);
    console.log(event);
  }

  constructor(
    private ponyService: PonyService,
    private ponyMovementService: PonyMovementService
  ) {}

  ngOnInit() {
    console.log(this.mazeId);

    this.ponyMovementService.mazeFigure$.subscribe(
      res => (this.mazeInText = res)
    );

    this.reLoadMaze();
  }

  handleMovements(direction: string) {
    this.ponyService.ponyNextMove(this.mazeId, direction).subscribe(
      res => {
        // TODO handle
        if (res.state === 'won') {
        } else if (res.state === 'over') {
        }
        this.reLoadMaze();
      },
      err => {
        const error = err.error;
      }
    );
  }

  moveNext(direction: string) {
    this.ponyService.ponyNextMove(this.mazeId, direction).subscribe(res => {
      console.log(res);
    });
  }

  reLoadMaze() {
    this.ponyService.printMaze(this.mazeId).subscribe(res => {
      this.mazeInText = res;
      this.ponyService.getMazeData(this.mazeId).subscribe(mazeData => {
        console.log(
          `${mazeData.pony[0]} | ${mazeData.data[mazeData.pony[0]]} | ${
            mazeData.data[mazeData.pony[0] + 1]
          } | ${mazeData.data[mazeData.pony[0] + mazeData.size[0]]}`
        );
      });
    });
  }

  async autoPlay() {
    const finalState = await this.ponyMovementService.getPonyMovements(
      this.mazeId
    );
    this.finalState = finalState;
    // if (finalState.state === 'won') {
    //   const finalState =
    //   const finalImage = finalState['hidden-url'];
    //   // won // https://ponychallenge.trustpilot.com/eW91X3NhdmVkX3RoZV9wb255.jpg
    //   // over // /eW91X2tpbGxlZF90aGVfcG9ueQ==.jpg
    // }
  }
}
