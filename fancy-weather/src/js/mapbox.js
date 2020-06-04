/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const getMapbox = (latitude, longitude) => {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWlzc2Rhc2hhOCIsImEiOiJja2F2NjkwMjgwbXI3MnFwZzN4NGFkZWNxIn0.lIalGKVbJY9_aIqdSDtxXQ';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [longitude, latitude],
        zoom: 10
    });
    const marker = new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(map);
    return map;
}

export default getMapbox;