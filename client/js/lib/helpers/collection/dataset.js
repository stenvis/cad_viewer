import Collection from "./collection.js";

class Dataset {
   #collections_list;

   constructor(collections_list) {
      this.#collections_list = collections_list;
      for (const name of collections_list)
         this[name] = new Collection(); 
   }

   get collections_list() {
      return this.#collections_list;
   }
};

export default Dataset;