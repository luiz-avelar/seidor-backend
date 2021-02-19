const validateCreateCarInfo = (req, res, next) => {
  const { plate, color, brand } = req.body;
  if (!plate || !color || !brand) {
    res.status(401);
    return res.json({ message: 'Missing car information.' });
  }
  next();
};

module.exports = validateCreateCarInfo;
