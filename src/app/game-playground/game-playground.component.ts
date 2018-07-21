import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-game-playground',
  templateUrl: './game-playground.component.html',
  styleUrls: ['./game-playground.component.css']
})
export class GamePlaygroundComponent implements OnInit {
  @Input() mazeId: string;
  constructor() {}

  ngOnInit() {
    console.log(this.mazeId);
  }
}
