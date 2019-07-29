class Cell {
  constructor(risk) {
    this.risk = risk; //1-10 scale
    this.health = 10; //0-10 scale
    this.neighbors = [];
  }

  updateHealth() {
    for (let e of this.neighbors) {
      let chance = this.risk * (10 - e.health);
      if (Math.random() * 100 < chance && this.health - pathogen.damage >= 0) {
        this.health -= pathogen.damage;
      }
    }
  }

  calcRisk() {
    return this.risk;
  }

}
