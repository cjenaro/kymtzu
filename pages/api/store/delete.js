// import faunadb, { query as q } from "faunadb";

// export default (req, res) => {
//   const adminClient = new faunadb.Client({
//     secret: process.env.FAUNADB_SERVER_SECRET,
//   });

//   const { username, password } = JSON.parse(req.body);

//   adminClient
//     .query(
//       q.Create(q.Collection("users"), {
//         credentials: { password },
//         data: {
//           email: username,
//         },
//       })
//         q.Delete(q.Collection("stores"), {
//             data: {

//             }
//         })
//     )
//     .then((ret) => {
//       res.statusCode = 201;
//       res.json(ret);
//     })
//     .catch((err) => {
//       res.statusCode = err.requestResult.statusCode;
//       res.json({ message: err.description });
//     });
// };
