import React, { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import { Value } from "react-calendar/dist/cjs/shared/types";
import "react-calendar/dist/Calendar.css";
import { jwtDecode } from "jwt-decode";
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
  const [userRole, setUserRole] = useState<string | null>(null); // Role state for user

  useEffect(() => {
    fetchEvents();
    // Fetch user role or decode token if already in the localStorage
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        setUserRole(decodedToken.roles?.[0] || null);
      } catch (err) {
        console.error("Error decoding token", err);
      }
    }
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
    <div className="container mx-auto mt-20 max-w-6xl p-6 max-w-7xl">
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        🎉 Event Calendar
      </h1>

      {/* Notification */}
      {loading && (
        <div className="flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-t-4 border-blue-500"></div>
        </div>
      )}
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {successMessage && (
        <div className="text-green-500 text-center mb-4">{successMessage}</div>
      )}

      {/* Calendar */}
      <div className="flex justify-center">
        <div className="shadow-lg rounded-lg overflow-hidden">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            className="w-full border-none"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="my-8 border-t border-gray-300"></div>

      {/* Event List */}
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">
        📅 Upcoming Events
      </h2>
      {events.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white p-5 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
            >
              <h3 className="text-xl font-bold text-blue-600">{event.title}</h3>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(event.start).toLocaleString()} -{" "}
                {new Date(event.end).toLocaleString()}
              </p>
              <p className="text-gray-700 mt-4">{event.description}</p>
              <button
                onClick={() => handleDelete(event.id)}
                className="mt-4 text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No events available.</p>
      )}

      {/* Divider */}
      <div className="my-8 border-t border-gray-300"></div>

      {/* Add Event Form - Only visible to ROLE_ADMIN */}
      {userRole === "ROLE_ADMIN" && (
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">
            📝 Add New Event
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-1">Event Title</label>
              <input
                type="text"
                name="title"
                value={newEvent.title}
                onChange={handleInputChange}
                placeholder="Enter event title"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Start Date & Time</label>
              <input
                type="datetime-local"
                name="start"
                value={newEvent.start}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">End Date & Time</label>
              <input
                type="datetime-local"
                name="end"
                value={newEvent.end}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Description</label>
              <textarea
                name="description"
                value={newEvent.description}
                onChange={handleInputChange}
                placeholder="Enter event description"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600 transition"
            >
              Add Event
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EventCalendar;