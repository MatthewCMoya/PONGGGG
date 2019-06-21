import DAO from '../DataAccess/DAO';

export class User extends DAO {
  static async getByNameOrFail(name) {
    const user = await DAO.getOrFail(name);
    const { name, imageUrl, record, time } = user;

    return new User(name, imageUrl, record, time);
  }

  constructor(name, url, record, rating) {
    this.name = name;
    this.imageUrl = url;
    this.record = record;
    this.rating = rating;
  }

  adjustRecord(winner, rating) {
    const recordKey = winner ? 'wins' : 'losses';
    ++this.record[recordKey];
    this.rating = rating;
  }

  async save() {
    await super.save(this);
  }
}
