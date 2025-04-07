import { createContext, Dispatch, useReducer } from "react";
import assignLanes from "../utils/assignLanes";
import { calculateZoom, getFirstAndLastDates } from "../utils/utils";
import timelineItems, { TimeLineItem } from "./timelineItems";
interface InitialState {
  isLoading: boolean;
  lanes: Array<TimeLineItem[]>;
  dateRange?: {
    firstDate: string;
    lastDate: string;
  };
  zoomLevel: number;
  selectedItem?: TimeLineItem;
}
const initialState: InitialState = {
  isLoading: false,
  lanes: assignLanes(timelineItems),
  dateRange: getFirstAndLastDates(timelineItems),
  zoomLevel: 10,
  selectedItem: undefined,
};

interface DefaultContext {
  state: InitialState;
  dispatch: Dispatch<ACTIONTYPE>;
}

type ACTIONTYPE =
  | { type: "isLoading"; payload: boolean }
  | { type: "lanes"; payload: Array<TimeLineItem[]> }
  | { type: "selectedItem"; payload: TimeLineItem | undefined }
  | { type: "zoomLevel"; payload: number };

function reducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case "isLoading":
      return { ...state, isLoading: action.payload };
    case "lanes":
      return { ...state, lanes: action.payload };
    case "zoomLevel": {
      const newZoom = calculateZoom(state.zoomLevel, action.payload);

      return { ...state, zoomLevel: newZoom };
    }
		case "selectedItem":
			return { ...state, selectedItem: action.payload };
  }
}

const defaultContext: DefaultContext = {
  state: initialState,
  dispatch: () => null,
};

export const TimeLineContext = createContext(defaultContext);

const TimeLineContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TimeLineContext.Provider value={{ state, dispatch }}>
      {children}
    </TimeLineContext.Provider>
  );
};

export default TimeLineContextProvider;
