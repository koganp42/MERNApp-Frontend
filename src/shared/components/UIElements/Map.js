import React, { useRef, useEffect } from "react";

//useEffect allows you to register a function that occurs upon change.
import "./Map.css";

const Map = props => {
  //using react hook useRef to create a variable in the JSX to serve as a pointer to the map.
  const mapRef = useRef();
  const { center, zoom } = props;

  //useEffect loads when the component renders and when the center or zoom properties change 
  //properties center and zoom in the array at the end of useEffect.
  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom
    });

    new window.google.maps.Marker({ position: center, map: map });
  }, [center, zoom]);
  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
