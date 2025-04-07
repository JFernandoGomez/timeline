import { TimeLineItem } from "../data/timelineItems";

export const bgColorPicker = (index: number): string => {
	const wrappedIndex = (index % 8) + 1; // ensures the index cycles from 1 to 8
	return `var(--color-${wrappedIndex})`;
};


export const getFirstAndLastDates = (timelineItems: TimeLineItem[]) => {
  if (!timelineItems || timelineItems.length === 0) {
    return;
  }

  let earliestStart = timelineItems[0].start;
  let latestEnd = timelineItems[0].end;

  for (const range of timelineItems) {
    if (range.start < earliestStart) {
      earliestStart = range.start;
    }
    if (range.end > latestEnd) {
      latestEnd = range.end;
    }
  }

  return {
    firstDate: earliestStart,
    lastDate: latestEnd
  };
}
 
export const getDaySpan = (startDateStr: string, endDateStr: string): number => {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  const diffTime = endDate.getTime() - startDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays + 1 ;
}

export const getGridDateAreasStr = (firstDate: string, lastDate: string): string => {
  const start = new Date(firstDate);
  const end = new Date(lastDate);

  end.setDate(end.getDate() + 1)

  const result: string[] = [];
  const current = new Date(start);

  while (current <= end) {
    const year = current.getFullYear();
    const month = (current.getMonth() + 1).toString().padStart(2, '0');
    const day = current.getDate().toString().padStart(2, '0');
    result.push(`d${year}${month}${day}`);

    // Move to next day
    current.setDate(current.getDate() + 1);
  }
  
  return result.join(' ');
}


export const formatDateToLocale = (dateString: string, locale: string = 'en-US'): string => {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export const calculateZoom = (actualValue: number, deltaY: number): number => {
  // const actualValue = 100; 
  const offset = deltaY / 10;
  const rawValue = actualValue + offset;

  // Clamp the value between 20 and 400
  const clampedValue = Math.max(10, Math.min(300, rawValue));

  return clampedValue;
}