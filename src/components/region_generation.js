import React from 'react';

const RegionGeneration = ({yScale, bins, size, histogramLeftPadding, margin, energyHighlight}) => {
  return (
    <svg width={size} height={size} style={{border: "1px solid black", 'font-size': '10px'}}>
      <text
        y={-(histogramLeftPadding - 10)}
        x={size - margin + 10}
        text-anchor="middle"
        transform="rotate(90)">
        NORTHWEST
      </text>
      <text
        y={-(histogramLeftPadding + 50)}
        x={size - margin + 10}
        text-anchor="middle"
        transform="rotate(90)">
        WEST
      </text>
      <text
        y={-(histogramLeftPadding + 110)}
        x={size - margin + 10}
        text-anchor="middle"
        transform="rotate(90)">
        SOUTH WEST
      </text>
      <text
        y={-(histogramLeftPadding + 170)}
        x={size - margin + 10}
        text-anchor="middle"
        transform="rotate(90)">
        MID WEST
      </text>
      <text
        y={-(histogramLeftPadding + 230)}
        x={size - margin + 10}
        text-anchor="middle"
        transform="rotate(90)">
        SOUTH EAST
      </text>
      <text
        y={-(histogramLeftPadding + 290)}
        x={size - margin + 10}
        text-anchor="middle"
        transform="rotate(90)">
        MID ATLANTIC
      </text>
      <text
        y={-(histogramLeftPadding + 350)}
        x={size - margin + 10}
        text-anchor="middle"
        transform="rotate(90)">
        NORTH EAST
      </text>
      {
        bins[0].map((energy_regional_sum, i) => {
          return (
            <rect
              x={histogramLeftPadding + i * 60}
              y={size - margin - yScale(energy_regional_sum)}
              height={yScale(energy_regional_sum)}
              width="5"
              fill={energyHighlight.includes('solar') ? "red" : energyHighlight != '' ? 'black' : "#e6add8"}/>
          )
        })
      }
      {
        bins[1].map((energy_regional_sum, i) => {
          return (
            <rect
              x={histogramLeftPadding + i * 60 + 5}
              y={size - margin - yScale(energy_regional_sum)}
              height={yScale(energy_regional_sum)}
              width="5"
              fill={energyHighlight.includes('hydro') ? "red" : energyHighlight != '' ? 'black' : "#72bcd4"}/>
          )
        })
      }
      {
        bins[2].map((energy_regional_sum, i) => {
          return (
            <rect
              x={histogramLeftPadding + i * 60 + 10}
              y={size - margin - yScale(energy_regional_sum)}
              height={yScale(energy_regional_sum)}
              width="5"
              fill={energyHighlight.includes('nuclear') ? "red" : energyHighlight != '' ? 'black' : "#e6bbad"}/>
          )
        })
      }
      {
        bins[3].map((energy_regional_sum, i) => {
          return (
            <rect
              x={histogramLeftPadding + i * 60 + 15}
              y={size - margin - yScale(energy_regional_sum)}
              height={yScale(energy_regional_sum)}
              width="5"
              fill={energyHighlight.includes('wind') ? "red" : energyHighlight != '' ? 'black' : "#add8e6"}/>
          )
        })
      }
      {
        bins[4].map((energy_regional_sum, i) => {
          return (
            <rect
              x={histogramLeftPadding + i * 60 + 20}
              y={size - margin - yScale(energy_regional_sum)}
              height={yScale(energy_regional_sum)}
              width="5"
              fill={energyHighlight.includes('petroleum') ? "red" : energyHighlight != '' ? 'black' : "#785027"}/>
          )
        })
      }
      {
        bins[5].map((energy_regional_sum, i) => {
          return (
            <rect
              x={histogramLeftPadding + i * 60 + 25}
              y={size - margin - yScale(energy_regional_sum)}
              height={yScale(energy_regional_sum)}
              width="5"
              fill={energyHighlight.includes('coal') ? "red" : energyHighlight != '' ? 'black' : "#000000"}/>
          )
        })
      }
      {
        bins[6].map((energy_regional_sum, i) => {
          return (
            <rect
              x={histogramLeftPadding + i * 60 + 30}
              y={size - margin - yScale(energy_regional_sum)}
              height={yScale(energy_regional_sum)}
              width="5"
              fill={energyHighlight.includes('other') ? "red" : energyHighlight != '' ? 'black' : "#274f78"}/>
          )
        })
      }
    </svg>
  )
}

export default RegionGeneration
