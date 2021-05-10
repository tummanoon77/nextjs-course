import { useRouter } from 'next/router';
import { Fragment } from 'react';

import EventList from '../../components/events/event-list';
import {getFilteredEvents} from '../../dummy-data';
//import ResultsTitle from '../../components/events/results-title';

function FilteredEventsPage() {
    const router = useRouter();

    const filterData =router.query.slug;

    if (!filterData) {
        return <p className='center'>Loading...</p>;
    }

    const filteredYear = filterData [0];
    const filteredMonth = filterData[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 || 
    numYear < 2021 ||
    numMonth > 12 || 
    numMonth < 1
    ) {
        return <p>Invalid filter please adjust your value!</p>
    }

   const filteredEvents = getFilteredEvents({
        year: numYear,
        month: numMonth,
    });

    if (!filteredEvents || filteredEvents.length === 0) {
        return <p>No events found for the chosen filter!</p>
    }

    return(
        <Fragment>
          <EventList items={filteredEvents} />
         
        </Fragment>
    );
}

export default FilteredEventsPage;