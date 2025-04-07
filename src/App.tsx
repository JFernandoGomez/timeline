import { useContext, useEffect } from "react";
import "./App.css";
import ItemDetail from "./components/ItemDetail";
import TimeLane from "./components/TimeLane";
import { TimeLineContext } from "./data/TimeLineContext";
import useDeltaY from "./hooks/useDeltaY";
import { formatDateToLocale } from "./utils/utils";

function App() {
  const {
    state: { lanes, dateRange, selectedItem },
    dispatch,
  } = useContext(TimeLineContext);

  const [deltaY] = useDeltaY();

  useEffect(() => {
    dispatch({
      type: "zoomLevel",
      payload: deltaY,
    });
  }, [deltaY]);

  return (
    <>
      <h1>Airtable Timeline take home</h1>
      <h4>
        {dateRange && (
          <>
            Events From: {formatDateToLocale(dateRange?.firstDate)} to{" "}
            {formatDateToLocale(dateRange?.lastDate)}
          </>
        )}
      </h4>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "fit-content",
          minWidth: "-webkit-fill-available",
        }}
      >
        {lanes.map((lane, index) => (
          <TimeLane lane={lane} key={index} index={index} />
        ))}
      </div>
      {selectedItem && <ItemDetail item={selectedItem} />}
    </>
  );
}

export default App;
