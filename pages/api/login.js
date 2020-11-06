import faunadb, { query as q } from "faunadb";

export default (req, res) => {
  const adminClient = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });

  const { username, password } = JSON.parse(req.body);

  adminClient
    .query(
      q.Login(q.Match(q.Index("users_by_email"), username), {
        password,
      })
    )
    .then((ret) => {
      res.statusCode = 200;
      res.json(ret);
    })
    .catch((err) => {
      res.statusCode = err.requestResult.statusCode;
      res.json({ message: err.description });
    });
};
