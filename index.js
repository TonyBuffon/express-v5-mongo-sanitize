/**
 * Recursively sanitizes an object by removing keys that start with `$` or contain `.`
 * This protects against MongoDB operator injection (e.g., { $gt: "" })
 */
function sanitize(obj) {
  if (Array.isArray(obj)) {
    return obj.map(sanitize);
  } else if (obj !== null && typeof obj === "object") {
    const cleanObj = {};
    for (const key in obj) {
      if (!key.startsWith("$") && !key.includes(".")) {
        cleanObj[key] = sanitize(obj[key]);
      }
    }
    return cleanObj;
  }
  return obj;
}

/**
 * Express middleware to sanitize req.body, req.query, and req.params
 */
function sanitizeMongoInput(req, res, next) {
  req.body = sanitize(req.body);
  req.query = sanitize(req.query);
  req.params = sanitize(req.params);
  req.headers = sanitize(req.headers);
  next();
}

module.exports = {
  sanitizeMongoInput,
};
