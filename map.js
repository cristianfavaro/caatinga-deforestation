mapboxgl.accessToken = 'pk.eyJ1IjoiY3Jpc2ZhdmFybyIsImEiOiJjbG0xOTFpcm8ycGcyM2ZwaHJrODNxcndhIn0.H8Xu-AtLW760J80cNDJGoQ';
const map = new mapboxgl.Map({
  container: 'map', // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: 'mapbox://styles/crisfavaro/clml8u25d04ac01p70em88rpt', // style URL
  center: [-44.62368, -10.20237], // starting position [lng, lat]
  zoom: 4, // starting zoom
  scrollZoom      : false,
  boxZoom         : false,
  doubleClickZoom : false

});





map.on('load', () => {
    map.resize();
    map.addSource('deforestation_circle', {
        type: 'geojson',
        // Use a URL for the value for the `data` property.
        data: 'https://cristianfavaro.github.io/caatinga-deforestation/caatinga.geojson'
    });

    map.addSource('municipalities_caatinga', {
        type: 'geojson',
        // Use a URL for the value for the `data` property.
        data: 'https://cristianfavaro.github.io/caatinga-deforestation/municipalities_caatinga.json'
    });
    
});
