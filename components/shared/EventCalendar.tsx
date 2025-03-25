"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import Link from 'next/link';

// Sample events data
const sampleEvents = [
  { id: 1, title: "Tech Conference 2024", date: new Date(2024, 2, 15), category: "Technology" },
  { id: 2, title: "Music Festival", date: new Date(2024, 2, 21), category: "Entertainment" },
  { id: 3, title: "Startup Networking", date: new Date(2024, 2, 16), category: "Business" },
];

const EventCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  
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
    return sampleEvents.some(event => 
      event.date.getDate() === date.getDate() && 
      event.date.getMonth() === date.getMonth() && 
      event.date.getFullYear() === date.getFullYear()
    );
  };
  
  // Get events for selected date
  const getEventsForDate = (date: Date) => {
    return sampleEvents.filter(event => 
      event.date.getDate() === date.getDate() && 
      event.date.getMonth() === date.getMonth() && 
      event.date.getFullYear() === date.getFullYear()
    );
  };
  
  // Format date as string
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
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
  
  const calendarDays = generateCalendarDays();
  const selectedDateEvents = getEventsForDate(selectedDate);
  
  return (
    <section className="py-16 bg-white">
      <div className="wrapper">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Upcoming Events</h2>
          <p className="text-2xl font-medium text-indigo-600 mt-2">Plan Your Schedule</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Calendar */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-xl font-bold mb-2">Event Calendar</h3>
            <p className="text-gray-600 mb-4">Browse and discover events by date</p>
            
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={prevMonth}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <h4 className="text-lg font-semibold">{monthYear}</h4>
              <button 
                onClick={nextMonth}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, index) => (
                <div key={index} className="text-center font-medium text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedDate(day.date)}
                  className={`
                    relative min-h-[80px] p-2 rounded-md border border-gray-100
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
                    <div className="mt-1 space-y-1 max-h-[50px] overflow-hidden">
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
            
            <div className="mt-6 flex items-center justify-center text-gray-500 text-sm">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Select a date to view events</span>
            </div>
          </div>
          
          {/* Events for selected date */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-xl font-bold mb-2">Events on Selected Date</h3>
            <p className="text-gray-600 mb-6">Events for {formatDate(selectedDate)}</p>
            
            <div className="min-h-[300px]">
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateEvents.map((event) => (
                    <div key={event.id} className="p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-lg">{event.title}</h4>
                          <p className="text-gray-500 text-sm">{formatDate(event.date)}</p>
                        </div>
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                          {event.category}
                        </span>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button asChild size="sm" variant="outline" className="mr-2">
                          <Link href={`/events/${event.id}`}>View Details</Link>
                        </Button>
                        <Button asChild size="sm">
                          <Link href={`/events/${event.id}/register`}>Register</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <p className="text-gray-500 mb-6">No events scheduled for this date</p>
                  <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
                    <Link href="/events/create">Create an event</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-all">
            <Link href="/events/calendar">View Full Calendar</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventCalendar; 