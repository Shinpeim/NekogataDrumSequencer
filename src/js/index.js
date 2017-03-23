class Hello {
  constructor() {
    this.world = "world";
  }

  say() {
    const h = (hello) =>  {
      console.log(hello + " " + this.world);
    }
    h("hello");
  }
}

const h = new Hello();
h.say();
