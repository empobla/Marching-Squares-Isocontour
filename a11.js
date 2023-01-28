// 
// a11.js
// Template for CSC444 Assignment 11, Fall 2021
// Joshua A. Levine <josh@email.arizona.edu>
//
// This file provides the template code for A11, providing a skeleton
// for how to initialize and compute isocontours   
//

// Header Documentation
// Author of the completed assignment: Emilio Popovits Blake
// Date: November 17th, 2021
//
// This file extends the template code provided for A11 by Joshua
// A. Levine, calculating the isocontours for each plot (part 1) 
// and also calculating the filled and layerd isocontours for part 2.



////////////////////////////////////////////////////////////////////////
// Global variables, preliminaries, and helper functions

let svgSize = 490;
let bands = 49;

let xScale = d3.scaleLinear().domain([0, bands]).  range([0, svgSize]);
let yScale = d3.scaleLinear().domain([-1,bands-1]).range([svgSize, 0]);

function createSvg(sel)
{
  return sel
    .append("svg")
    .attr("width", svgSize)
    .attr("height", svgSize);
}

function createGroups(data) {
  return function(sel) {
    return sel
      .append("g")
      .selectAll("rect")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", function(d) {
        return "translate(" + xScale(d.Col) + "," + yScale(d.Row) + ")";
      });
  };
}

d3.selection.prototype.callReturn = function(callable)
{
  return callable(this);
};

// This function returns the pair [min/max] for a cell d.
function gridExtent(d) {
  return [Math.min(d.NW, d.NE, d.SW, d.SE),
          Math.max(d.NW, d.NE, d.SW, d.SE)];
}



////////////////////////////////////////////////////////////////////////
// Functions for isocontouring

// Given a cell d and an isovalude value, this returns a 4-bit polarity
// signature in result.case as an integer [0,15].  Any bit that is 1
// indicates that the associate cell corner is on or above the contour.
// Returns it in a SE-SW-NE-NW bit sequence (0 1 2 3).
function polarity(d, value) {
  let result = {
    NW: d.NW < value ? 0 : 1,
    NE: d.NE < value ? 0 : 1,
    SW: d.SW < value ? 0 : 1,
    SE: d.SE < value ? 0 : 1
  };
  result.case = result.NW + result.NE * 2 + result.SW * 4 + result.SE * 8;
  return result;
}

// currentContour is a global variable which stores the value
// of the contour we are currently extracting
var currentContour;

function includesOutlineContour(d) {
  let extent = gridExtent(d);
  return currentContour >= extent[0] && currentContour <= extent[1];
}

function includesFilledContour({ NW, NE, SW, SE }) {
  // TODO: WRITE THIS PART
  // Concatinates all data into an array to be able to loop through it easily
  let allData = [NW, NE, SW, SE];

  // Checks if at least one point is higher than the current contour. If this 
  // happens, it means that all of the points are not below the isovalue 
  // (checking for case 0).
  let allLowerFlag = false;
  allData.forEach(datum => datum > currentContour ? allLowerFlag = true : []);
  
  // Checks if at least one point is lower than the current contour. If this 
  // happens, it means that all of the points are not above the isovalue 
  // (checking for case 15).
  let allUpperFlag = true;
  allData.forEach(datum => datum < currentContour ? allUpperFlag = true : []);

  // Returns true if the current contour is either case 0 or case 15. False if
  // otherwise.
  return !allLowerFlag || !allUpperFlag;
}

function generateOutlineContour(d) {
  // HINT: you should set up scales which, given a contour value, can be
  // used to interpolate the function along each side in the boundary of
  // the square
  
  // Sets up d3 scales for west, east, north south (for linear interpolation).
  // The cell's upper left hand corner's local coordinates are (0,0), and the 
  // cell's lower right hand corner's local coordinates are (10,10). All values 
  // are mapped between those coordinates.
  const { NW, SW, NE, SE } = d;
  let wScale = d3.scaleLinear().domain([NW, SW]).range([10, 0]);
  let eScale = d3.scaleLinear().domain([NE, SE]).range([10, 0]);
  let nScale = d3.scaleLinear().domain([NW, NE]).range([0, 10]);
  let sScale = d3.scaleLinear().domain([SW, SE]).range([0, 10]);
  
  switch (polarity(d, currentContour).case) {
    // TODO: WRITE THIS PART.
    case 0:  
      return "";
    case 1:
      return `M 0 ${wScale(currentContour)} L ${nScale(currentContour)} 10`;
    case 2:
      return `M ${nScale(currentContour)} 10 L 10 ${eScale(currentContour)}`;
    case 3:
      return `M 0 ${wScale(currentContour)} L 10 ${eScale(currentContour)}`;
    case 4:
      return `M 0 ${wScale(currentContour)} L ${sScale(currentContour)} 0`;
    case 5:
      return `M ${nScale(currentContour)} 10 L ${sScale(currentContour)} 0`;
    case 6:
      return `M 0 ${wScale(currentContour)} L ${nScale(currentContour)} 10 M 10 ${eScale(currentContour)} L ${sScale(currentContour)} 0`;
    case 7:
      return `M ${sScale(currentContour)} 0 L 10 ${eScale(currentContour)}`;
    case 8:
      return `M ${sScale(currentContour)} 0 L 10 ${eScale(currentContour)}`;
    case 9:
      return `M 0 ${wScale(currentContour)} L ${sScale(currentContour)} 0 M 10 ${eScale(currentContour)} L ${nScale(currentContour)} 10`;
    case 10:
      return `M ${nScale(currentContour)} 10 L ${sScale(currentContour)} 0`;
    case 11:
      return `M 0 ${wScale(currentContour)} L ${sScale(currentContour)} 0`;
    case 12:
      return `M 0 ${wScale(currentContour)} L 10 ${eScale(currentContour)}`;
    case 13:
      return `M ${nScale(currentContour)} 10 L 10 ${eScale(currentContour)}`;
    case 14:
      return `M 0 ${wScale(currentContour)} L ${nScale(currentContour)} 10`;
    case 15:  
    default:
      return "";
    
  }
}

function generateFilledContour(d) {
  // HINT: you should set up scales which, given a contour value, can be
  // used to interpolate the function along each side in the boundary of
  // the square
  const { NW, SW, NE, SE } = d;
  let wScale = d3.scaleLinear().domain([NW, SW]).range([10, 0]);
  let eScale = d3.scaleLinear().domain([NE, SE]).range([10, 0]);
  let nScale = d3.scaleLinear().domain([NW, NE]).range([0, 10]);
  let sScale = d3.scaleLinear().domain([SW, SE]).range([0, 10]);
  
  switch (polarity(d, currentContour).case) {
    // TODO: WRITE THIS PART.
    case 0:
      return `M 0 10 H 10 V 0 H 0 V 10`;
    case 1:
      return `M 0 ${wScale(currentContour)} L ${nScale(currentContour)} 10 H 0 V ${wScale(currentContour)}`;
    case 2:
      return `M ${nScale(currentContour)} 10 L 10 ${eScale(currentContour)} V 10 H ${nScale(currentContour)}`;
    case 3:
      return `M 0 ${wScale(currentContour)} L 10 ${eScale(currentContour)} V 0 H 0 V ${wScale(currentContour)}`;
    case 4:
      return `M 0 ${wScale(currentContour)} L ${sScale(currentContour)} 0 H 0 V ${wScale(currentContour)}`;
    case 5:
      return `M ${nScale(currentContour)} 10 L ${sScale(currentContour)} 0 H 10 V 10 H ${nScale}`;
    case 6:
      return `M 0 ${wScale(currentContour)} L ${nScale(currentContour)} 10 H 0 V ${wScale(currentContour)} M 10 ${eScale(currentContour)} L ${sScale(currentContour)} 0 H 10 V ${eScale(currentContour)}`;
    case 7:
      return `M ${sScale(currentContour)} 0 L 10 ${eScale(currentContour)} V 0 H ${sScale(currentContour)}`;
    case 8:
      return `M ${sScale(currentContour)} 0 L 10 ${eScale(currentContour)} V 0 H ${sScale(currentContour)}`;
    case 9:
      return `M 0 ${wScale(currentContour)} L ${sScale(currentContour)} 0 H 0 V ${wScale(currentContour)} M 10 ${eScale(currentContour)} L ${nScale(currentContour)} 10 H 10 V ${eScale(currentContour)}`;
    case 10:
      return `M ${nScale(currentContour)} 10 L ${sScale(currentContour)} 0 H 0 V 10 H ${nScale(currentContour)}`;
    case 11:
      return `M 0 ${wScale(currentContour)} L ${sScale(currentContour)} 0 H 0 V ${wScale(currentContour)}`;
    case 12:
      return `M 0 ${wScale(currentContour)} L 10 ${eScale(currentContour)} V 10 H 0 V ${wScale(currentContour)}`;
    case 13:
      return `M ${nScale(currentContour)} 10 L 10 ${eScale(currentContour)} V 10 H ${nScale(currentContour)}`;
    case 14:
      return `M 0 ${wScale(currentContour)} L ${nScale(currentContour)} 10 H 0 V ${wScale(currentContour)}`;
    case 15:
      return `M 0 10 H 10 V 0 H 0 V 10`;
    default:
      return '';
  }
}



////////////////////////////////////////////////////////////////////////
// Visual Encoding portion that handles the d3 aspects


// d3 function to compute isocontours for all cells that span given a
// range of values, [minValue,maxValues], this function produces a set
// of size "steps" isocontours to be added to the selection "sel"
function createOutlinePlot(minValue, maxValue, steps, sel)
{
  let contourScale = d3.scaleLinear().domain([1, steps]).range([minValue, maxValue]);
  for (let i=1; i<=steps; ++i) {
    currentContour = contourScale(i);
    // If cell lies within cases 1-15, add path
    sel.filter(includesOutlineContour).append("path")
      .attr("transform", "translate(0, 10) scale(1, -1)") // ensures that positive y points up
      .attr("d", generateOutlineContour)
      .attr("fill", "none")
      .attr("stroke", "black");
  }
}

// d3 function to compute filled isocontours for all cells that span
// given a range of values, [minValue,maxValues], this function produces
// a set of size "steps" isocontours to be added to the selection "sel".
// colorScale is used to assign their fill color.
function createFilledPlot(minValue, maxValue, steps, sel, colorScale)
{
  let contourScale = d3.scaleLinear().domain([1, steps]).range([minValue, maxValue]);
  for (let i=steps; i>=1; --i) {
    currentContour = contourScale(i);
    sel.filter(includesFilledContour).append("path")
      .attr("transform", "translate(0, 10) scale(1, -1)") // ensures that positive y points up
      .attr("d", generateFilledContour)
      .attr("fill", function(d) { return colorScale(currentContour); });
  }
  // const i = 4;
  // currentContour = contourScale(i);
  // sel.filter(includesFilledContour).append("path")
  //   .attr("transform", "translate(0, 10) scale(1, -1)") // ensures that positive y points up
  //   .attr("d", generateFilledContour)
  //   .attr("fill", function(d) { return colorScale(currentContour); });
}

// Compute the isocontour plots
let plot1T = d3.select("#plot1-temperature")
    .callReturn(createSvg)
    .callReturn(createGroups(temperatureCells));
let plot1P = d3.select("#plot1-pressure")
    .callReturn(createSvg)
    .callReturn(createGroups(pressureCells));

createOutlinePlot(-70, -60, 10, plot1T);
createOutlinePlot(-500, 200, 10, plot1P);

// Compute the filled isocontour plots
let plot2T = d3.select("#plot2-temperature")
    .callReturn(createSvg)
    .callReturn(createGroups(temperatureCells));
let plot2P = d3.select("#plot2-pressure")
    .callReturn(createSvg)
    .callReturn(createGroups(pressureCells));

createFilledPlot(-70, -60, 10, plot2T, 
              d3.scaleLinear()
                .domain([-70, -60])
                .range(["blue", "red"]));
createFilledPlot(-500, 200, 10, plot2P, 
              d3.scaleLinear()
                .domain([-500, 0, 500])
                .range(["#ca0020", "#f7f7f7", "#0571b0"]));
