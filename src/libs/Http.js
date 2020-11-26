export default class Http {
  static instance = new Http();

  async get(url) {
    try {
      return await (await fetch(url)).json();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async post(url, body) {
    try {
      return await (
        await fetch(url, {
          method: 'POST',
          body,
        })
      ).json();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
