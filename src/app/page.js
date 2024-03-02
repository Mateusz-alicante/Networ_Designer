"use client";

import Image from "next/image";
import styles from "./page.module.css";

import { useState, useEffect } from "react";

import InputLayer from "./Components/InputLayer/InputLayer";
import AddLayers from "./Components/Layers/AddLayers/AddLayers";
import Layer from "./Components/Layers/Layer/Layer";
import Controls from "./Components/Controls/Controls";

export default function Home() {
  const [inputShape, setInputShape] = useState([1, 28, 28]);
  const [layers, setLayers] = useState([]);
  const [outputShape, setOutputShape] = useState([1, 28, 28]);

  useEffect(() => {
    console.log(inputShape);
    // update output shape
    let shape = inputShape;
    layers.forEach((layer) => {
      if (layer.type === "conv") {
        shape = [
          layer.channels,
          Math.floor(
            (shape[1] + 2 * layer.padding - layer.kernel) / layer.stride + 1
          ),
          Math.floor(
            (shape[2] + 2 * layer.padding - layer.kernel) / layer.stride + 1
          ),
        ];
      } else if (layer.type === "pool") {
        shape = [
          shape[0],
          Math.floor((shape[1] - layer.kernel) / layer.stride + 1),
          Math.floor((shape[2] - layer.kernel) / layer.stride + 1),
        ];
      } else if (layer.type === "transconv") {
        shape = [
          layer.channels,
          (shape[1] - 1) * layer.stride +
            (layer.kernel - 1) -
            2 * layer.padding +
            layer.output_padding +
            1,
          (shape[2] - 1) * layer.stride +
            (layer.kernel - 1) -
            2 * layer.padding +
            layer.output_padding +
            1,
        ];
      }
    });
    setOutputShape(shape);
    console.log(shape);
  }, [layers, inputShape]);

  return (
    <main className={styles.main}>
      <h1>Network Designer</h1>
      <Controls
        inputShape={inputShape}
        setInputShape={setInputShape}
        layers={layers}
        setLayers={setLayers}
      />
      <h2>Input shape</h2>
      <InputLayer
        editable={true}
        values={inputShape}
        setValues={setInputShape}
      />
      <h2>Layers</h2>
      {layers.map((_, index) => {
        return (
          <Layer
            key={index}
            layers={layers}
            setLayers={setLayers}
            index={index}
          />
        );
      })}
      <AddLayers setLayers={setLayers} />
      <h2>Output shape</h2>
      <InputLayer editable={false} values={outputShape} setValues={() => {}} />
    </main>
  );
}
