import styles from "./Controls.module.css";

import { useState } from "react";

export default function Controls({
  inputShape,
  layers,
  setLayers,
  setInputShape,
}) {
  const [name, setName] = useState("");

  const downloadFile = () => {
    const data = {
      inputShape: inputShape,
      layers: layers,
      name: name,
    };

    const fileName = name;
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);

    // create "a" HTLM element with href to file
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".net";
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  const loadFile = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".net";
    document.body.appendChild(input);
    input.click();
    input.onchange = (e) => {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          setInputShape(data.inputShape);
          setLayers(data.layers);
          setName(data.name);
        } catch (error) {
          console.error("Error parsing file:", error);
        }
      };
      fileReader.readAsText(e.target.files[0], "UTF-8");

      // clean up "input" element
      document.body.removeChild(input);
    };
  };

  return (
    <div className={styles.outerContainer}>
      <div>
        <h3>Model name:</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={downloadFile}>Download</button>
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={loadFile}>Load Model From file</button>
      </div>
    </div>
  );
}
