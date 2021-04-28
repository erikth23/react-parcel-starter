import React, {useEffect} from "react";
import {scaleLinear} from "d3-scale";
import {csv} from 'd3-fetch';
import {bin, extent, max, min} from 'd3-array'

import Season_Generation from '../components/season_generation';
import Binning from '../components/binning';
import RegionGeneration from '../components/region_generation';
import RegionalGenerationSankey from '../components/regional_generation_sankey';
import {useFetch} from '../hooks/useFetch';

const A2 = () => {

	var [data, loading] = useFetch("https://raw.githubusercontent.com/erikth23/react-parcel-starter/main/generation_monthly.csv")
  data = data.filter(item => item["ENERGY SOURCE"] != 'Total').filter(item => item.STATE != 'US-Total').map(item => ({...item, GENERATION: parseInt(item["GENERATION (Megawatthours)"].replace(',', ''))})).filter(item => item.GENERATION != 0)
	const dataSmallSample = data.slice(0, 5000);
  const non_neg_data = data.filter(d => d.GENERATION > 0)
	const GenExtent = extent(dataSmallSample, (d) => {
	  return +d.GENERATION;
	});
  const non_neg_genExtent = extent(non_neg_data, d => {
    return +d.GENERATION
  })

	const size = 500;
	const margin = 50;
	const axisTextAlignmentFactor = 3;

	const yScale = scaleLinear()
	  .domain(GenExtent)
	  .range([size - margin, size - 350]);
  const non_neg_yScale = scaleLinear()
    .domain(non_neg_genExtent)
    .range([size - margin, size - 350])

  const _bins = bin().value(d => d.GENERATION);
	const genBins = _bins(data);

  const seasonal_bin = bin().value(d => parseInt(d.MONTH)).thresholds([3.5, 6.5, 9.5]);
  const seasonal_bins = seasonal_bin(non_neg_data);

	const energy_source_bins = [[],[],[],[],[],[],[]];
	data.forEach((item, i) => {
		if(item["ENERGY SOURCE"] == "Solar Thermal and Photovoltaic") {
			energy_source_bins[0].push(item)
		} else if(item["ENERGY SOURCE"] == "Hydroelectric Conventional") {
			energy_source_bins[1].push(item)
		} else if(item["ENERGY SOURCE"] == "Nuclear") {
			energy_source_bins[2].push(item)
		} else if(item["ENERGY SOURCE"] == "Wind") {
			energy_source_bins[3].push(item)
		} else if(item["ENERGY SOURCE"] == "Petroleum") {
			energy_source_bins[4].push(item)
		} else if(item["ENERGY SOURCE"] == "Coal") {
			energy_source_bins[5].push(item)
		} else {
			energy_source_bins[6].push(item)
		}
	});
	const energy_source_regional_bins = [];
	const energy_source_provider_bins = [];
	energy_source_bins.forEach((bin, i) => {
		var energy_regional_sums = [0,0,0,0,0,0,0];
		var energy_provider_sums = [0,0,0,0,0,0];
		bin.forEach((item, i) => {
			if(item.STATE == 'WA' ||
				item.STATE == 'OR' ||
				item.STATE == 'ID' ||
				item.STATE == 'MT' ||
				item.STATE == 'CO' ) {
						energy_regional_sums[0] += item.GENERATION
			} else if(item.STATE == 'CA' ||
								item.STATE == 'NV') {
						energy_regional_sums[1] += item.GENERATION
			} else if(item.STATE == 'UT' ||
								item.STATE == 'AZ' ||
								item.STATE == 'NM' ||
								item.STATE == 'TX' ||
								item.STATE == 'CO' ||
								item.STATE == 'OK') {
						energy_regional_sums[2] += item.GENERATION
			} else if(item.STATE == 'ND' ||
								item.STATE == 'SD' ||
								item.STATE == 'NE' ||
								item.STATE == 'KS' ||
								item.STATE == 'MO' ||
								item.STATE == 'IA' ||
								item.STATE == 'MN' ||
								item.STATE == 'WI' ||
								item.STATE == 'IL' ||
								item.STATE == 'IN' ||
								item.STATE == 'MI' ||
								item.STATE == 'OH' ||
								item.STATE == 'KY') {
					  energy_regional_sums[3] += item.GENERATION
			} else if(item.STATE == 'AR' ||
								item.STATE == 'LA' ||
								item.STATE == 'MS' ||
								item.STATE == 'AL' ||
								item.STATE == 'TN' ||
								item.STATE == 'GA' ||
								item.STATE == 'FL' ||
								item.STATE == 'NC' ||
								item.STATE == 'SC' ||
								item.STATE == 'AZ') {
						energy_regional_sums[4] += item.GENERATION
			} else if(item.STATE == 'VA' ||
								item.STATE == 'WV' ||
								item.STATE == 'MD' ||
								item.STATE == 'PA' ||
								item.STATE == 'DE' ||
								item.STATE == 'NJ' ||
								item.STATE == 'NY') {
						energy_regional_sums[5] += item.GENERATION
			} else if(item.STATE == 'VT' ||
								item.STATE == 'CT' ||
								item.STATE == 'RI' ||
								item.STATE == 'MA' ||
								item.STATE == 'NH' ||
								item.STATE == 'ME') {
						energy_regional_sums[6] += item.GENERATION
			}

			if(item["TYPE OF PRODUCER"] == "Total Electric Power Industry") {
				energy_provider_sums[0] += item.GENERATION
			} else if(item["TYPE OF PRODUCER"] == "Combined Heat and Power, Industrial Power") {
				energy_provider_sums[1] += item.GENERATION
			} else if(item["TYPE OF PRODUCER"] == "Combined Heat and Power, Commercial Power") {
				energy_provider_sums[2] += item.GENERATION
			} else if(item["TYPE OF PRODUCER"] == "Combined Heat and Power, Electric Power") {
				energy_provider_sums[3] += item.GENERATION
			} else if(item["TYPE OF PRODUCER"] == "Electric Generators, Independent Power Producers") {
				energy_provider_sums[4] += item.GENERATION
			} else if(item["TYPE OF PRODUCER"] == "Electric Generators, Electric Utilitiess") {
				energy_provider_sums[5] += item.GENERATION
			}
		});
		energy_source_regional_bins.push(energy_regional_sums)
		energy_source_provider_bins.push(energy_provider_sums)
	});
	const region_flattened = [].concat(...energy_source_regional_bins)
	const energy_source_regional_extent = extent(region_flattened, d => {
		return d
	})
	const energy_source_regional_yScale = scaleLinear()
    .domain(energy_source_regional_extent)
    .range([size - margin, size - 350])

	return (<div className='d-flex flex-column justify-content-center align-items-center mb-5' style={{
    'textAlign': 'center'
  }}>
		<h1>Exploratory Data Analysis(Assignment #2)</h1>
		<p>{loading && 'Loading Data...'}</p>
		<p style={{'textAlign': 'justify', width: '80vw'}}>The questions I came up with(see above) are based around the idea that different regions and different times of the year have different ways of generating energy.  This may be because of socioeconomic, political, or climate factors, but what I am looking to consider is how close is each region to developing a sustainable source of energy.  Through this Exploratory Data Analysis, I discovered surprising insights into how certain regions generate energy.
<br/><br/>
Since this dataset is extremely large in size, I opted to focus on a single year so the analysis did not take forever and my visualizations were not cluttered. To perform the initial analysis I first looked at the data directly to see if there were any anomalies.  After that I looked at my static visualization and began working with the data using simple svg tags.  I charted out the data over a timeline, but it did not yield much as there were a lot of points and not much could be taken out of it.  After that I tried to lay out the data using lines and found that the large majority of data was centered around the 0.  From there I decided to bin the data on the amount of energy generated using d3-array and built a bar chart that could display that.  From there, I realized there were a lot of negative values and zero values.  This was an interesting insight that I was not expecting, since we are talking about the amount of energy generated.
</p>
    <h3>Binning</h3>
		<p style={{width: '80vw'}}>The first section is the binned items.  Using d3-array, I was able to bin rows based on the amount energy(MegaWatts) the state generated during a certain month with a specific provider and energy source.
		The number to the left of each bar is <b>minimum</b> value for that bin and the number to the right of each bar is the <b>maximum</b>
	value for that bin. (Prior to binning all rows that's Generation was equal to 0 were removed due to the overwhelming number)
		</p>
    <div className='d-flex flex-row justify-content-around align-items-center' style={{width: '80vw'}}>
      <div>
        <p style={{width: "40vw"}}>Figure 1.1: This chart diaplays the binning process to scale.  As you can see the number of rows with values between 0 and 100,000 MegaWatts far overshadows the rest.</p>
        <Binning bins={genBins} size={size} histogramLeftPadding={50} dampening={0.025}/>
      </div>
      <div>
        <p style={{width: "40vw"}}>Figure 1.2: For this chart I wanted to all but ignore the values between 0 and 100,000 MegaWatts in order to display how the different ranges compare to one another.  Here,
				a power law curve is being displayed, suggesting that most of the records(combination of state, provider type, energy source, and month) generate relatively low amounts of energy</p>
        <Binning bins={genBins} size={size} histogramLeftPadding={50} dampening={0.25}/>
      </div>
    </div>
    <h3>Generation By Season</h3>
		<p style={{width: '80vw'}}>The second section focuses on renewables vs non-renewables during different seasons.  I opted to display the data in this way in order to both look at the number of records in each as
		well as the values.  The base line at each is 0 (all negative values were removed).  The generation values are mapped into (min, max) generation. The first bar for each is the renewables and
		the second bar is non-renewables</p>
    <div className='d-flex flex-row justify-content-around align-items-center' style={{width: '80vw'}}>
      <div>
        <p style={{width: "40vw"}}>Figure 2.1: Here you can see all renewables vs non-renewables for each season.</p>
        <Season_Generation yScale={non_neg_yScale} bins={seasonal_bins} margin={margin} size={size} highlightFunction={(data) => {
            return false
          }}/>
      </div>
      <div>
        <p style={{width: "40vw"}}>Figure 2.2: This is the same chart as 2.1, but with all the records with the Energy Source = Nuclear highlighted in red</p>
        <Season_Generation yScale={non_neg_yScale} bins={seasonal_bins} margin={margin} size={size} highlightFunction={(data) => {
            return data['ENERGY SOURCE'] == "Nuclear"
          }}/>
      </div>
    </div>
		<h3>Generation By Region</h3>
		<p style={{width: '80vw'}}>The third section focuses on the different energy sources used on a per region basis. States were grouped by region per Map 1.1. From left to right, the Energy Source
			for each bar in each region is Solar, Hydro, Nuclear, Wind, Petroleam, Coal.  To calculate this we summed up all records for each region, energy source combination.</p>
		<div className='d-flex flex-row justify-content-around align-items-center' style={{width: '80vw'}}>
			<div>
				<p style={{width: "40vw"}}>Figure 3.1: This chart displays the energy generated per region per energy source in order to compare how different regions differ in the ways they generate energy</p>
				<RegionGeneration margin={20} yScale={energy_source_regional_yScale} bins={energy_source_regional_bins} margin={margin} size={size} histogramLeftPadding={40} energyHighlight=""/>
			</div>
			<div>
				<p style={{width: "40vw"}}>Figure 3.2: This chart highlights Solar, Hydro, and Petroleum energy sources</p>
				<RegionGeneration margin={20} yScale={energy_source_regional_yScale} bins={energy_source_regional_bins} margin={margin} size={size} histogramLeftPadding={40} energyHighlight="solar hydro petroleum"/>
			</div>
		</div>
		<h3>Energy Generation: Energy Source to Region</h3>
		<p style={{width: '80vw'}}>In the fourth section, I tried to develop sankey diagrams in order to dispaly how how much energy is generated for each source for each region/provider.  This was primarily done to challenge myself to see
		if I could build it. (Note: Credit to <a href="https://bl.ocks.org/d3noob/c9b90689c1438f57d649">this tutorial</a> for help)</p>
	<div className='d-flex flex-row justify-content-around align-items-start' style={{width: '80vw'}}>
			<div>
				<p style={{width: "40vw"}}>Figure 4.1: This chart diaplays a sankey diagram that maps energy sources to regions</p>
				<svg id="sankey-region" width={500} height={500} style={{border: "1px solid black", 'font-size': '10px'}}></svg>
				{
					RegionalGenerationSankey({
						data: energy_source_regional_bins,
						container: "#sankey-region",
						size: (size - 15),
						'source_names': ["Solar", "Hydro", "Nuclear", "Wind", "Petroleum", "Coal", "Other"],
						'dest_names': ["NorthWest", "West", "SouthWest", "MidWest", "SouthEast", "MidAtlantic", "NorthEast"]
					})
				}
			</div>
			<div>
				<p style={{width: "40vw"}}>Figure 4.2: This chart diaplyas a sankey diagram that maps energy sources to types of providers</p>
				<svg id="sankey-provider" width={500} height={500} style={{border: "1px solid black", 'font-size': '10px'}}></svg>
				{
					energy_source_provider_bins[0][0] != 0 && RegionalGenerationSankey({
						data: energy_source_provider_bins,
						container: "#sankey-provider",
						size: (size - 15),
						'source_names': ["Solar", "Hydro", "Nuclear", "Wind", "Petroleum", "Coal", "Other"],
						'dest_names': ["A", "B", "C", "D", "E", "F"]
					})
				}
				<ul style={{textAlign: 'left'}}>
					<li>A - Total Electric Power Industry</li>
					<li>B - Combined Heat and Power, Industrial Power</li>
					<li>C - Combined Heat and Power, Commercial Power</li>
					<li>D - Combined Heat and Power, Electric Power</li>
					<li>E - Electric Generators, Independent Power Producers</li>
					<li>F - Electric Generators, Electric Utilitiess</li>
				</ul>
			</div>
		</div>
		<p style={{'textAlign': 'justify', width: '80vw'}}>The biggest insights I gained through my data analysis surrounded the number of records that have negative, zero, or very small values for their energy generation.  As you can see in Figure 1.1, the large majority of records have relatively small amounts of energy generated.  This was an interesting insight as it suggests that energy generation is spread out over a lot of different combinations of state, energy source, and type of producer.  This is important when looking at infrastructure like the Electric Grid and trying to bring all these different sources together.  Combining renewable and non-renewables is another problem for the electric grid, and something I was looking into with my first question.  I wanted to see if there was a noticeable difference in the way renewables are utilized during each season.  I tried to do this by laying out all records in a way that would show how total records change over time, how max records change, and how records are still mostly clumped at 0.  I did this through figures 2.1 and 2.2.  In Figure 2.2, I highlight all of the records with a nuclear Energy Source.  By doing this, the viewer can see how nuclear is more valuable during the winter months, most likely because renewables like solar, hydro, and wind aren’t as available.
<br/><br/>
The next two questions I pose go hand in hand and look at how states and types of producers generate their energy.  Here the producer is the way that the electricity is generated.  With Figure 3.1 and 3.2, I tried to display the sum of each energy source for each region.  This required a complex data transformation, where I needed to bin the data on the energy source and then looped through each and calculated the sum for each region for each energy source.  Following this, I was able to chart the sums in Figure 3.1.  In Figure 3.2, I bring attention to solar, hydro, and petroleum energy because they did not follow my expectations.  I expected the Northwest to be heavily hydroelectric, but there was actually more solar energy.  I also expected the Southwest to be the leader in solar energy generation, but they lagged behind most other regions.  I decided to see if I could display this data in a different way, so opted for sankey diagrams.  One for region and the other for types of producer.  It was difficult to build, but I was able to rely on a tutorial to build out my diagrams.  Through these diagrams it was much easier to view the ratios of how different energy sources compare to one another for each region/producer and vice versa.  Ultimately this exercise was a great way to visualize the data I have chosen, while also providing ways to gain insight from the data.  I was able to learn about data transformation and cleaning techniques and also experiment with different d3 tools.  Working with the data directly in svg tags helped to better understand how the data functions and the trends in the dataset itself. There is still a lot to improve with these visualizations and the addition of interactivity will aid in adding additional dimensions to the data.
</p>
	</div>);
};

export default A2;
