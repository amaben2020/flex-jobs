"use client";
/* eslint-disable react/display-name */
import React, { forwardRef, MutableRefObject, useMemo, useState } from "react";
import { Input } from "../ui/input";
import { citiesList } from "./../../../lib/cities-list";

interface ILocationInput extends React.InputHTMLAttributes<HTMLInputElement> {
  onLocationSelected: (location: string) => void;
  ref: MutableRefObject<HTMLInputElement | unknown> | any;
}
const LocationInput = forwardRef((props: ILocationInput, ref) => {
  const [locationSearchInput, setLocationSearchInput] = useState("");
  const [hasFocus, setHasFocus] = useState(false);
  const cities = useMemo(() => {
    if (!locationSearchInput.trim()) {
      return [];
    }
    const searchWords = locationSearchInput.toLowerCase().split(" ");
    return citiesList
      .map((city) => `${city.name}, ${city.country}, ${city.subcountry}`)
      .filter(
        (city) =>
          city.toLowerCase().startsWith(searchWords[0]) &&
          searchWords.every((word) =>
            city.toLowerCase().includes(word.toLowerCase()),
          ),
      )
      .slice(0, 5);
  }, [locationSearchInput]);
  return (
    <>
      <Input
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
        {...props}
        //@ts-ignore
        ref={ref}
        value={String(locationSearchInput)}
        onChange={(e) => setLocationSearchInput(e.target.value)}
      />

      {locationSearchInput.trim() && hasFocus && (
        <div>{!cities.length && <p>No Result found</p>}</div>
      )}

      {hasFocus &&
        cities.map((city: any) => (
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              props.onLocationSelected(city);
              setLocationSearchInput("");
            }}
            key={city}
            className="block w-full divide-y p-2 text-start"
          >
            {city}
          </button>
        ))}
    </>
  );
});

export default LocationInput;
