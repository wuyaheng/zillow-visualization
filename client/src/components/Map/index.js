import React from "react";
import L from "leaflet";


export default (props) => {
  console.log(props.pins.length)
  React.useEffect(() => {
    const MAP_CONTAINER = document.getElementById("map-container");

    if (props.lat && props.lon && props.pins) {
      const MAP_ID = document.createElement("div");
      MAP_ID.setAttribute("id", "mapid");
      MAP_CONTAINER.appendChild(MAP_ID);

      const mymap = L.map("mapid").setView([props.lat, props.lon], 13);

      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
          accessToken: process.env.REACT_APP_MAP_API_KEY,
        }
      ).addTo(mymap);

      var convertUndefined = (a) => ((typeof a !== 'undefined') && (a !== null)) ? a : "Unknown"

      props.pins.forEach((pin) => {
        let zillowLink = generateZillowLink(pin)
        if (pin.latitude === null || pin.longitude === null) { return } 
        L.marker([pin.latitude, pin.longitude]).addTo(mymap).bindTooltip('<img class="rounded mx-auto d-block" width="100%" src=' + convertUndefined(pin.imgSrc) + '><br/><b>Address:</b> ' + convertUndefined(pin.address) +
          '<br/><b>Days on Market: </b>' + convertUndefined(pin.daysOnZillow) + '<br/><b>Price: </b>' + (pin.price).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          }) + '<br/><b>Property Type: </b>' + convertUndefined(pin.propertyType).toLowerCase() +
          '<br/><b>Square Footage: </b>' + convertUndefined(pin.livingArea) + '<br/><b>Bedrooms: </b>' + convertUndefined(pin.bedrooms) + '<br/><b>Bathrooms: </b>' + convertUndefined(pin.bathrooms) +
          '<br/><a target="_blank" href=' + convertUndefined(zillowLink) + '>Click pin to see on zillow.com</a>').on("click", () => {window.open(zillowLink, '_blank').focus();})

      });
    }

    return () => (MAP_CONTAINER.innerHTML = "");
  }, [props.lat, props.lon, props.pins]);

  return <div id = "map-container" > </div>;
};


function generateZillowLink(pin) {
  let dashAddress = pin.address.replace(/,/g,"").replace(/ /g,"-").replace(/#/g,"")
  return `https://www.zillow.com/homedetails/${dashAddress}/${pin.zpid}_zpid`
}