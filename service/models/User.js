import DAO from '../DataAccess/DAO';

export class User extends DAO {
  constructor(name, url, record, rating) {
    this.name = name;
    this.imageUrl = url;
    this.record = record;
    this.rating = rating;
  }

  save() {
    // write me
  }
}