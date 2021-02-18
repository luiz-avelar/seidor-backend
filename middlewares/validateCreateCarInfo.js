const validateCreateCarInfo = (req, res, next) => {
  const { plate, color, brand } = req.body;
  if (!plate || !color || !brand) {
    return res.status(400).json({ message: 'Missing car information.' });
  }
  next();
};

module.exports = validateCreateCarInfo;
