import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Style, Icon } from 'ol/style';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import LocationPin  from '../images/marker-icon.png';
import Select from 'ol/interaction/Select';
import Overlay from 'ol/Overlay';
import * as ReactDOM from 'react-dom';
import './DisplayMap.css';

const DisplayMap = ({ tasks }) => {
  const mapRef = useRef(null);
  const layerRef = useRef(null);
  const mapInstance = useRef(null);
  const overlayRef = useRef(null);

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
      layerRef.current = new VectorLayer({
        source: new VectorSource(),
      });
      mapInstance.current.addLayer(layerRef.current);
    }
  }, [])
 
  useEffect(() => {
    if (mapInstance.current) {
      layerRef.current.getSource().clear();
      const features = tasks.map((task) => {
        const markerFeature = new Feature({
          geometry: new Point(task.taskLocation),
        });

        const iconStyle = new Style({
          image: new Icon({
            src: LocationPin,
            color: task.isCompleted? 'lightgreen' : 'white',
            anchor: [0.5, 1],
          }),
        });

        markerFeature.setStyle(iconStyle);
        return markerFeature;
      });

      layerRef.current.getSource().addFeatures(features);
    }
  }, [tasks]);

  useEffect(() => {
    if (mapInstance.current) {
      const selectInteraction = new Select();
      mapInstance.current.addInteraction(selectInteraction);

      selectInteraction.on('select', (event) => {
        const selectedFeature = event.selected[0];

        if (selectedFeature) {
          const coordinates = selectedFeature.getGeometry().getCoordinates();
          const taskDetails = tasks.find(
            (task) =>
              task.taskLocation[0] === coordinates[0] && task.taskLocation[1] === coordinates[1]
          );
          if (taskDetails) {
            if (!overlayRef.current) {
                overlayRef.current = new Overlay({
                element: document.createElement('div'),
                positioning: 'top-center',
                offset: [0, -15],
              });

              mapInstance.current.addOverlay(overlayRef.current);
            }
            
            const popupContent = (
              <div className="popup-content">
                <strong>Task Details</strong>
                <p>Task Name: { taskDetails.taskName }</p>
                <p>Task Subject: { taskDetails.taskSubject }</p>
              </div>
            );

            ReactDOM.render(popupContent, overlayRef.current.getElement());
            overlayRef.current.setPosition(coordinates);
          }

        } else {
          if (overlayRef.current) {
            overlayRef.current.setPosition(undefined);
          }
        }
      });
    }
  }, [tasks]);

  return <div ref={mapRef} style={{ width: '100%', height: '600px', paddingTop: '200px' }} />;
};

export default DisplayMap;




















// import React, { useEffect, useRef, useState } from 'react';
// import 'ol/ol.css';
// import { Map, View } from 'ol';
// import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
// import { OSM, Vector as VectorSource } from 'ol/source';
// import { Style, Icon } from 'ol/style';
// import Feature from 'ol/Feature';
// import Point from 'ol/geom/Point';
// import LocationPin from '../images/marker-icon.png';
// import Select from 'ol/interaction/Select';
// import Overlay from 'ol/Overlay';
// import * as ReactDOM from 'react-dom';
// import './DisplayMap.css';


// const DisplayMap = (props) => {
//   const mapRef = useRef(null);
//   const mapInstance = useRef(null);
//   const overlayRef = useRef(null);

//   const { selectedLocations, tasks } = props;


//   useEffect(() => {
//     if (!mapInstance.current) {
//       mapInstance.current = new Map({
//         target: mapRef.current,
//         layers: [
//           new TileLayer({
//             source: new OSM(),
//           }),
//         ],
//         view: new View({
//           center: [0, 0],
//           zoom: 2,
//         }),
//       });
    
      
//       const markersLayer = new VectorLayer({
//         source: new VectorSource(),
//       });
//       mapInstance.current.addLayer(markersLayer);

//       markersLayer.getSource().clear();

//       const features = tasks.map((task) => {
//         const markerFeature = new Feature({
//           geometry: new Point(task.taskLocation),
//         });

//         const iconStyle = new Style({
//           image: new Icon({
//             src: LocationPin,
//             anchor: [0.5, 1],
//           }),
//         });

//         markerFeature.setStyle(iconStyle);
//         return markerFeature;
//       });

//       markersLayer.getSource().addFeatures(features);

//       const selectInteraction = new Select();
//       mapInstance.current.addInteraction(selectInteraction);

//       selectInteraction.on('select', (event) => {
//         const selectedFeature = event.selected[0];

//         if (selectedFeature) {
//           const coordinates = selectedFeature.getGeometry().getCoordinates();
//           const taskDetails = tasks.find(
//             (task) =>
//               task.taskLocation[0] === coordinates[0] && task.taskLocation[1] === coordinates[1]
//           );
//           if (taskDetails) {
//             if (!overlayRef.current) {
//                 overlayRef.current = new Overlay({
//                 element: document.createElement('div'),
//                 positioning: 'top-center',
//                 offset: [0, -15],
//               });

//               mapInstance.current.addOverlay(overlayRef.current);
//             }

//             const popupContent = (
//               <div className="popup-content">
//                 <strong>Task Details</strong>
//                 <p>Task Name: {taskDetails.taskName}</p>
//                 <p>Task Subject: {taskDetails.taskSubject}</p>
//                 <p>completed ? {taskDetails.isCompleted}</p>
//               </div>
//             );

//             ReactDOM.render(popupContent, overlayRef.current.getElement());
//             overlayRef.current.setPosition(coordinates);
//           }

//         } else {
//           if (overlayRef.current) {
//             overlayRef.current.setPosition(undefined);
//           }
//         }
//       });
//     }
// }, [tasks]);

//   return <div ref={mapRef} style={{ width: '100%', height: '600px', paddingTop: '200px' }} />;
// };

// export default DisplayMap;