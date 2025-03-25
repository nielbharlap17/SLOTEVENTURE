"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar, Filter, List, Grid, Download, Share2, SortAsc, SortDesc } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Sample events data with more details
const sampleEvents = [
  { 
    id: 1, 
    title: "Tech Conference 2024", 
    date: new Date(2024, 2, 15), 
    endDate: new Date(2024, 2, 17),
    category: "Technology",
    location: "Convention Center, Mumbai",
    image: "/assets/images/test.png",
    attendees: 342,
    organizer: "TechEvents India"
  },
  { 
    id: 2, 
    title: "Music Festival", 
    date: new Date(2024, 2, 21), 
    endDate: new Date(2024, 2, 23),
    category: "Entertainment",
    location: "Beach Park, Goa",
    image: "/assets/images/test-2.png",
    attendees: 1250,
    organizer: "Festival Productions"
  },
  { 
    id: 3, 
    title: "Startup Networking", 
    date: new Date(2024, 2, 16), 
    endDate: new Date(2024, 2, 16),
    category: "Business",
    location: "Business Hub, Bangalore",
    image: "/assets/images/placeholder.png",
    attendees: 120,
    organizer: "Startup India"
  },
  { 
    id: 4, 
    title: "Art Exhibition", 
    date: new Date(2024, 2, 10), 
    endDate: new Date(2024, 2, 20),
    category: "Arts",
    location: "National Gallery, Delhi",
    image: "/assets/images/hero.png",
    attendees: 500,
    organizer: "Arts Council"
  },
  { 
    id: 5, 
    title: "Food Festival", 
    date: new Date(2024, 2, 25), 
    endDate: new Date(2024, 2, 27),
    category: "Food",
    location: "Central Park, Mumbai",
    image: "/assets/images/test.png",
    attendees: 800,
    organizer: "Culinary Association"
  },
];

const CalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'attendees'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filteredEvents, setFilteredEvents] = useState(sampleEvents);
  
  // Get current month and year
  const monthYear = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  
  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // Get day of week for first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  // Check if a date has events
  const hasEvents = (date: Date) => {
    return getEventsForDate(date).length > 0;
  };
  
  // Get events for selected date
  const getEventsForDate = (date: Date) => {
    return sampleEvents.filter(event => {
      // Check if the date falls within the event's date range
      const eventStart = new Date(event.date);
      const eventEnd = new Date(event.endDate);
      
      // Reset hours to compare just the dates
      const compareDate = new Date(date);
      compareDate.setHours(0, 0, 0, 0);
      eventStart.setHours(0, 0, 0, 0);
      eventEnd.setHours(0, 0, 0, 0);
      
      return compareDate >= eventStart && compareDate <= eventEnd &&
        (categoryFilter === null || event.category === categoryFilter);
    });
  };
  
  // Get all events for the current month
  const getEventsForMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    return sampleEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === month && 
        eventDate.getFullYear() === year &&
        (categoryFilter === null || event.category === categoryFilter);
    });
  };
  
  // Format date as string
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
  };
  
  // Format date range
  const formatDateRange = (startDate: Date, endDate: Date) => {
    if (startDate.toDateString() === endDate.toDateString()) {
      return formatDate(startDate);
    }
    
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };
  
  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const prevMonthDays = getDaysInMonth(year, month - 1);
    
    const days = [];
    
    // Previous month days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        currentMonth: false,
        date: new Date(year, month - 1, prevMonthDays - i)
      });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({
        day: i,
        currentMonth: true,
        date,
        hasEvents: hasEvents(date),
        isToday: new Date().toDateString() === date.toDateString(),
        isSelected: selectedDate.toDateString() === date.toDateString()
      });
    }
    
    // Next month days
    const remainingDays = 42 - days.length; // 6 rows of 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        currentMonth: false,
        date: new Date(year, month + 1, i)
      });
    }
    
    return days;
  };
  
  // Get unique categories from events
  const getCategories = () => {
    const categories = sampleEvents.map(event => event.category);
    return Array.from(new Set(categories));
  };
  
  const calendarDays = generateCalendarDays();
  const selectedDateEvents = getEventsForDate(selectedDate);
  const monthEvents = getEventsForMonth();
  const categories = getCategories();
  
  // Export calendar events to iCal format
  const exportEvents = () => {
    // Create iCal content
    let iCalContent = 
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Events Calendar//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
`;

    // Add each event to the iCal content
    monthEvents.forEach(event => {
      const startDate = new Date(event.date);
      const endDate = new Date(event.endDate);
      
      // Format dates to iCal format (YYYYMMDDTHHMMSSZ)
      const formatICalDate = (date: Date) => {
        return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/g, '');
      };
      
      iCalContent += 
`BEGIN:VEVENT
UID:${event.id}@eventscalendar
DTSTAMP:${formatICalDate(new Date())}
DTSTART:${formatICalDate(startDate)}
DTEND:${formatICalDate(endDate)}
SUMMARY:${event.title}
DESCRIPTION:Organized by ${event.organizer} at ${event.location}
LOCATION:${event.location}
CATEGORIES:${event.category}
END:VEVENT
`;
    });
    
    iCalContent += 'END:VCALENDAR';
    
    // Create a blob and download link
    const blob = new Blob([iCalContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `events-${monthYear.replace(' ', '-')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  // Share calendar via different methods
  const shareCalendar = (method: 'email' | 'copy' | 'social') => {
    const title = `Events Calendar - ${monthYear}`;
    const url = window.location.href;
    const description = `Check out these events for ${monthYear}: ${monthEvents.map(e => e.title).join(', ')}`;
    
    switch (method) {
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + '\n\n' + url)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(`${title}\n${description}\n${url}`).then(() => {
          alert('Calendar link copied to clipboard!');
        });
        break;
      case 'social':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`);
        break;
    }
    
    setShowShareModal(false);
  };
  
  // Apply filters and sorting to events
  useEffect(() => {
    let events = [...sampleEvents];
    
    // Filter by current month
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    events = events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === month && eventDate.getFullYear() === year;
    });
    
    // Apply category filter if selected
    if (categoryFilter) {
      events = events.filter(event => event.category === categoryFilter);
    }
    
    // Apply sorting
    events.sort((a, b) => {
      if (sortBy === 'date') {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      } else if (sortBy === 'title') {
        return sortDirection === 'asc' 
          ? a.title.localeCompare(b.title) 
          : b.title.localeCompare(a.title);
      } else if (sortBy === 'attendees') {
        return sortDirection === 'asc' 
          ? a.attendees - b.attendees 
          : b.attendees - a.attendees;
      }
      return 0;
    });
    
    setFilteredEvents(events);
  }, [currentMonth, categoryFilter, sortBy, sortDirection]);
  
  // Toggle sort direction
  const toggleSort = (field: 'date' | 'title' | 'attendees') => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="wrapper">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Event Calendar</h1>
            <p className="text-gray-600 mt-2">Browse and discover upcoming events</p>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
            <Button 
              variant={viewMode === 'calendar' ? 'default' : 'outline'} 
              onClick={() => setViewMode('calendar')}
              className="flex items-center gap-2"
            >
              <Grid className="h-4 w-4" />
              Calendar
            </Button>
            <Button 
              variant={viewMode === 'list' ? 'default' : 'outline'} 
              onClick={() => setViewMode('list')}
              className="flex items-center gap-2"
            >
              <List className="h-4 w-4" />
              List
            </Button>
            <div className="relative group">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => document.getElementById('filter-dropdown')?.classList.toggle('hidden')}
              >
                <Filter className="h-4 w-4" />
                Filter {categoryFilter && `(${categoryFilter})`}
              </Button>
              <div 
                id="filter-dropdown"
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 hidden"
              >
                <div className="py-2">
                  <button 
                    onClick={() => {
                      setCategoryFilter(null);
                      document.getElementById('filter-dropdown')?.classList.add('hidden');
                    }} 
                    className={`w-full text-left px-4 py-2 text-sm ${categoryFilter === null ? 'bg-indigo-100 text-indigo-800' : 'hover:bg-gray-100'}`}
                  >
                    All Categories
                  </button>
                  {categories.map((category, index) => (
                    <button 
                      key={index} 
                      onClick={() => {
                        setCategoryFilter(category);
                        document.getElementById('filter-dropdown')?.classList.add('hidden');
                      }} 
                      className={`w-full text-left px-4 py-2 text-sm ${categoryFilter === category ? 'bg-indigo-100 text-indigo-800' : 'hover:bg-gray-100'}`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={exportEvents}
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
            <div className="relative">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => setShowShareModal(!showShareModal)}
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              
              {showShareModal && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20">
                  <div className="py-2">
                    <button 
                      onClick={() => shareCalendar('email')} 
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Share via Email
                    </button>
                    <button 
                      onClick={() => shareCalendar('copy')} 
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Copy Link
                    </button>
                    <button 
                      onClick={() => shareCalendar('social')} 
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Share on Twitter
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {viewMode === 'calendar' ? (
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={prevMonth}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <h2 className="text-2xl font-bold">{monthYear}</h2>
              <button 
                onClick={nextMonth}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
                <div key={index} className="text-center font-medium text-gray-600 py-2">
                  <span className="hidden md:inline">{day}</span>
                  <span className="md:hidden">{day.substring(0, 1)}</span>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedDate(day.date)}
                  className={`
                    relative min-h-[100px] p-2 rounded-md border border-gray-100
                    ${!day.currentMonth ? 'bg-gray-50 text-gray-400' : 'bg-white text-gray-800'}
                    ${day.isToday ? 'border-indigo-300' : ''}
                    ${day.isSelected ? 'ring-2 ring-indigo-500' : ''}
                    hover:bg-gray-50 cursor-pointer transition-colors
                  `}
                >
                  <div className="flex justify-between items-start">
                    <span className={`text-sm font-medium ${day.isToday ? 'text-indigo-600' : ''}`}>
                      {day.day}
                    </span>
                    {day.hasEvents && (
                      <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                    )}
                  </div>
                  
                  {day.hasEvents && day.currentMonth && (
                    <div className="mt-1 space-y-1 max-h-[60px] overflow-hidden">
                      {getEventsForDate(day.date).slice(0, 2).map((event, eventIndex) => (
                        <div 
                          key={eventIndex} 
                          className="text-xs p-1 rounded bg-indigo-50 text-indigo-700 truncate"
                        >
                          {event.title}
                        </div>
                      ))}
                      {getEventsForDate(day.date).length > 2 && (
                        <div className="text-xs text-gray-500 pl-1">
                          +{getEventsForDate(day.date).length - 2} more
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <button 
                      onClick={prevMonth}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <h2 className="text-2xl font-bold">{monthYear} Events</h2>
                    <button 
                      onClick={nextMonth}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-gray-600 mt-1">
                    {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} scheduled
                    {categoryFilter && ` in ${categoryFilter}`}
                  </p>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={() => toggleSort('date')}
                  >
                    Date {sortBy === 'date' && (sortDirection === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />)}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={() => toggleSort('title')}
                  >
                    Title {sortBy === 'title' && (sortDirection === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />)}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={() => toggleSort('attendees')}
                  >
                    Popularity {sortBy === 'attendees' && (sortDirection === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />)}
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="divide-y divide-gray-100">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event, index) => (
                  <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/4">
                        <div className="relative h-40 w-full rounded-lg overflow-hidden">
                          <Image 
                            src={event.image} 
                            alt={event.title} 
                            fill 
                            className="object-cover"
                          />
                          <div className="absolute top-2 right-2 bg-indigo-100 text-indigo-800 text-xs font-bold px-2 py-1 rounded">
                            {event.category}
                          </div>
                        </div>
                      </div>
                      <div className="md:w-3/4">
                        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDateRange(event.date, event.endDate)}</span>
                          </div>
                          <div>
                            <span>Location: {event.location}</span>
                          </div>
                          <div>
                            <span>Attendees: {event.attendees}</span>
                          </div>
                          <div>
                            <span>Organizer: {event.organizer}</span>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Button asChild size="sm" variant="outline">
                            <Link href={`/events/${event.id}`}>View Details</Link>
                          </Button>
                          <Button asChild size="sm">
                            <Link href={`/events/${event.id}/register`}>Register</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center">
                  <p className="text-gray-500 mb-6">No events found matching your criteria</p>
                  <Button onClick={() => setCategoryFilter(null)}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
        
        {viewMode === 'calendar' && selectedDateEvents.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6">Events on {formatDate(selectedDate)}</h2>
            
            <div className="space-y-6">
              {selectedDateEvents.map((event, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-6 p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
                  <div className="md:w-1/4">
                    <div className="relative h-40 w-full rounded-lg overflow-hidden">
                      <Image 
                        src={event.image} 
                        alt={event.title} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:w-3/4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                        {event.category}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDateRange(event.date, event.endDate)}</span>
                      </div>
                      <div>
                        <span>Location: {event.location}</span>
                      </div>
                      <div>
                        <span>Attendees: {event.attendees}</span>
                      </div>
                      <div>
                        <span>Organizer: {event.organizer}</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/events/${event.id}`}>View Details</Link>
                      </Button>
                      <Button asChild size="sm">
                        <Link href={`/events/${event.id}/register`}>Register</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarPage; 