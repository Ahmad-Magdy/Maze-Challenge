import { PonyService } from './../pony.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-start-playing',
  templateUrl: './start-playing.component.html',
  styleUrls: ['./start-playing.component.css']
})
export class StartPlayingComponent implements OnInit {
  challengeLevel: number;
  ponyUserForm: FormGroup;
  // Source of the names Wikipedia
  ponyNames = [
    'Twilight Sparkle',
    'Rainbow Dash',
    'Pinkie Pie',
    'Rarity',
    'Applejack',
    'Fluttershy',
    'Spike',
    'Princess Celestia'
  ];

  constructor(private ponyService: PonyService) {}

  ngOnInit() {
    this.ponyUserForm = new FormGroup({
      ponyName: new FormControl('', [Validators.required]),
      difficulty: new FormControl('', [
        Validators.required,
        Validators.max(10),
        Validators.min(0)
      ]),
      width: new FormControl('', [
        Validators.required,
        Validators.min(15),
        Validators.max(25)
      ]),
      height: new FormControl('', [
        Validators.required,
        Validators.min(15),
        Validators.max(25)
      ])
    });
    // this.levelControl = new FormControl('', [Validators.max(100), Validators.min(0)]);
  }

  onFormSubmit() {
    console.log(this.ponyUserForm.value);
    this.ponyService.createMaze(this.ponyUserForm.value).subscribe(
      res => {
        console.log(res);
      },
      err => {
        const error = err.error;
      }
    );
  }
}
