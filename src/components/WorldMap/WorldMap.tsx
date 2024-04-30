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

interface WorldMapProps {
  locationsJson?: string;
}

// TODO: Allow this to be fetched from an api, or maybe google sheet
interface Marker {
  markerOffset: number;
  name: string;
  coordinates: number[];
  information?: string;
  link?: string;
  size?: number;
  color?: string;
  stroke?: string;
  strokeWidth?: number;
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


const markers = [
  { markerOffset: -20, name: "Chicago", coordinates: [-87.6298, 41.8781] },
  { markerOffset: -20, name: "Boston", coordinates: [-71.0589, 42.3601] },
  { markerOffset: -20, name: "Tulsa", coordinates: [-95.9928, 36.154] },
  { markerOffset: -20, name: "Baltimore", coordinates: [-76.6122, 39.2904] },
  { markerOffset: -20, name: "Miami", coordinates: [-80.1918, 25.7617] },
  {
    markerOffset: 30,
    name: "Washington, D.C.",
    coordinates: [-77.0369, 38.9072],
  },
  { markerOffset: -20, name: "Los Angeles", coordinates: [-118.2426, 34.0549] },
];

const MapChart = (props: WorldMapProps) => {
  const markersToUse: Marker[] = useMemo(() => {
    try {
      return props.locationsJson ? JSON.parse(props.locationsJson) : markers;
    } catch (e) {
      return [];
    }
  }, [props.locationsJson]);
  const mousePosition = useMousePosition();
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [currentMarker, setCurrentMarker] = useState<Marker | undefined>(undefined);

  return (
    <>
    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={geoUrl}>
        {({ geographies, outline, borders }) => (
          <>
            <Geography geography={outline} fill="#E9E3DA" />
            <Geography geography={borders} fill="none" stroke="#FFF" />
          </>
        )}
      </Geographies>
      {markersToUse.map((marker, index) => (
        <Marker
          key={index}
          coordinates={marker.coordinates}
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
      {currentMarker?.link && (<div><br /><a href={currentMarker?.link}/></div>)}
    </div>
    </>
  );
};

export default MapChart;
