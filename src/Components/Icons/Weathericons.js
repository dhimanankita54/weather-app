import React from "react";

export const WeatherIcons = props => {
  return props.weatherIcon.map((icon, i) => {
    return (
      <i className={`icon-${icon}`} aria-label={props.weatherType} key={i}></i>
    );
  });
};