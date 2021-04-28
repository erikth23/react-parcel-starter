import React, {useState, useEffect} from 'react'

import image from '../images/Assignment_1.png';

const A1 = () => {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center' style={{
        height: '100%',
        width: '100%'
      }}>
      <h1 className="display-3">Static Visualization</h1>
      <h3 className="display-5">Erik Thomas-Hommer</h3>
      <img src={image} />
      <div style={{
          width: '80%'
        }}>
        <p>With this visualization I wanted to display how states compare to one another in terms of their energy consumption for both total and type. I also wanted to bring attention to the differences between renewable and non-renewable energy, highlighting which states have begun migrating to more sustainable solutions. This data was difficult to work with in a static visualization because there is so much detail. While the dataset I chose breaks down the totals by month since 2001, displaying all of this data would have cluttered the visualization. I opted to focus on the most recent year that was declared as final(2019) and sum up the totals over that year.
<br/><br/>
  For my visualization, I opted for a stacked bar chart because the viewer can see the total and the breakdown. While it is difficult to discern the actual numbers for each bar, the ratio is made clear to the viewer. Seeing as I was more interested in the comparison between states and energy sources, it made more sense to focus on the ratios than the actual numbers. I chose to break the data into two different charts (Renewable and Non-Renewable) because 1) I wanted to highlight the differences between the two, 2) the renewable energy totals were overshadowed by the non-renewables, making it difficult to see, and 3) to de-clutter the data and make it easier to view each energy source. I chose to use bright, differentiating colors instead of shading because the bars are stacked on top of each other and it would have been more difficult to differentiate with just shading.
<br/><br/>
  Overall, confining this rich dataset to a static visualization does not do it justice. The viewer is able to pull information from it, but only how certain states compare to one another for a given year and energy source. A viewer would be able to use this as an entry point to discern which states are progressive and which aren’t when it comes to renewable energy, but would need more data points to make further conclusions. I am excited to use this dataset to build out interactive visualizations in the future because of its breadth and detail of data.</p>
      </div>
    </div>
  )
}

export default A1;
