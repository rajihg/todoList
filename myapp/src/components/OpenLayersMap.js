import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Style, Icon } from 'ol/style';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import LocationPin from '../images/marker-icon.png';

const OpenLayersMap = ({ onLocationSelected }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!mapInstance.current) {
      mapInstance.current = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: [0, 0],
          zoom: 2,
        }),
      });

      const markersLayer = new VectorLayer({
        source: new VectorSource(),
      });
      mapInstance.current.addLayer(markersLayer);

      mapInstance.current.on('click', (event) => {
        const clickedCoordinate = event.coordinate;
        onLocationSelected(clickedCoordinate);
        markersLayer.getSource().clear();

        const markerFeature = new Feature({
          geometry: new Point(clickedCoordinate),
        });

        const iconStyle = new Style({
          image: new Icon({
            src: LocationPin,
            anchor: [0.5, 1],
          }),
        });

        markerFeature.setStyle(iconStyle);
        markersLayer.getSource().addFeature(markerFeature);
      });
    }
  }, [onLocationSelected]);

  return <div ref={mapRef} style={{ width: '100%', height: '200px', paddingTop: '25px', paddingBottom: '25px' }} />;
};

export default OpenLayersMap;
