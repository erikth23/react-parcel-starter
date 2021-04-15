import React, {useEffect} from "react";
import { csv } from 'd3-fetch';

const viewHeight = 500;
const viewWidth = 500;


const App = () => {

    useEffect(() => {
      csv("https://raw.githubusercontent.com/erikth23/react-parcel-starter/main/generation_monthly.csv").then(function(data) {
        console.log(data);
      });
    }, [])

    return (
        <div>
          <h1>Exploratory Data Analysis Assignment #2</h1>
        </div>
    );
};

export default App;
