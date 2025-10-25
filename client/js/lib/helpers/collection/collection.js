class Collection {
   #objects = {};
   #keys= [];

   getObject(key) {
      return this.#objects[key];
   }

   setObject(key, object) {
      this.#objects[key] = object;
      this.#keys.push(key);
   }

   delObject(key) {
      delete this.#objects[key];
      const index = this.#keys.indexOf(key);
      this.#keys.splice(index, 1);
   }

   reset() {
      this.#objects = {};
      this.#keys = [];
   }

   setKeys(keys) {
      this.#keys = keys;
   }

   get getObjectCount() {
      return this.#keys.length; 
   }
   
   get getObjectKeys() {
      return this.#keys;
   }

   get getObjects() {
      return this.#objects;
   }
};

export default Collection;