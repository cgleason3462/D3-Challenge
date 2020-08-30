// @TODO: YOUR CODE HERE!

function makeResponsive(){
d3.csv("data.csv").then(function(data) {
    console.log(data);
  

// set the dimensions and margins of the graph
var margin = {top: 10, right: 60, bottom: 60, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleLinear()
    .domain([4, 24])
    .range([ 0, width ]);
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
var y = d3.scaleLinear()
    .domain([20, 38])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.poverty); } )
      .attr("cy", function (d) { return y(d.obesity); } )
      .attr("r", 3)
      .style("fill", "#69b3a2")

      

      // Step 1: Initialize Tooltip
  var toolTip = d3.tip()
  .attr("class", "tooltip")
  .offset([80, -60])
  .html(function(d) {
    return (`<strong>${(d.poverty)}<strong><hr>${d.obesity}
    medal(s) won`);
  });

// Step 2: Create the tooltip in chartGroup.
svg.call(toolTip);

// Step 3: Create "mouseover" event listener to display tooltip
svg.on("mouseover", function(d) {
  toolTip.show(d, this);
})
// Step 4: Create "mouseout" event listener to hide tooltip
  .on("mouseout", function(d) {
    toolTip.hide(d);
  });
  });
};
  
  // When the browser loads, makeResponsive() is called.
  makeResponsive();
  
  // When the browser window is resized, responsify() is called.
  d3.select(window).on("resize", makeResponsive);