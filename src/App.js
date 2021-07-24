import { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Nav from "./comps/Nav.jsx";
import Inputs from "./comps/Input.jsx";
import Fetched from "./comps/Fetched.jsx";
import StarRatings from "react-star-ratings";
import logo from "./images/logo.png";
import bg from "./images/background.png";
// import './App.scss';

const App = () => {
  const [location, setLocation] = useState("");
  const [dataFromYelp, setDataFromYelp] = useState("");
  const [offset, setOffset] = useState(0);

  const [pagina, setPagina] = useState(false);
  const [data, setData] = useState("");
  const send = async () => {
    if (location !== "") {
      // history.push(qs);
      setData(
        await fetch("/.netlify/functions/yelp", {
          method: "POST",
          body: JSON.stringify({ location: location }),
        }).then((response) => response.json())
      );
      console.log(data);
      // setOffset(data.total);
      setPagina(true);

      // paginate(data.total);
    }
    // console.log(offset);
    // console.log(dataFromYelp);
  };

  const paginate = async () => {
    let paginated = await fetch("/.netlify/functions/paginate", {
      method: "POST",
      body: JSON.stringify({
        location: location,
        offset: data.total,
      }),
    }).then((response) => response.json());
    setDataFromYelp(paginated);
    // paginate();
  };
  // console.log(data.total);
  // if (offset === 0 && data.total) {
  //   setOffset(data.total);
  //   paginate();
  // }
  useEffect(() => {
    if (pagina) {
      // setOffset(data.total);
      console.log(offset);
      paginate();
      setPagina(false);
    }
    // if (pagina && data.total === 0) {
    //   send();
    // }
  }, [pagina]);

  // const prev = async () => {
  //   let paginated = await fetch("/.netlify/functions/prev", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       location: location,
  //       offset: data.total,
  //     }),
  //   }).then((response) => response.json());
  //   setDataFromYelp(paginated);
  //   if (data.total < 20) {
  //     setData({ total: 0 });
  //   } else {
  //     setData({ total: data.total + 20 });
  //   }
  // };
  const prev = async () => {
    console.log("AAAAAAAAAAAAAAAAAA");
    let paginated = await fetch("/.netlify/functions/prev", {
      method: "POST",
      body: JSON.stringify({
        location: location,
        offset: data.total,
      }),
    }).then((response) => response.json());
    setDataFromYelp(paginated);
    if (data.total < 20) {
      setData({ total: 0 });
    } else {
      setData({ total: data.total + 20 });
    }
  };

  const next = async () => {
    let paginated = await fetch("/.netlify/functions/next", {
      method: "POST",
      body: JSON.stringify({
        location: location,
        offset: data.total,
      }),
    }).then((response) => response.json());
    setDataFromYelp(paginated);
    if (data.total > 1000) {
      setData({ total: 980 });
    } else {
      setData({ total: data.total - 20 });
    }
  };
  // console.log(offset);

  useEffect(() => {
    // if (
    //   fetchedVisible === false &&
    //   submitting.food === "" &&
    //   submitting.town === ""
    // ) {
    //   history.push("");
    // }
  });

  return (
    <div className="App">
      <div className="App bg-gray-200">
        {/* <h1>Henry Countries</h1> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 py-4">
          <div>
            <img src={logo} width="200px" className="pl-4"></img>
          </div>
          <div className="flex justify-center">
            <input
              style={{ backgroundColor: `rgb(250, 131, 75)` }}
              className="rounded-l-full w-1/3 pl-3 text-black placeholder-black"
              type="text"
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Search Location"
            ></input>
            <button
              className="bg-red-300 rounded-r-full pr-4"
              style={{ backgroundColor: `rgb(250, 131, 75)` }}
              onClick={() => send()}
            >
              🔍
            </button>
          </div>
        </div>
        {/* {dataFromYelp && dataFromYelp?.businesses
        ? dataFromYelp.businesses.map((e) => {
            let a = e.review_count * e.rating;
            let b = e.review_count + 1;
            let c = a / b; */}
        <div className="flex flex-wrap justify-center gap-6 mt-6 mb-4">
          {/* <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 px-4 py-3 grid-cols-1 justify-center justify-items-center content-center items-center"> */}
          {dataFromYelp && dataFromYelp.businesses ? (
            dataFromYelp.businesses.map((e, key) => {
              let a = e.review_count * e.rating;
              let b = e.review_count + 1;
              let c = a / b;
              c = c.toString();
              c = c.slice(0, 4);
              e.score = c;
              let sort;
              sort = dataFromYelp.businesses.sort((a, b) => a.score - b.score);
              // if (!e.custom) {
              return (
                // <Link
                //   key={key}
                //   style={{ textDecoration: "none", outline: "none" }}
                //   to={`/product/${e._id}`}
                // >
                <div
                  key={key}
                  className="card rounded-3xl w-auto mb-5 px-4 py-4"
                  style={{ backgroundColor: `rgb(200, 131, 75)` }}
                >
                  <div className="flex justify-center w-96">
                    {e.image_url ? (
                      <img
                        className="rounded-xl"
                        src={e.image_url}
                        alt="Parking Lot Image"
                        style={{ height: "300px", width: "320px" }}
                      />
                    ) : (
                      <img
                        src="https://i.stack.imgur.com/y9DpT.jpg"
                        alt="No Image"
                        style={{ height: "300px", width: "320px" }}
                      />
                    )}
                  </div>
                  {/* <div className="bg-gray-200" style={{ height: "1px" }}></div> */}
                  <div className="p-4">
                    <p className="text-black text-xl">{e.name}</p>
                    {/* {e.stock === 0 && (
                      <h4 className="text-red-500">No Stock</h4>
                    )} */}
                    <p className="text-gray-700 text-l">
                      {e.location.display_address.map((e) => e + " ")}
                    </p>
                    <p className="text-gray-700 text-l">
                      Rating:{" "}
                      <StarRatings
                        rating={e.rating}
                        starRatedColor="gold"
                        // changeRating={this.changeRating}
                        numberOfStars={5}
                        name="rating"
                        starDimension="20px"
                        starSpacing="0px"
                      />{" "}
                      ({e.review_count} reviews)
                    </p>
                    <p className="text-black text-xl">Score: {c}</p>
                    <p className="text-black  bg-green-400 text-l overflow-ellipsis overflow-hidden">
                      <button onClick={() => window.open(e.url)}>
                        Learn More on Yelp
                      </button>
                    </p>
                  </div>
                </div>

                //</Link>
              );
            })
          ) : (
            <div className="">
              <h1 className="mt-4 font-bold text-3xl">
                Please Enter a Location Above To Find The Worst Rated Parking
                Lots
              </h1>
              <div className="flex justify-center items-center">
                <img className="h-full mt-24" src={bg}></img>
              </div>
            </div>
          )}
        </div>
        {/* 
      <button onClick={() => prev()}>Prev</button>
      <br></br>
      <button onClick={() => next()}>Next</button> */}

        {dataFromYelp && dataFromYelp.businesses ? (
          <div className="pagination flex justify-center pb-14 bg-gray-200 w-full">
            {dataFromYelp && (
              <div className="flex justify-center">
                <button
                  onClick={prev}
                  // disabled={offset === 0}
                  style={{ borderColor: `rgb(200, 131, 75)` }}
                  className="border-4 bg-teal-500 text-black w-1/2 block rounded-sm font-bold py-4 px-6 ml-2 flex items-center"
                >
                  <svg
                    className="h-5 w-5 mr-2 fill-current"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="-49 141 512 512"
                    style={{ enableBackground: "new -49 141 512 512" }}
                    xmlSpace="preserve"
                  >
                    <path
                      id="XMLID_10_"
                      d="M438,372H36.355l72.822-72.822c9.763-9.763,9.763-25.592,0-35.355c-9.763-9.764-25.593-9.762-35.355,0 l-115.5,115.5C-46.366,384.01-49,390.369-49,397s2.634,12.989,7.322,17.678l115.5,115.5c9.763,9.762,25.593,9.763,35.355,0 c9.763-9.763,9.763-25.592,0-35.355L36.355,422H438c13.808,0,25-11.193,25-25S451.808,372,438,372z"
                    ></path>
                  </svg>
                  Previous page
                </button>
                <button
                  onClick={next}
                  // disabled={categoryArray && categoryArray.length < 15}
                  style={{ borderColor: `rgb(200, 131, 75)` }}
                  className="border-4 bg-teal-500 w-1/2 text-black block rounded-sm font-bold py-4 px-6 ml-2 flex items-center"
                >
                  Next page
                  <svg
                    className="h-5 w-5 ml-2 fill-current"
                    clasversion="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="-49 141 512 512"
                    style={{ enableBackground: "new -49 141 512 512" }}
                    xmlSpace="preserve"
                  >
                    <path
                      id="XMLID_11_"
                      d="M-24,422h401.645l-72.822,72.822c-9.763,9.763-9.763,25.592,0,35.355c9.763,9.764,25.593,9.762,35.355,0
            l115.5-115.5C460.366,409.989,463,403.63,463,397s-2.634-12.989-7.322-17.678l-115.5-115.5c-9.763-9.762-25.593-9.763-35.355,0
            c-9.763,9.763-9.763,25.592,0,35.355l72.822,72.822H-24c-13.808,0-25,11.193-25,25S-37.808,422-24,422z"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default App;
