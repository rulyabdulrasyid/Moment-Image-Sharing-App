const errorHandler = (err, req, res, next) => {
  if (err.name === "ErrorNotFound") {
    res.status(401).json({ message: "Error Not Found" });
  } else {
    res.status(500).json({ message: "Insternal Server Error" });
  }
};

module.exports = errorHandler;
