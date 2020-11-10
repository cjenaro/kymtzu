import faunadb, { query as q } from "faunadb";

export default (req, res) => {
  const adminClient = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });

  const { username, store } = JSON.parse(req.body);

  if (!req.headers.authorization || !username) {
    res.statusCode = 401;
    res.json({ message: "Necesitas iniciar sesión" });
    return;
  }

  adminClient
    .query(
      q.Create(q.Collection("stores"), {
        data: {
          email: username,
          ...store,
        },
      })
    )
    .then((ret) => {
      res.statusCode = 201;
      res.json(ret);
    })
    .catch((err) => {
      res.statusCode = err.requestResult.statusCode;
      res.json({ message: err.description });
    });
};
