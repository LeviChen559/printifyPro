import React,{useState} from 'react';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; 

const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
	<InfiniteCalendar
  displayOptions={{
    layout: 'landscape'
   }}
    		width={800}
    		height={400}
   		selected={startDate}
		onSelect={setStartDate}
  />    
  );
};


export default Calendar