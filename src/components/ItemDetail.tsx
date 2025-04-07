import { useContext } from "react";

import { TimeLineContext } from "../data/TimeLineContext";
import { TimeLineItem } from "../data/timelineItems";
import { formatDateToLocale, getDaySpan } from "../utils/utils";

const ItemDetail = ({ item }: { item: TimeLineItem }) => {
  const { dispatch } = useContext(TimeLineContext);
  const daySpan = getDaySpan(item.start, item.end);
  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "15px",
        backgroundColor: "var(--color-8)",
        padding: "15px 20px",
        borderRadius: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <div
          style={{
            fontSize: "12px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onClick={() => {
            dispatch({
              type: "selectedItem",
              payload: undefined,
            });
          }}
        >
          Close X
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "110px 1fr",
          alignItems: "center",
          fontSize: "16px",
        }}
      >
        <div style={{ fontSize: "14px", fontWeight: "bold" }}>Name:</div>
        <div>{item.name}</div>
        <div style={{ fontSize: "14px", fontWeight: "bold" }}>Start:</div>
        <div>{formatDateToLocale(item.start)}</div>
        <div style={{ fontSize: "14px", fontWeight: "bold" }}>End:</div>
        <div>{formatDateToLocale(item.end)}</div>
        <div style={{ fontSize: "14px", fontWeight: "bold" }}>
          Task spanned:
        </div>
        <div>{daySpan} days</div>
      </div>
    </div>
  );
};

export default ItemDetail;
