<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Portfolio][moreinfo-shield]][moreinfo-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
<h3 align="center">Isocontour Generation for Hurricane Isabel</h3>

  <p align="center">
    A data visualization demonstration on isocontour generation using the marching squares algorithm on hurricane Isabel's temperature and pressure data.
    <br />
    <br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#included-files">Included Files</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![Screen Shot][product-screenshot]

This is a Data Visualization demonstration using D3 for creating an isocontouring visualization. Isocontouring is a technique for visualizing 3D data on a 2D plane by drawing lines that connect points of equal value. The main objective of this demonstration is the correct application of the marching squares algorithm to create an isocontour visualization of the given data.

The demo takes in data that represents a grid of cells, each cell containing four values (NW, NE, SW, SE) that represent the values of the corners of the cell. It first uses the D3 library to create an SVG element and scales the data to fit within the SVG element. It also creates a group element for each data point and positions two defined scaling functions.

Then, the demo defines two main functions for isocontouring: `polarity` and `includesOutlineContour`. The `polarity` function takes in a cell and an isovalue and returns a 4-bit polarity signature as an integer between 0 and 15. Any bit that is 1 indicates that the associated cell corner is on or above the contour. The `includesOutlineContour` function takes in a cell and returns a boolean indicating whether the cell includes the current contour. Using these functions, in conjunction with hurricane Isabel's data and D3, the demo outputs the filled and layered isocontour maps onto SVGs on a website.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

[![JavaScript][Javascript]][Javascript-url]
[![D3][D3]][D3-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- INCLUDED FILES -->
## Included Files

* `README.md` -- This file
* `index.html` -- Source HTML file
* `a11.js` -- Source JS file
* `d3.js` -- D3.js Library for creating visualizations
* `data.js` -- Source data JS file for Hurricane Isabel, provided by [Joshua A. Levine](mailto:josh@email.arizona.edu)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

**Note:** This project should be open only on desktop, as it is not optimized for mobile screens.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/empobla/Marching-Squares-Isocontour.git
   ```
2. Open `index.html` with a modern web browser (Chrome, Firefox, Safari, etc.)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

This project is property of Emilio Popovits Blake. All rights are reserved. Modification or redistribution of this code must have _explicit_ consent from the owner.

The source data for Hurricane Isabel was provided by Joshua A. Levine.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Emilio Popovits Blake - [Contact](https://emilioppv.com/contact)

Joshua A. Levine - [Email](mailto:josh@email.arizona.edu)

Project Link: [https://github.com/empobla/Marching-Squares-Isocontour](https://github.com/empobla/Marching-Squares-Isocontour)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/emilio-popovits

[product-screenshot]: README/images/thumbnail.png

[JavaScript]: https://img.shields.io/badge/javascript-f7df1e?style=for-the-badge&logo=javascript&logoColor=000000
[JavaScript-url]: https://www.javascript.com/
[D3]: https://img.shields.io/badge/d3.js-ffffff?style=for-the-badge&logo=d3dotjs&logoColor=f9a03c
[D3-url]: https://www.javascript.com/

[moreinfo-url]: https://emilioppv.com/projects#isocontour-generation-hurricane-isabel
[moreinfo-shield]: https://img.shields.io/badge/more%20info-1b1f24?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAApVBMVEUbHyQbHyQbHyRnam2sra+vsbKys7Wsrq+goqQwNDgaHyQaIilbXWGChIZMT1OYmpwYQFoaICYXRF8WUHQZLjwvMzdwcnaztLZ1d3pcX2IaICUXTG0WUHMXS2sXSGcWT3MaKjcpLTFVWFyFh4lTVllvcnWpqqwYOEwZM0QXTW4XTnAaJS8lKS3IycoYPlYaIyt4e36rra60tba5urutr7BQU1cAAAB8HBV3AAAAAnRSTlOR/KrCyFQAAAABYktHRDZHv4jRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5wEZCiUZVutNzgAAAGpJREFUCNdjYGBkggNGBmQeiM+EAjC5zCwsrGzsHJwQLhc3ExMPLxMfP5OAIBODkLCIqBi/uASHpJS0jCyDnLyCopIyh4qqmrqGphYDk5Q2WLGOrh63PsgoA0NDI2NDE1PsFqFw0RyJ6gUAuK4HVipJCoQAAAAuelRYdGRhdGU6Y3JlYXRlAAAImTMyMDLWNTDUNTINMTSwMja3MjLVNjCwMjAAAEFRBQlQZi6pAAAALnpUWHRkYXRlOm1vZGlmeQAACJkzMjAy1jUw1DUyDTE0sDI2tzIy1TYwsDIwAABBUQUJeVmGIQAAAABJRU5ErkJggg==
