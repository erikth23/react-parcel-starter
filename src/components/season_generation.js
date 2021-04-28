import React from 'react';

const Season_Generation = ({yScale, bins, margin, size, highlightFunction}) => {
  return (
    <svg width={size} height={size} style={{ border: "1px solid black"}}>
      <text
        x={(size / 2) - 120}
        y={size - margin + 20}
        >Winter</text>
      <line
        x1={size / 2 - 120}
        y1={size - margin}
        x2={size / 2 - 70}
        y2={size - margin}
        stroke={"black"}
      />
      <text
        x={(size / 2) - 50}
        y={size - margin + 20}
        >Spring</text>
      <line
        x1={size / 2 - 50}
        y1={size - margin}
        x2={size / 2}
        y2={size - margin}
        stroke={"black"}
      />
      <text
        x={(size / 2) + 20}
        y={size - margin + 20}
        >Summer</text>
      <line
        x1={size / 2 + 20}
        y1={size - margin}
        x2={size / 2 + 70}
        y2={size - margin}
        stroke={"black"}
      />
      <text
        x={(size / 2) + 90}
        y={size - margin + 20}
        >Autumn</text>
      <line
        x1={size / 2 + 90}
        y1={size - margin}
        x2={size / 2 + 140}
        y2={size - margin}
        stroke={"black"}
      />
      {
        bins[0].filter(d => {
          return d["ENERGY SOURCE"] == "Solar Thermal and Photovoltaic" ||
            d["ENERGY SOURCE"] == "Hydroelectric Conventional" ||
            d["ENERGY SOURCE"] == "Other Biomass" ||
            d["ENERGY SOURCE"] == "Wind" ||
            d["ENERGY SOURCE"] == "Geothermal" ||
            d["ENERGY SOURCE"] == "Nuclear"
        }).map((data, i) => {
          const highlight = highlightFunction(data);
          return (
            <line
              key={i}
              x1={(size / 2) - 120}
              y1={yScale(data.GENERATION * 1.5)}
              x2={(size / 2) - 100}
              y2={yScale(data.GENERATION * 1.5)}
              stroke={highlight ? "red" : "steelblue"}
              strokeOpacity={highlight ? 1 : 0.1}
            />
          );
        })
      }
      {
        bins[0].filter(d => {
          return d["ENERGY SOURCE"] == "Coal" ||
            d["ENERGY SOURCE"] == "Natural Gas" ||
            d["ENERGY SOURCE"] == "Petroleum" ||
            d["ENERGY SOURCE"] == "Wood and Wood Derived Fuels" ||
            d["ENERGY SOURCE"] == "Pumped Storage" ||
            d["ENERGY SOURCE"] == "Other Gases"
        }).map((data, i) => {
          const highlight = highlightFunction(data);
          return (
            <line
              key={i}
              x1={(size / 2) - 90}
              y1={yScale(data.GENERATION * 1.5)}
              x2={(size / 2) - 70}
              y2={yScale(data.GENERATION * 1.5)}
              stroke={highlight ? "red" : "steelblue"}
              strokeOpacity={highlight ? 1 : 0.1}
            />
          );
        })
      }
      {
        bins[1].filter(d => {
          return d["ENERGY SOURCE"] == "Solar Thermal and Photovoltaic" ||
            d["ENERGY SOURCE"] == "Hydroelectric Conventional" ||
            d["ENERGY SOURCE"] == "Other Biomass" ||
            d["ENERGY SOURCE"] == "Wind" ||
            d["ENERGY SOURCE"] == "Geothermal" ||
            d["ENERGY SOURCE"] == "Nuclear"
        }).map((data, i) => {
          const highlight = highlightFunction(data);
          return (
            <line
              key={i}
              x1={(size / 2) - 50}
              y1={yScale(data.GENERATION * 1.5)}
              x2={(size / 2) - 30}
              y2={yScale(data.GENERATION * 1.5)}
              stroke={highlight ? "red" : "steelblue"}
              strokeOpacity={highlight ? 1 : 0.1}
            />
          );
        })
      }
      {
        bins[1].filter(d => {
          return d["ENERGY SOURCE"] == "Coal" ||
            d["ENERGY SOURCE"] == "Natural Gas" ||
            d["ENERGY SOURCE"] == "Petroleum" ||
            d["ENERGY SOURCE"] == "Wood and Wood Derived Fuels" ||
            d["ENERGY SOURCE"] == "Pumped Storage" ||
            d["ENERGY SOURCE"] == "Other Gases"
        }).map((data, i) => {
          const highlight = highlightFunction(data);
          return (
            <line
              key={i}
              x1={(size / 2) - 20}
              y1={yScale(data.GENERATION * 1.5)}
              x2={(size / 2)}
              y2={yScale(data.GENERATION * 1.5)}
              stroke={highlight ? "red" : "steelblue"}
              strokeOpacity={highlight ? 1 : 0.1}
            />
          );
        })
      }
      {
        bins[2].filter(d => {
          return d["ENERGY SOURCE"] == "Solar Thermal and Photovoltaic" ||
            d["ENERGY SOURCE"] == "Hydroelectric Conventional" ||
            d["ENERGY SOURCE"] == "Other Biomass" ||
            d["ENERGY SOURCE"] == "Wind" ||
            d["ENERGY SOURCE"] == "Geothermal" ||
            d["ENERGY SOURCE"] == "Nuclear"
        }).map((data, i) => {
          const highlight = highlightFunction(data);
          return (
            <line
              key={i}
              x1={(size / 2) + 20}
              y1={yScale(data.GENERATION * 1.5)}
              x2={(size / 2) + 40}
              y2={yScale(data.GENERATION * 1.5)}
              stroke={highlight ? "red" : "steelblue"}
              strokeOpacity={highlight ? 1 : 0.1}
            />
          );
        })
      }
      {
        bins[2].filter(d => {
          return d["ENERGY SOURCE"] == "Coal" ||
            d["ENERGY SOURCE"] == "Natural Gas" ||
            d["ENERGY SOURCE"] == "Petroleum" ||
            d["ENERGY SOURCE"] == "Wood and Wood Derived Fuels" ||
            d["ENERGY SOURCE"] == "Pumped Storage" ||
            d["ENERGY SOURCE"] == "Other Gases"
        }).map((data, i) => {
          const highlight = highlightFunction(data);
          return (
            <line
              key={i}
              x1={(size / 2) + 50}
              y1={yScale(data.GENERATION * 1.5)}
              x2={(size / 2) + 70}
              y2={yScale(data.GENERATION * 1.5)}
              stroke={highlight ? "red" : "steelblue"}
              strokeOpacity={highlight ? 1 : 0.1}
            />
          );
        })
      }
      {
        bins[3].filter(d => {
          return d["ENERGY SOURCE"] == "Solar Thermal and Photovoltaic" ||
            d["ENERGY SOURCE"] == "Hydroelectric Conventional" ||
            d["ENERGY SOURCE"] == "Other Biomass" ||
            d["ENERGY SOURCE"] == "Wind" ||
            d["ENERGY SOURCE"] == "Geothermal" ||
            d["ENERGY SOURCE"] == "Nuclear"
        }).map((data, i) => {
          const highlight = highlightFunction(data);
          return (
            <line
              key={i}
              x1={(size / 2) + 90}
              y1={yScale(data.GENERATION * 1.5)}
              x2={(size / 2) + 110}
              y2={yScale(data.GENERATION * 1.5)}
              stroke={highlight ? "red" : "steelblue"}
              strokeOpacity={highlight ? 1 : 0.1}
            />
          );
        })
      }
      {
        bins[3].filter(d => {
          return d["ENERGY SOURCE"] == "Coal" ||
            d["ENERGY SOURCE"] == "Natural Gas" ||
            d["ENERGY SOURCE"] == "Petroleum" ||
            d["ENERGY SOURCE"] == "Wood and Wood Derived Fuels" ||
            d["ENERGY SOURCE"] == "Pumped Storage" ||
            d["ENERGY SOURCE"] == "Other Gases"
        }).map((data, i) => {
          const highlight = highlightFunction(data);
          return (
            <line
              key={i}
              x1={(size / 2) + 120}
              y1={yScale(data.GENERATION * 1.5)}
              x2={(size / 2) + 140}
              y2={yScale(data.GENERATION * 1.5)}
              stroke={highlight ? "red" : "steelblue"}
              strokeOpacity={highlight ? 1 : 0.1}
            />
          );
        })
      }
      }
    </svg>
  )
}
export default Season_Generation;
