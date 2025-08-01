import { useMemo } from 'react';

// third-party
import useSWR, { mutate } from 'swr';
import { v4 as UIDV4 } from 'uuid';

// project-imports

import { fetcher } from '@/utils/axios';

// types
import { EventInput } from '@fullcalendar/common';

export const endpoints = {
  key: 'api/calendar/events',
  add: '/add', // server URL
  udpate: '/update', // server URL
  delete: '/delete' // server URL
};

export function useGetEvents() {
  const { data, isLoading, error, isValidating } = useSWR(endpoints.key, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      events: data?.events as EventInput[],
      eventsLoading: isLoading,
      eventsError: error,
      eventsValidating: isValidating,
      eventsEmpty: !isLoading && !data?.length
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function createEvent(newEvent: Omit<EventInput, 'id'>) {
  // to update local state based on key
  mutate(
    endpoints.key,
    (currentEvents: any) => {
      const addedEvents: EventInput[] = [...currentEvents.events, { ...newEvent, id: UIDV4() }];

      return {
        ...currentEvents,
        events: addedEvents
      };
    },
    false
  );

  // to hit server
  // you may need to refetch latest data after server hit and based on your logic
  //   const data = { newEvent };
  //   await axios.post(endpoints.key + endpoints.add, data);
}

export async function updateEvent(
  eventId: string,
  updatedEvent: Partial<{
    allDay: boolean;
    start: Date | null;
    end: Date | null;
  }>
) {
  // to update local state based on key
  mutate(
    endpoints.key,
    (currentEvents: any) => {
      const updatedEvents: EventInput[] = currentEvents.events.map((event: EventInput) =>
        event.id === eventId ? { ...event, ...updatedEvent } : event
      );

      return {
        ...currentEvents,
        events: updatedEvents
      };
    },
    false
  );

  // to hit server
  // you may need to refetch latest data after server hit and based on your logic
  //   const data = { newEvent };
  //   await axios.post(endpoints.key + endpoints.udpate, data);
}

export async function deleteEvent(eventId: string) {
  // to update local state based on key
  mutate(
    endpoints.key,
    (currentEvents: any) => {
      const nonDeletedEvent = currentEvents.events.filter((event: EventInput) => event.id !== eventId);

      return {
        ...currentEvents,
        events: nonDeletedEvent
      };
    },
    false
  );

  // to hit server
  // you may need to refetch latest data after server hit and based on your logic
  //   const data = { newEvent };
  //   await axios.post(endpoints.key + endpoints.delete, data);
}
