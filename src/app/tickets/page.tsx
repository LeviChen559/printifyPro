"use client";

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => {
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    return res.json();
});

const TicketDashboard = () => {
    const { data, error } = useSWR('/api/getTickets', fetcher);

    // Log the data to check its structure
    console.log(data);

    // Handle loading and error states
    if (!data) return <div>Loading...</div>;
    if (error) return <div>Failed to load: {error.message}</div>;

    // Ensure data is an array before mapping
    if (!Array.isArray(data)) {
        return <div>Unexpected data format</div>;
    }

    return (
        <div>
            {data.map((ticket: { id: string; name: string }) => (
                <div key={ticket.id}>{ticket.name}</div>
            ))}
        </div>
    );
};

export default TicketDashboard;