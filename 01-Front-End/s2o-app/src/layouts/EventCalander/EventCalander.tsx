import React, { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import { Value } from "react-calendar/dist/cjs/shared/types";
import "react-calendar/dist/Calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "./EventCalender.css";

const EventCalendar = () => {
  interface Event {
    id: number;
    title: string;
    description: string;
    start: string;
    end: string;
  }

  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    start: "",
    end: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/api/events");
      setEvents(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (value: Value) => {
    if (Array.isArray(value)) {
      setSelectedDate(value[0] || null);
    } else {
      setSelectedDate(value);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newEvent.title || !newEvent.start || !newEvent.end) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/events", newEvent);
      setNewEvent({ title: "", description: "", start: "", end: "" });
      setSuccessMessage("Event added successfully!");
      setError(null);
      fetchEvents();
    } catch (err) {
      setError("Failed to add event");
      setSuccessMessage(null);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/events/${id}`);
      setSuccessMessage("Event deleted successfully!");
      fetchEvents();
    } catch (err) {
      setError("Failed to delete event");
    }
  };

  return (
    <div className="container event-page mt-5 mb-5">
      <h1 className="text-center page-title">Event Calendar</h1>
      {loading ? (
        <div className="spinner-border text-primary my-4" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : successMessage ? (
        <div className="alert alert-success text-center">{successMessage}</div>
      ) : null}

      <div className="calendar-container">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          selectRange={false}
        />
      </div>

      <div className="event-list-section">
        <h2 className="section-title">Upcoming Events</h2>
        {events.length > 0 ? (
          <div className="event-cards">
            {events.map((event) => (
              <div className="event-card" key={event.id}>
                <div className="event-card-content">
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-date">
                    {new Date(event.start).toLocaleString()} -{" "}
                    {new Date(event.end).toLocaleString()}
                  </p>
                  <p className="event-description">{event.description}</p>
                </div>
                <button
                  className="btn btn-danger delete-btn"
                  onClick={() => handleDelete(event.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted no-events">No events available</p>
        )}
      </div>

      <div className="add-event-section">
        <h2 className="section-title">Add New Event</h2>
        <form onSubmit={handleSubmit} className="add-event-form">
          <div className="form-group">
            <label>Event Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="Enter event title"
              value={newEvent.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Start Date and Time</label>
            <input
              type="datetime-local"
              className="form-control"
              name="start"
              value={newEvent.start}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>End Date and Time</label>
            <input
              type="datetime-local"
              className="form-control"
              name="end"
              value={newEvent.end}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Event Description</label>
            <textarea
              className="form-control"
              name="description"
              placeholder="Enter event description"
              value={newEvent.description}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventCalendar;
