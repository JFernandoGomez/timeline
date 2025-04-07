import { useEffect, useState } from "react";
import { addWheelListener, removeWheelListener } from "wheel";

/**
 * @init    const [deltaY] = useDeltaY();
 *
 * @returns document.onWheel event.deltaY
 */

export default function useDeltaY() {
  const [deltaY, setDeltaY] = useState<number>(0);
  const onWheel = (e: WheelEvent) => setDeltaY(e.deltaY);

  useEffect(() => {
    addWheelListener(document.body, onWheel);
    return () => removeWheelListener(document.body, onWheel);
  }, []);

  return [deltaY];
}
