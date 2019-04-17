const AuthorDAO = require('../dao/AuthorDAO');

exports.create = async (req, res) => {
  try {
    const { id } = await AuthorDAO.create(req.body);

    return res
      .status(201)
      .json({
        id,
      })
      .send();
  } catch (err) {
    const { errors, message } = err;

    let status = 500;

    const hasFieldErrors = Object.keys(errors).length > 0;

    if (hasFieldErrors) {
      status = 400;
    }

    return res.status(status).send({ message });
  }
};

exports.read = async (req, res) => {
  try {
    const authors = await AuthorDAO.read();

    return res
      .status(200)
      .json({ authors })
      .send();
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.readById = async (req, res) => {
  try {
    const { id } = req.params;

    const author = await AuthorDAO.readById(id);

    if (!author) {
      return res
        .status(404)
        .json({
          message: 'Author not found',
        })
        .send();
    }

    return res
      .status(200)
      .json({ author })
      .send();
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    const author = await AuthorDAO.update(id, { ...req.body });

    if (!author) {
      return res.status(404).send({ message: 'Author not found' });
    }

    return res.status(200).send({ author });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};