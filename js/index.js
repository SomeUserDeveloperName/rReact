import { Model } from "./model.js";
import { View } from "./view.js";
import { Controller } from "./controller.js";
import * as settings from "./settings.js"
class App {   
    constructor(settings = {}){
      const instance = this.constructor.instance;
      if (instance) return instance;

        this.constructor.instance = this;
        this.model = new Model(settings)
        this.view = new View(settings) 
        this.controller = new Controller(this.model, this.view, settings)
    }
      init = () => this.controller.buildIndex() 
}
  try {
     if(Object.keys(settings).length === 0) throw new Error("Settings obj are empty, but he can't") 
      new App(settings).init()

  } catch (error) {
      alert(error)
      console.error(`Shit happens:`, error.message)
  }


