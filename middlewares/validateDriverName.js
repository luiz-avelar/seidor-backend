const validateDriverName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    res.status(401);
    return res.json({ message: 'Missing driver name.' });
  }

  next();
};

module.exports = validateDriverName;
