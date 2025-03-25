"use client";

import { useEffect, useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { IEvent } from '@/lib/database/models/event.model';
import { getAllEvents } from '@/lib/actions/event.actions';
import Link from 'next/link';
import Image from 'next/image';
import { formatDateTime, formatPrice, formatDate, AppError, handleAppError } from '@/lib/utils';
import { Loader2, CalendarIcon, MapPin, Clock, Tag, AlertCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorDisplay } from './ErrorDisplay';
import { useUser } from '@clerk/nextjs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Interface for calendar event
interface CalendarEvent {
  _id: string;
  title: string;
  date: Date;
  category: string;
  imageUrl: string;
  price: number;
  isFree: boolean;
  location?: string;
  startDateTime?: Date;
  endDateTime?: Date;
  organizer?: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  isUserEvent?: boolean; // Flag to indicate if this is the user's own event
}

const EventCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null);
  const [selectedDateEvents, setSelectedDateEvents] = useState<CalendarEvent[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<CalendarEvent[]>([]);
  const [monthEvents, setMonthEvents] = useState<CalendarEvent[]>([]);
  const [viewMode, setViewMode] = useState<'myEvents' | 'allEvents'>('myEvents');
  const { user, isLoaded: isUserLoaded } = useUser();

  // Fetch events on component mount
  useEffect(() => {
    if (isUserLoaded && user) {
      fetchEvents();
    }
  }, [isUserLoaded, user, viewMode]);

  // Update filtered events when date or events change
  useEffect(() => {
    if (date) {
      setSelectedDateEvents(getEventsForDate(date));
      setMonthEvents(getEventsByMonth());
    }
    setUpcomingEvents(getUpcomingEvents());
  }, [date, events]);

  const fetchEvents = async () => {
    if (!user) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Get all events
      const eventsData = await getAllEvents({
        query: '',
        category: '',
        limit: 100,
        page: 1,
      });
      
      // Transform event data to calendar format
      if (eventsData && eventsData.data) {
        const userFullName = `${user.firstName || ''} ${user.lastName || ''}`.trim().toLowerCase();
        
        // Map all events and mark user's own events
        const calendarEvents = eventsData.data.map((event: IEvent) => {
          const organizerFullName = `${event.organizer?.firstName || ''} ${event.organizer?.lastName || ''}`.trim().toLowerCase();
          const isUserEvent = organizerFullName === userFullName;
          
          return {
            _id: event._id || '',
            title: event.title || 'Untitled Event',
            date: new Date(event.startDateTime),
            category: event.category?.name || 'Uncategorized',
            imageUrl: event.imageUrl,
            price: Number(event.price) || 0,
            isFree: event.isFree || false,
            location: event.location,
            startDateTime: new Date(event.startDateTime),
            endDateTime: new Date(event.endDateTime),
            organizer: event.organizer,
            isUserEvent: isUserEvent
          };
        });
        
        // Filter events based on view mode
        const filteredEvents = viewMode === 'myEvents' 
          ? calendarEvents.filter((event: { isUserEvent: boolean }) => event.isUserEvent)
          : calendarEvents;
        
        setEvents(filteredEvents);
        
        // Initialize filtered events
        if (date) {
          setSelectedDateEvents(getEventsForDate(date, filteredEvents));
          setMonthEvents(getEventsByMonth(date, filteredEvents));
        }
        setUpcomingEvents(getUpcomingEvents(filteredEvents));
      } else {
        setEvents([]);
        setError(handleAppError(new Error('No events data returned from API')));
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents([]);
      setError(handleAppError(error));
    } finally {
      setIsLoading(false);
    }
  };
  
  // Check if a date has events
  const hasEvents = (date: Date) => {
    try {
      return events.some(event => {
        if (!event.date || isNaN(event.date.getTime())) return false;
        
        return event.date.getDate() === date.getDate() && 
          event.date.getMonth() === date.getMonth() && 
          event.date.getFullYear() === date.getFullYear();
      });
    } catch (error) {
      console.error('Error checking for events:', error);
      return false;
    }
  };
  
  // Get events for selected date
  const getEventsForDate = (date: Date, eventsList = events) => {
    try {
      return eventsList.filter(event => {
        if (!event.date || isNaN(event.date.getTime())) return false;
        
        return event.date.getDate() === date.getDate() && 
          event.date.getMonth() === date.getMonth() && 
          event.date.getFullYear() === date.getFullYear();
      });
    } catch (error) {
      console.error('Error getting events for date:', error);
      return [];
    }
  };
  
  // Format date as string
  const formatDate = (date: Date) => {
    try {
      return format(date, 'MMMM d, yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };
  
  // Get upcoming events (next 7 days)
  const getUpcomingEvents = (eventsList = events) => {
    try {
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);
      
      return eventsList.filter(event => {
        if (!event.date || isNaN(event.date.getTime())) return false;
        
        return event.date >= today && event.date <= nextWeek;
      }).sort((a, b) => {
        if (!a.date || !b.date || isNaN(a.date.getTime()) || isNaN(b.date.getTime())) return 0;
        return a.date.getTime() - b.date.getTime();
      });
    } catch (error) {
      console.error('Error getting upcoming events:', error);
      return [];
    }
  };

  // Function to get events by month
  const getEventsByMonth = (selectedDate = date, eventsList = events) => {
    try {
      if (!selectedDate) return [];
      
      const currentMonth = selectedDate.getMonth();
      const currentYear = selectedDate.getFullYear();
      
      return eventsList.filter(event => {
        if (!event.date || isNaN(event.date.getTime())) return false;
        
        return event.date.getMonth() === currentMonth && 
               event.date.getFullYear() === currentYear;
      }).sort((a, b) => {
        if (!a.date || !b.date || isNaN(a.date.getTime()) || isNaN(b.date.getTime())) return 0;
        return a.date.getTime() - b.date.getTime();
      });
    } catch (error) {
      console.error('Error getting events by month:', error);
      return [];
    }
  };

  // Function to handle date selection
  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate) {
      setSelectedDateEvents(getEventsForDate(newDate));
    } else {
      setSelectedDateEvents([]);
    }
  };

  // Function to render event card
  const renderEventCard = (event: CalendarEvent) => {
    return (
      <Card key={event._id} className={`mb-4 overflow-hidden hover:shadow-md transition-shadow ${event.isUserEvent ? 'border-l-4 border-primary-500' : ''}`}>
        <div className="flex flex-col sm:flex-row">
          <div className="relative w-full sm:w-1/3 h-40">
            {event.imageUrl ? (
              <Image 
                src={event.imageUrl} 
                alt={event.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <CalendarIcon className="h-10 w-10 text-gray-400" />
              </div>
            )}
            <Badge className="absolute top-2 right-2 bg-primary-500">
              {event.category}
            </Badge>
            {event.isUserEvent && (
              <Badge className="absolute top-2 left-2 bg-green-600">
                My Event
              </Badge>
            )}
          </div>
          
          <div className="flex-1 p-4">
            <CardHeader className="p-0 pb-2">
              <CardTitle className="text-xl font-bold line-clamp-1">
                <Link href={`/events/${event._id}`} className="hover:text-primary-500 transition-colors">
                  {event.title}
                </Link>
              </CardTitle>
              <CardDescription>
                <div className="flex items-center text-gray-500 mt-1">
                  <Clock className="h-4 w-4 mr-1" />
                  {event.startDateTime && formatDateTime(event.startDateTime).dateTime}
                </div>
                {event.location && (
                  <div className="flex items-center text-gray-500 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {event.location}
                  </div>
                )}
                {event.organizer && (
                  <div className="flex items-center text-gray-500 mt-1">
                    <User className="h-4 w-4 mr-1" />
                    {`${event.organizer.firstName} ${event.organizer.lastName}`}
                  </div>
                )}
              </CardDescription>
            </CardHeader>
            
            <CardFooter className="p-0 pt-2 flex justify-between items-center">
              <div>
                {event.isFree ? (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Free
                  </Badge>
                ) : (
                  <p className="font-semibold text-primary-500">
                    {formatPrice(String(event.price * 100))}
                  </p>
                )}
              </div>
              <Button asChild size="sm" className="rounded-full">
                <Link href={`/events/${event._id}`}>
                  View Details
                </Link>
              </Button>
            </CardFooter>
          </div>
        </div>
      </Card>
    );
  };

  // Function to render skeleton loader for events
  const renderEventSkeletons = (count: number) => {
    return Array(count).fill(0).map((_, index) => (
      <Card key={`skeleton-${index}`} className="mb-4 overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          <Skeleton className="w-full sm:w-1/3 h-40" />
          <div className="flex-1 p-4">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-1" />
            <Skeleton className="h-4 w-1/3 mb-3" />
            <div className="flex justify-between">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-8 w-24 rounded-full" />
            </div>
          </div>
        </div>
      </Card>
    ));
  };

  // Function to refresh events data
  const refreshEvents = () => {
    fetchEvents();
  };

  // Toggle between My Events and All Events views
  const handleViewModeChange = (value: string) => {
    setViewMode(value as 'myEvents' | 'allEvents');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {error && (
        <ErrorDisplay 
          error={error} 
          onClose={() => setError(null)}
        />
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Calendar Column */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Event Calendar</h2>
              <Button 
                asChild 
                size="sm" 
                className="bg-primary-600 hover:bg-primary-700 text-white"
              >
                <Link href="/events/create">
                  Create Event
                </Link>
              </Button>
            </div>

            <Tabs defaultValue="myEvents" className="mb-6" onValueChange={handleViewModeChange}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="myEvents">My Events</TabsTrigger>
                <TabsTrigger value="allEvents">All Events</TabsTrigger>
              </TabsList>
              <TabsContent value="myEvents">
                <p className="text-sm text-gray-500 mb-4">Showing only events you've created</p>
              </TabsContent>
              <TabsContent value="allEvents">
                <p className="text-sm text-gray-500 mb-4">Showing events from all organizers</p>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                className="rounded-md border w-full max-w-md"
                modifiers={{
                  hasEvent: hasEvents
                }}
                modifiersClassNames={{
                  hasEvent: 'bg-primary-100 font-bold text-primary-600 hover:bg-primary-200'
                }}
                classNames={{
                  month: "space-y-4",
                  caption: "flex justify-center pt-1 relative items-center",
                  caption_label: "text-sm font-medium",
                  nav: "space-x-1 flex items-center",
                  nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex justify-between w-full",
                  head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] md:text-sm",
                  row: "flex w-full mt-2 justify-between",
                  cell: "text-center text-sm md:text-base p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                  day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground rounded-md",
                  day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                  day_today: "bg-accent text-accent-foreground",
                  day_outside: "text-muted-foreground opacity-50",
                  day_disabled: "text-muted-foreground opacity-50",
                  day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                  day_hidden: "invisible",
                }}
              />
            </div>
            
            <div className="text-center mt-6">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={refreshEvents}
                className="w-full py-2 hover:bg-primary-50"
              >
                Refresh Events
              </Button>
            </div>
          </div>
        </div>
        
        {/* Events Column */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {date ? (
                <>{viewMode === 'myEvents' ? 'My' : 'All'} Events on {date && formatDate(date)}</>
              ) : (
                'Select a date to view events'
              )}
            </h2>
            
            {isLoading ? (
              <div className="space-y-4">
                {renderEventSkeletons(3)}
              </div>
            ) : selectedDateEvents.length > 0 ? (
              <div className="space-y-4">
                {selectedDateEvents.map(event => renderEventCard(event))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <CalendarIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-gray-700">
                  No {viewMode === 'myEvents' ? 'personal' : ''} events on this date
                </h3>
                
                {upcomingEvents.length > 0 ? (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">
                      {viewMode === 'myEvents' ? 'Your' : 'Upcoming'} events
                    </h3>
                    <div className="space-y-4">
                      {upcomingEvents.map(event => renderEventCard(event))}
                    </div>
                  </div>
                ) : (
                  <div className="mt-4">
                    <p className="text-gray-500 mb-4">
                      {viewMode === 'myEvents' 
                        ? "You haven't created any upcoming events" 
                        : "No upcoming events found"}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;