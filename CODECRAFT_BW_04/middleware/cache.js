const { redisClient } = require("../config/redis.js");

const cache = (key) => async (req, res, next) => {
  try {
    const data = await redisClient.get(key);

    if (data) {
      console.log("Cache HIT");
      return res.json(JSON.parse(data));
    }

    console.log("Cache MISS");
    next();
  } catch (err) {
    next();
  }
};

module.exports = cache;
