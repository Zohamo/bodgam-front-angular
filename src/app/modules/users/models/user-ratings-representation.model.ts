export class UserRatingsRepresentation {
  reception: number[];
  teaching: number[];
  liking: number[];
  humility: number[];
  honesty: number[];
  speed: number[];

  constructor() {
    this.reception = [];
    this.teaching = [];
    this.liking = [];
    this.humility = [];
    this.honesty = [];
    this.speed = [];
  }
}
