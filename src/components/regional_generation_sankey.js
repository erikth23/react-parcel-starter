import React from 'react';
import {format as d3Format, scaleOrdinal, schemeCategory10, select, rgb} from 'd3'
import {sankey as d3Sankey, sankeyLinkHorizontal} from "d3-sankey";

const RegionalGenerationSankey = ({container, data, size, source_names, dest_names}) => {
  var graph = make_graph(data, source_names, dest_names)
  const nodeWidth = 50;
  console.log(graph)

  const sankey = d3Sankey()
      .nodeWidth(nodeWidth)
      .nodePadding(40)
      .size([size, size])({
          nodes: graph.nodes,
          links: graph.links
      })

  var svg = select(container)
  var path = sankeyLinkHorizontal();
  var units = "Widgets";
  const formatNumber = d3Format(",.0f"),
    format = function(d) { return formatNumber(d) + " " + units; },
    scale = scaleOrdinal(schemeCategory10),
    color = name => scale(name.replace(/ .*/, ''))

// add in the links
  var link = svg.append("g").selectAll(".link")
    .data(graph.links)
    .enter().append("path")
    .attr("class", "link")
    .attr("d", path)
    .style("stroke-width", function(d) { return Math.max(1, d.dy); })
    .style("fill", function(d) {
      if(d.source.node == 0) {
        //solar
        return '#e6add8'
      } else if(d.source.node == 1) {
        //hydro
        return '#72bcd4'
      } else if(d.source.node == 2) {
        //nuclear
        return '#e6bbad'
      } else if(d.source.node == 3) {
        //wind
        return '#add8e6'
      } else if(d.source.node == 4) {
        //petroleum
        return '#785027'
      } else if(d.source.node == 5) {
        //coal
        return '#000000'
      } else if(d.source.node == 6) {
        //other
        return '#274f78'
      }
      return "#000"
    })
    .sort(function(a, b) { return b.dy - a.dy; });

// add the link titles
  link.append("title")
      .text(function(d) {
        return d.source.name + " → " +
              d.target.name + "\n" + format(d.value); });

// add in the nodes
  var node = svg.append("g").selectAll(".node")
    .data(graph.nodes)
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", function(d) {
    return "translate(" + d.x0 + "," + d.y0 + ")"; })

// add the rectangles for the nodes
  node.append("rect")
    .attr("height", function(d) {
      const height = d.y1 - d.y0
      return height > 20 ? height : 20
    })
    .attr("width", nodeWidth)
    .style("fill", "#fff")
    .style("stroke", "#000")
    .append("title")
    .text(function(d) {
      return d.name + "\n" + format(d.value); });

// add in the title for the nodes
  node.append("text")
    .attr("x", 50)
    .attr("y", function(d) { return (d.y1 - d.y0) / 2})
    .attr("dy", ".35em")
    .attr("text-anchor", "end")
    .attr("transform", null)
    .text(function(d) { return d.name; })
    .filter(function(d) { return d.x < size / 2; })
    .attr("x", 6 + nodeWidth)
    .attr("text-anchor", "start");
}

const make_graph = (data, source_names, dest_names) => {
  var node_names = source_names.concat(...dest_names);

  var nodes = node_names.map((name, i) => ({
    node: i,
    name: name
  }))

  var links = []
  data.forEach((energy_bins, energy_index) => {
    energy_bins.forEach((sum, region_index) => {
      links.push({
        source: energy_index,
        target: (region_index + source_names.length),
        value: sum
      })
    });
  });

  return {
    nodes: nodes,
    links: links
  }
}

export default RegionalGenerationSankey
