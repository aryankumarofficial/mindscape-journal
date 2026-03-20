import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, _value: string) {
      return Promise.resolve();
    },
    removeItem(_key:string) {
      return Promise.resolve();
    }
  }
}

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

export default storage;
