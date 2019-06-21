import Database from '../../lib/Database';
const db = new Database();

const createUser = async (req) => {
  const { body } = req;
  if (Object.keys(body).length === 0) { throw new MALFORMED_JSON_ERROR(); }

  const key = `${body.name}`;

  try {
    await db.get(`${playerKeyPrefix}${key}`);

    return { message: 'User already exists' };
  } catch (e) {
    console.log('creating new user', body.name);
  }

  try {
    if (body.image) {
      const imageKey = `${imagePrefix}${body.avatar}`;
      await db.saveImage(imageKey, body.image)
    }

    const newUser = {
      ...body,
      record: { "wins": 0, "losses": 0 },
      rating: 0,
    }

    delete newUser.image;
    await db.save(playerKeyPrefix, key, newUser);
    
    return { message: 'Success' };
  } catch (e) {
    return { message: 'some error. the put failed' }
  }
}

export default createUser;
