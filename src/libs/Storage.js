import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Storage {
  static instance = new Storage();

  async store(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.log('Storage error');
      throw Error(e);
    }
  }

  async get(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      return JSON.parse(value);
    } catch (e) {
      console.log('Storage error');
      throw Error(e);
    }
  }

  async getAllKeys() {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (e) {
      console.log('Storage error');
      throw Error(e);
    }
  }

  async multiGet(keys) {
    try {
      return await AsyncStorage.multiGet(keys);
    } catch (e) {
      console.log('Storage error');
      throw Error(e);
    }
  }

  async remove(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.log('Storage error');
      throw Error(e);
    }
  }
}
