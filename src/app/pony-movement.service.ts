import { PonyService } from './pony.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PonyMovementService {
  private mazeId;
  private mazeWidth: number;
  private mazeheight: number;
  private mazeEndPoint: number;
  private ponyPosition: number;
  mazeFigure$ = new Subject<string>();

  constructor(private ponyService: PonyService) {}

  async getPonyMovements(mazeId) {
    const mazeData = await this.ponyService.getMazeData(mazeId).toPromise();

    this.ponyPosition = mazeData.pony[0];
    this.mazeEndPoint = mazeData['end-point'][0];
    this.mazeWidth = mazeData.size[0];
    this.mazeheight = mazeData.size[1];
    this.mazeId = mazeId;
    const passedThrougDirections = [this.ponyPosition];

    const Pointsqueue = [this.ponyPosition];
    const container = {};

    // TODO
    while (Pointsqueue.length > 0) {
      const current = Pointsqueue.shift();

      if (current === this.mazeEndPoint) {
        const finalState = await this.calculateDirections(current, container);
        return finalState;
      }

      const northMove = current - this.mazeWidth;
      if (
        northMove >= 0 &&
        !mazeData.data[current].includes('north') &&
        !passedThrougDirections.includes(northMove)
      ) {
        passedThrougDirections.push(northMove);
        Pointsqueue.push(northMove);
        container[northMove] = current;
        console.log(`N ${northMove}`);
      }
      const southMove = current + this.mazeWidth;
      if (
        southMove < this.mazeheight * this.mazeWidth &&
        !mazeData.data[southMove].includes('north') &&
        !passedThrougDirections.includes(southMove)
      ) {
        passedThrougDirections.push(southMove);
        Pointsqueue.push(southMove);
        container[southMove] = current;
        console.log(`S ${southMove}`);
      }
      const eastMove = current + 1;
      if (
        eastMove % this.mazeWidth !== 0 &&
        !mazeData.data[eastMove].includes('west') &&
        !passedThrougDirections.includes(eastMove)
      ) {
        passedThrougDirections.push(eastMove);
        Pointsqueue.push(eastMove);
        container[eastMove] = current;
        console.log(`E ${eastMove}`);
      }
      const westMove = current - 1;
      if (
        current % this.mazeWidth !== 0 &&
        !mazeData.data[current].includes('west') &&
        !passedThrougDirections.includes(westMove)
      ) {
        passedThrougDirections.push(westMove);
        Pointsqueue.push(westMove);
        container[westMove] = current;
        console.log(`W ${westMove}`);
      }
    }
  }

  private async calculateDirections(currentPosition: number, container: any) {
    let newPlacePoint = this.mazeEndPoint;
    const movements = [];
    console.log('Won!!!!!!!');
    while (currentPosition !== this.ponyPosition) {
      newPlacePoint = currentPosition;
      currentPosition = container[currentPosition];

      console.log(
        `${this.ponyPosition} | ${currentPosition} | ${this.mazeEndPoint}`
      );
      if (newPlacePoint + 1 === currentPosition) {
        movements.push('west');
      } else if (newPlacePoint - 1 === currentPosition) {
        movements.push('east');
      } else if (newPlacePoint - this.mazeWidth === currentPosition) {
        movements.push('south');
      } else if (newPlacePoint + this.mazeWidth === currentPosition) {
        movements.push('north');
      }
    }
    console.log(movements.reverse());
    for (const direction of movements) {
      try {
        const res = await this.ponyService
          .ponyNextMove(this.mazeId, direction)
          .toPromise();
        const mazeFigure = await this.ponyService
          .printMaze(this.mazeId)
          .toPromise();
        this.mazeFigure$.next(mazeFigure);
        if (res.state !== 'active') {
          return res;
        }
      } catch (ex) {
        throw ex;
        // TODO handle
      }
    }
  }
}
