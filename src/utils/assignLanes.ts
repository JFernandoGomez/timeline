import { TimeLineItem } from "../data/timelineItems";

/**
 * Takes an array of items and assigns them to lanes based on start/end dates.
 * @returns an array of arrays containing items.
 */
const assignLanes = (items: TimeLineItem[]) => {
	const sortedItems = items.sort((a, b) => {
		const aStart = a.start;
		const bStart = b.start;
		return new Date(aStart).valueOf() - new Date(bStart).valueOf();
	});
	const lanes: Array<TimeLineItem[]> = [];

	function assignItemToLane(item: TimeLineItem) {
		for (const lane of lanes) {
			if (new Date(lane[lane.length - 1].end) < new Date(item.start)) {
				lane.push(item);
				return;
			}
		}
		lanes.push([item]);
	}

	for (const item of sortedItems) {
		assignItemToLane(item);
	}
	return lanes;
};

export default assignLanes;
