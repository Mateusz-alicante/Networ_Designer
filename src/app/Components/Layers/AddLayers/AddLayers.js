import styles from "./AddLayers.module.css";

const DEFAULT_LAYERS = {
  Conv: {
    type: "conv",
    kernel: 3,
    stride: 1,
    padding: 0,
    channels: 1,
  },
  Pool: {
    type: "pool",
    kernel: 2,
    stride: 2,
    padding: 0,
  },
  TransConv: {
    type: "transconv",
    kernel: 3,
    stride: 1,
    padding: 0,
    output_padding: 0,
    channels: 1,
  },
};

export default function InputLayer({ setLayers }) {
  const addLayer = (layer) => {
    setLayers((prevLayers) => {
      return [...prevLayers, layer];
    });
  };

  const handleAddLayer = (layerType) => {
    addLayer(DEFAULT_LAYERS[layerType]);
  };

  return (
    <div className={styles.outerContainer}>
      <h2>Layers</h2>
      <div className={styles.ButtonContainer}>
        <button onClick={() => handleAddLayer("Conv")}>Add Convolution</button>
        <button onClick={() => handleAddLayer("Pool")}>Add Pool</button>
        <button onClick={() => handleAddLayer("TransConv")}>
          Add Transpose Convolution
        </button>
      </div>
    </div>
  );
}
