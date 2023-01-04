conn = new Mongo();
db = conn.getDB('code_challenge');
db.createUser({
  user: 'root',
  pwd: 'root',
  roles: [
    {
      role: 'readWrite',
      db: 'code_challenge',
    },
  ],
});
