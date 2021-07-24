const fetch = require("node-fetch");

exports.handler = async (event, context, callback) => {
  let location = event.body;

  location = location.split('"');
  console.log("++++++++++", event.body);
  let offset = location[6].substring(1).slice(0, -1);

  if (offset > 1000) {
    offset = 980;
  }
  if (offset < 1000) {
    offset = offset - 20;
  }
  console.log(offset);

  const YELP = "https://api.yelp.com/v3/businesses";
  const ENDPOINT = `${YELP}/search?term=parking&location=${location[3]}&sort_by=rating&offset=${offset}`;

  const API_KEY = process.env.YELP_API_KEY;

  const raw_data = await fetch(ENDPOINT, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      Origin: "localhost",
      withCredentials: true,
    },
  });

  let data = await raw_data.json();
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(data),
  });
};
