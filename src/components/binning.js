import React from 'react'

const Binning = ({bins, size, histogramLeftPadding, dampening}) => {
  return(
    <svg width={size} height={size} style={{border: "1px solid black"}}>
      {
        bins.map((bin, i) => {
          const bar_height = bin.length * dampening
          return (
            <rect
              y={size - 50 - bar_height}
              width="20"
              height={bar_height}
              x={histogramLeftPadding + i * 35}/>
          )
        })
      }
      {
        bins.map((bin, i) => {
          return (
            <text
              y={histogramLeftPadding + i * 35}
              x={-size + 50}
              text-anchor="middle"
              transform="rotate(-90)">
              {bin.x0}
            </text>
          )
        })
      }
      <text
        y={histogramLeftPadding + bins.length * 35}
        x={-size + 50}
        text-anchor="middle"
        transform="rotate(-90)">
        {bins[bins.length - 1].x1}
      </text>
    </svg>
  )
}

export default Binning
