const pointArray = [
        {"Name": "CC1", "Coords": [47.760785485800284, -122.19144283537825]},
        {"Name": "CC2", "Coords": [47.76126869564072, -122.1918012919779]},
        {"Name": "Discovery Hall", "Coords": [47.75901096541689, -122.19187604741245]},
        {"Name": "UW2", "Coords": [47.75857529935412, -122.19127933723816]},
        {"Name": "UW1", "Coords": [47.75899045183433, -122.19053861161326]},
    ]

mapboxgl.accessToken = 'pk.eyJ1IjoibWF4bWFsa2luIiwiYSI6ImNsczVpamxlODFoaG0ycnBhdzd1bTY4amMifQ.Rbe4ueQeIAE6AzCCbtIpqQ';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [-122.197772, 47.758864], // UW Bothell campus coordinates
    zoom: 15,
    maxBounds: [
        [-122.209049, 47.752314], // Southwest bound
        [-122.186492, 47.765457]  // Northeast bound
    ],
});

map.on('load', () => {
    // Add Mapbox GL navigation control
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add a marker for UW Bothell campus
    new mapboxgl.Marker()
        .setLngLat([-122.1911463, 47.758586])
        .addTo(map);

    // Add styled labels for building names
    map.addLayer({
        id: 'building-labels',
        type: 'symbol',
        source: {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: loadPoints(pointArray)
            },
        },
        layout: {
            'text-field': ['get', 'name'],
            'text-size': 12,
            'text-anchor': 'top',
        },
        paint: {
            'text-color': '#FFD700', // Gold text color
        },
    });
});

//Function to easily load an array containing names and coords
//Coords get reversed because copying points from google maps has it reversed from what mapbox uses so rather than switch them manually we can just paste the google coords in
function loadPoints(points){
    output = []
    points.forEach((e) => output.push(
        {
            type: 'Feature',
            properties: {
                name: e.Name,
            },
            geometry: {
                type: 'Point',
            coordinates: [e.Coords[1], e.Coords[0]], 
            }
        }
    ))
    return output
}