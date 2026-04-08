const axios = require("axios");

const test = async () => {
  console.time("First Call");
  await axios.get("http://localhost:5000/users");
  console.timeEnd("First Call");

  console.time("Second Call");
  await axios.get("http://localhost:5000/users");
  console.timeEnd("Second Call");
};

test();
