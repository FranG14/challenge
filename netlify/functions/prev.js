const fetch = require("node-fetch");

exports.handler = async (event, context, callback) => {
  // const url = event.headers.referer;
  // //console.log(url);

  // const qs = new URL(url);
  // //console.log(qs);

  // const pathname = qs.pathname;
  // // const term = qs.searchParams.get('term');
  let location = event.body;
  //   let offset = event.body;
  //console.log(pathname);
  //console.log(term);
  location = location.split('"');
  let offset = location[6].substring(1).slice(0, -1);
  let prev = 0;
  if (offset > 1000) {
    prev = 980;
  }

  prev = parseInt(offset);
  prev = prev + 20;
  console.log(prev);

  const YELP = "https://api.yelp.com/v3/businesses";
  const ENDPOINT = `${YELP}/search?term=parking&location=${location[3]}&sort_by=rating&offset=${prev}`;
  //   console.log(ENDPOINT);

  //const API_KEY = '';
  const API_KEY =
    "mi5qSSqdhmrNXBjLq5MBMwuqcS0q8aE4u52fwqrG8CkrBjjksgdV8ZblHdh4ThtDqQVFapfOwrCqadcTH4sJIMhQgEcWpc0bK_9ms_rJ1H-xMT1Amp4tmH_PhAg3X3Yx";

  const raw_data = await fetch(ENDPOINT, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      Origin: "localhost",
      withCredentials: true,
    },
  });
  // console.log(event);

  let data = await raw_data.json();
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(data),
  });
  //   console.log(data);
};
// © 2021 GitHub, Inc.
