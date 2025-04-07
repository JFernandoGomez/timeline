import { useContext } from "react";
import { Fragment } from "react/jsx-runtime";
import { TimeLineContext } from "../data/TimeLineContext";
import { TimeLineItem } from "../data/timelineItems";
import { bgColorPicker, getDaySpan, getGridDateAreasStr } from "../utils/utils";
import TimeItem from "./TimeItem";

const TimeLane = ({ lane, index }: { lane: TimeLineItem[]; index: number }) => {
  const {
    state: { dateRange, zoomLevel },
  } = useContext(TimeLineContext);

  const totalDaySpan = dateRange
    ? getDaySpan(dateRange?.firstDate, dateRange?.lastDate)
    : 100;

  const gridAreas = dateRange
    ? getGridDateAreasStr(dateRange?.firstDate, dateRange?.lastDate)
    : "";

  const gridTemplateColumns = `repeat(${totalDaySpan}, minMax(${zoomLevel}px, auto))`;

  return (
    <div
      style={{
        margin: "10px 0",
        padding: "16px",
        borderRadius: "16px",
        display: "grid",
        gap: 3,
        backgroundColor: bgColorPicker(index),
        gridTemplateColumns,
        gridTemplateAreas: `"${gridAreas}"`,
        width: "fit-content",
        minWidth: "-webkit-fill-available",
      }}
      key={index}
    >
      {lane.map((item) => (
        <Fragment key={item.id}>
          <TimeItem item={item} />
        </Fragment>
      ))}
    </div>
  );
};

export default TimeLane;
