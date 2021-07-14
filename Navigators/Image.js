const Clarifai = require("Clarifai");

const app = new Clarifai.App({
  apiKey: "ae28d77ec6ac4e719be4fc9454b0702f",
});

const handleAPI = (req, res) => {
  app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => {
    res.json(data);
  })
  .catch(err => res.status(400).json("unable to call api"));
};

const ImageHandler = (req, res, db) => {
  const { id } = req.body;

  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => res.json(entries[0]))
    .catch((err) => res.status(400).json("Unable to get entries"));
};

module.exports = {
  ImageHandler,
  handleAPI
};