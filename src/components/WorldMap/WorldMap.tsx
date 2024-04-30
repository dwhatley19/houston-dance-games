import React, { useMemo, useEffect, useState } from "react";
import { geoCentroid } from "d3-geo";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
} from "react-simple-maps";
import styles from "./styles.module.css";

import allStates from "./allstates.json";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const X_LOWER_BOUND = -125, X_UPPER_BOUND = -68;
const Y_LOWER_BOUND = 25, Y_UPPER_BOUND = 80;

// TODO: Allow this to be fetched from an api, or maybe google sheet
interface InputMarker {
  markerOffset: number;
  name: string;
  coordinates: {x: number, y: number};
  information?: string;
  link?: string;
  size?: number;
  color?: string;
  stroke?: string;
  strokeWidth?: number;
}

interface WorldMapProps {
  locations?: InputMarker[];
}

const useMousePosition = () => {
  const [
    mousePosition,
    setMousePosition
  ] = useState<{x: number | undefined, y: number | undefined}>({ x: undefined, y: undefined });
  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);
  return mousePosition;
};


const markers: InputMarker[] = [
  { markerOffset: -20, name: "Chicago", coordinates: {x: -87.6298, y: 41.8781} },
  { markerOffset: -20, name: "Boston", coordinates: {x: -71.0589, y: 42.3601} },
  { markerOffset: -20, name: "Tulsa", coordinates: {x: -95.9928, y: 36.154} },
  { markerOffset: -20, name: "Baltimore", coordinates: {x: -76.6122, y: 39.2904} },
  { markerOffset: -20, name: "Miami", coordinates: {x: -80.1918, y: 25.7617} },
  {
    markerOffset: 30,
    name: "Washington, D.C.",
    coordinates: {x: -77.0369, y: 38.9072},
  },
  { markerOffset: -20, name: "Los Angeles", coordinates: {x: -118.2426, y: 34.0549} },
];

const MapChart = (props: WorldMapProps) => {
  const markersToUse: InputMarker[] = (props.locations ?? []);
  const mousePosition = useMousePosition();
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [currentMarker, setCurrentMarker] = useState<InputMarker | undefined>(undefined);

  return (
    <>
    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={geoUrl}>
        {({ outline, borders }: {outline: string, borders: string}) => (
          <>
            <Geography geography={outline} fill="#E9E3DA" />
            <Geography geography={borders} fill="none" stroke="#FFF" />
          </>
        )}
      </Geographies>
      {markersToUse.map((marker, index) => (
        <Marker
          key={index}
          coordinates={[marker.coordinates.x, marker.coordinates.y]}
          id={marker.name}
          onMouseOver={() => {
            setTooltipVisible(true);
            setCurrentMarker(marker);
          }}
          onMouseOut={() => {
            setTooltipVisible(false);
          }}
         >
          <circle
            r={marker.size ?? 15}
            fill={marker.color ?? "#E42A1D"}
            stroke={marker.stroke ?? "#fff"}
            strokeWidth={marker.strokeWidth ?? 2}
          />
          {/* <text
            textAnchor="middle"
            y={markerOffset}
            style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
          >
            {name}
          </text> */}
        </Marker>
      ))}
    </ComposableMap>
    { /* TODO Add this style to a central stylesheet */ }
    <div style={{
      left: mousePosition.x ? mousePosition.x + 10 : undefined,
      top: mousePosition.y ? mousePosition.y + 10 : undefined,
      position: "fixed",
      display: tooltipVisible ? "block" : "none",
      border: "1px solid black",
      background: "black",
      wordWrap: "break-word",
      maxWidth: "400px",
    }}>
      <b>{currentMarker?.name}</b><br />
      {currentMarker?.information ?? "No information available yet."}
    </div>
    </>
  );
};

export default MapChart;
