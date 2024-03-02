import styles from "./InputLayer.module.css";

export default function InputLayer({ editable, values, setValues }) {
  const updateValues = (index, value) => {
    setValues((oldVal) => {
      const newVal = [...oldVal];
      newVal[index] = value;
      return newVal;
    });
  };

  return (
    <div className={styles.outerContainer}>
      <div className={styles.singleElementContainer}>
        <h2>Channels</h2>
        <input
          type="number"
          value={values[0]}
          onChange={(e) => updateValues(0, e.target.value)}
          disabled={!editable}
        />
      </div>
      <div className={styles.singleElementContainer}>
        <h2>Height</h2>
        <input
          type="number"
          value={values[1]}
          onChange={(e) => updateValues(1, e.target.value)}
          disabled={!editable}
        />
      </div>

      <div className={styles.singleElementContainer}>
        <h2>Width</h2>
        <input
          type="number"
          value={values[2]}
          onChange={(e) => updateValues(2, e.target.value)}
          disabled={!editable}
        />
      </div>
    </div>
  );
}
