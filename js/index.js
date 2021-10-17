import { Model } from "./model.js";
import { View } from "./view.js";
import { Controller } from "./controller.js";
import * as settings from "./settings.js"
class App {   
    constructor(storeId = "", categories = [], iconsCategoriesMap = {}){
      const instance = this.constructor.instance;
      if (instance) {
          return instance;
      }
        this.constructor.instance = this;
        this.model = new Model(storeId, categories)
        this.view = new View(iconsCategoriesMap) 
        this.controller = new Controller(this.model, this.view)
        this.model.controller = this.view.controller = this.controller
    }
    init = () => this.controller.buildIndex() 
}
  try {
    const app = new App(settings.storeId, settings.categories, settings.iconsCategoriesMap)
    app.init(); 

  } catch (error) {
     console.log(`Error:`, error.message)
  }


