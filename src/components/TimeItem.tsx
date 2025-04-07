import { useContext } from "react";
import { TimeLineContext } from "../data/TimeLineContext";
import { TimeLineItem } from "../data/timelineItems";
import { formatDateToLocale, getDaySpan } from "../utils/utils";

const TimeItem = ({ item }: { item: TimeLineItem }) => {
  const daySpan = getDaySpan(item.start, item.end);
  const startSpan = item.start.replaceAll("-", "");
  const column = `span ${daySpan}`;

  const {
    state: { zoomLevel }, dispatch
  } = useContext(TimeLineContext);

  return (
    <div
      style={{
        backgroundColor: "rgba(255,255,255,0.5)",
        padding: "10px 20px",
        borderRadius: "10px",
        gridArea: `d${startSpan}`,
        minWidth: `${parseFloat(zoomLevel.toFixed(3))}px`,
        gridColumnEnd: column,
        zIndex: 100,
        position: "relative",
				cursor: "grab",
      }}
			onClick={() => {
				dispatch({
					type: 'selectedItem',
					payload: item,
				})
			}}
    >
      <div
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {item.name}
      </div>
      <div
        style={{
          position: "absolute",
          top: "-15px",
          left: "0px",
          fontSize: "10px",
          backgroundColor: "rgba(0,0,0,0.1)",
          padding: "2px 5px",
          borderRadius: "5px",
          borderBottomLeftRadius: "0",
        }}
      >
        {formatDateToLocale(item.start)}
      </div>
    </div>
  );
};

export default TimeItem;
