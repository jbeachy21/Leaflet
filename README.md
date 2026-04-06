# Earthquake Visualization (Leaflet)

## Overview
This project visualizes real-time earthquake data on an interactive map using Leaflet. Earthquake data is fetched from an external API and displayed with dynamic markers that reflect magnitude and depth.

This project demonstrates working with geospatial data, external APIs, and building interactive data visualizations in the browser.

## Live Demo
Try it here: https://leaflet-omega.vercel.app

## Demo
![App Demo](./gif/demo.gif)

## Features
- Display real-time earthquake data on an interactive map
- Scale marker size based on earthquake magnitude
- Color-code markers based on depth
- Show detailed information via popups
- Interactive map controls (zoom, pan)

## Tech Stack
- JavaScript (Vanilla)
- Leaflet.js
- HTML / CSS
- External API (USGS earthquake data)

## How It Works
- Fetch earthquake data from the USGS API
- Parse and map data to geographic coordinates
- Render markers dynamically using Leaflet
- Apply styling based on magnitude and depth

## Example Functionality
- Larger earthquakes → larger markers  
- Deeper earthquakes → different color  
- Clicking a marker → detailed earthquake info  

## Purpose
This project demonstrates working with real-world data, building interactive visualizations, and integrating mapping libraries into web applications.
