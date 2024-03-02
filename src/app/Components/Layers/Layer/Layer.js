import styles from "./Layer.module.css";

export default function Layer({ layers, setLayers, index }) {
  const setParameter = (param, value) => {
    setLayers((prevLayers) => {
      const newLayers = [...prevLayers];
      newLayers[index][param] = value;
      return newLayers;
    });
  };

  const removeLayer = () => {
    setLayers((prevLayers) => {
      const newLayers = [...prevLayers];
      newLayers.splice(index, 1);
      return newLayers;
    });
  };

  return (
    <div className={styles.outerContainer}>
      <h2>{getFullLayerName(layers[index])}</h2>
      {GetCorrespondingLayer(layers, index, setParameter, removeLayer)}
    </div>
  );
}

const GetCorrespondingLayer = (layers, index, setParam, removeLayer) => {
  switch (layers[index].type) {
    case "conv":
      return (
        <ConvLayer
          layer={layers[index]}
          setParam={setParam}
          removeLayer={removeLayer}
        />
      );
    case "pool":
      return (
        <PoolLayer
          layer={layers[index]}
          setParam={setParam}
          removeLayer={removeLayer}
        />
      );
    case "transconv":
      return (
        <TransConvLayer
          layer={layers[index]}
          setParam={setParam}
          removeLayer={removeLayer}
        />
      );
    default:
      return null;
  }
};

const ConvLayer = ({ layer, setParam, removeLayer }) => {
  return (
    <div className={styles.SingleLayerContainer}>
      <div>
        <h2>Kernel Size</h2>
        <input
          type="number"
          value={layer.kernel}
          onChange={(e) => setParam("kernel", e.target.value)}
        />
      </div>
      <div>
        <h2>Stride</h2>
        <input
          type="number"
          value={layer.stride}
          onChange={(e) => setParam("stride", e.target.value)}
        />
      </div>
      <div>
        <h2>Padding</h2>
        <input
          type="number"
          value={layer.padding}
          onChange={(e) => setParam("padding", e.target.value)}
        />
      </div>
      <div>
        <h2>Channels</h2>
        <input
          type="number"
          value={layer.channels}
          onChange={(e) => setParam("channels", e.target.value)}
        />
      </div>
      <div>
        <button onClick={removeLayer}>Remove Layer</button>
      </div>
    </div>
  );
};

const PoolLayer = ({ layer, setParam, removeLayer }) => {
  return (
    <div className={styles.SingleLayerContainer}>
      <div>
        <h2>Kernel Size</h2>
        <input
          type="number"
          value={layer.kernel}
          onChange={(e) => setParam("kernel", e.target.value)}
        />
      </div>
      <div>
        <h2>Stride</h2>
        <input
          type="number"
          value={layer.stride}
          onChange={(e) => setParam("stride", e.target.value)}
        />
      </div>
      <div>
        <h2>Padding</h2>
        <input
          type="number"
          value={layer.padding}
          onChange={(e) => setParam("padding", e.target.value)}
        />
      </div>
      <div>
        <button onClick={removeLayer}>Remove Layer</button>
      </div>
    </div>
  );
};

const TransConvLayer = ({ layer, setParam, removeLayer }) => {
  return (
    <div className={styles.SingleLayerContainer}>
      <div>
        <h2>Kernel Size</h2>
        <input
          type="number"
          value={layer.kernel}
          onChange={(e) => setParam("kernel", e.target.value)}
        />
      </div>
      <div>
        <h2>Stride</h2>
        <input
          type="number"
          value={layer.stride}
          onChange={(e) => setParam("stride", e.target.value)}
        />
      </div>
      <div>
        <h2>Padding</h2>
        <input
          type="number"
          value={layer.padding}
          onChange={(e) => setParam("padding", e.target.value)}
        />
      </div>
      <div>
        <h2>Output Padding</h2>
        <input
          type="number"
          value={layer.output_padding}
          onChange={(e) => setParam("output_padding", e.target.value)}
        />
      </div>
      <div>
        <h2>Channels</h2>
        <input
          type="number"
          value={layer.channels}
          onChange={(e) => setParam("channels", e.target.value)}
        />
      </div>
      <div>
        <button onClick={removeLayer}>Remove Layer</button>
      </div>
    </div>
  );
};

const getFullLayerName = (layer) => {
  switch (layer.type) {
    case "conv":
      return "Convolution";
    case "pool":
      return "Pooling";
    case "transconv":
      return "Transpose Convolution";
    default:
      return "Unknown";
  }
};
