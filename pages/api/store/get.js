import faunadb, { query as q } from "faunadb";

export default (req, res) => {
  const adminClient = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });

  const { username } = req.query;

  if (!username) {
    res.statusCode = 400;
    res.json({ message: "A username is required" });
  }

  adminClient
    .query(
      q.Map(
        q.Paginate(q.Match(q.Index("stores_by_email"), username)),
        q.Lambda("x", q.Get(q.Var("x")))
      )
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
