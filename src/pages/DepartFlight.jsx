import React, { useState, useEffect, useMemo, useRef } from "react";
import "../styles/NavSearch.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Table, TableBody, TableCell, TableHead, TableRow, Button, TextField } from '@mui/material';
import {HiMenu} from 'react-icons/hi';
import { NavLink } from "react-router-dom";
import {FaTimes} from 'react-icons/fa';

const ArriveFlight = () => {
  const [airStates, setAirStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [icaValue, setIcaValue] = useState("");
  const [beginDate, setBeginDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [beginUnixTimestamp, setBeginUnixTimestamp] = useState("");
  const [endUnixTimestamp, setEndUnixTimestamp] = useState("");
  const [flightArrival, setFlightArrival] = useState([]);

  useEffect(() => {
    const getAirStates = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://opensky-network.org/api/states/all");
        if (response.ok) {
          const data = await response.json();
          setAirStates(data);
          setErrorMessage();
        }else {
          setErrorMessage('Error fetching data, check your URL, network and try again');
        }
      } catch (error) {
        if(error){
          throw new Error(error.message);
        }
      }
      setLoading(false);
    };
    getAirStates();
  }, []);

  const handleIcaValueChange = (event) => {
    setIcaValue(event.target.value);
  };

  const handleBeginDateChange = (date) => {
    setBeginDate(date);
    setBeginUnixTimestamp(date.getTime() / 1000);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    setEndUnixTimestamp(date.getTime() / 1000);
  };

  const handleFetchClick = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://opensky-network.org/api/flights/aircraft?icao24=${icaValue}&begin=${beginUnixTimestamp}&end=${endUnixTimestamp}`);
      if (response.ok) {
        const data = await response.json();
        setFlightArrival(data);
        setErrorMessage();
        // console.log(data);
      }else {
        setErrorMessage("Error fetching the data: Start after end time or more than 30 days of data requested or check your ICA024");
        setFlightArrival('');
      }
    } catch (error) {
      if(error){
        throw new Error(error.message);
      }
    }
    setLoading(false);
  };

  // Memoize the states only if it's an array and its length is not zero
  const memoizedAirStates = useMemo(() => {
    return Array.isArray(airStates.states) && airStates.states.length > 0 ? airStates.states : [];
  }, [airStates.states]);

  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChangePage = (value) => {
    setPage(prevPage => prevPage + value); // Update page using the previous state
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  // Filter the flight arrivals based on the search term
  const filteredUsers = flightArrival && flightArrival.length > 0
    ? flightArrival.filter((user) =>
        user.callsign && user.callsign.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const rowsPerPage = 5;
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // Map through the filtered users to create rows of the table
  const userRows = filteredUsers.slice(startIndex, endIndex).map((flight) => {
    return (
      <TableRow key={flight.callsign}>
        <TableCell sx={{ border: '1px solid  #4f3f84', color:'#FF662A' }}>{flight.icao24}</TableCell>
        <TableCell sx={{ border: '1px solid  #4f3f84', color:'#FF662A' }}>{flight.callsign}</TableCell>
        <TableCell sx={{ border: '1px solid  #4f3f84', color:'#FF662A' }}>{flight.estDepartureAirport}</TableCell>
        <TableCell sx={{ border: '1px solid  #4f3f84', color:'#FF662A' }}>{new Date(flight.lastSeen * 1000).toLocaleString()}</TableCell>
        <TableCell sx={{ border: '1px solid  #4f3f84', color:'#FF662A' }}>{flight.departureAirportCandidatesCount}</TableCell>
        <TableCell sx={{ border: '1px solid  #4f3f84', color:'#FF662A' }}>{flight.estDepartureAirportHorizDistance}</TableCell>
        <TableCell sx={{ border: '1px solid  #4f3f84', color:'#FF662A' }}>{flight.estDepartureAirportVertDistance}</TableCell>
      </TableRow>
    );
  });


   // Mobile device Nav Link Show and Hide

   const showNavLink = useRef(null);

   const handleShowNavLink = () => {
     if (showNavLink.current !== null) {
       showNavLink.current.classList.toggle('showNavDropdown');
     }
   }



return (
<>
<div className="hamburger-container">
  <h2 className="logp_mobile">Chillycee Air</h2>
  <HiMenu className="hamburger-icon" onClick={handleShowNavLink} />
  <div className="navlink_dropdown" ref={showNavLink}>
    <div className="mobile_sidebar_logo">
      <h2>Chillycee Air</h2>
      <FaTimes className="hamburger-icon" onClick={handleShowNavLink} />
    </div>
    <NavLink to='/dashboard/arriveflights'><p>Arrivals by Airport</p></NavLink>
    <NavLink to='/dashboard/departflights'><p>Departures by Airport</p></NavLink>
    <NavLink to='/'><p>Logout</p></NavLink>
  </div>
</div>
<div className="navsearch_container">
<div className="airdata_container">
<label>ICAO24:</label>
<select value={icaValue} onChange={handleIcaValueChange}>
{!loading &&
memoizedAirStates.map((state, index) => (
<option value={state[0]} key={index}>
{state[0]}
</option>
))}
</select>
</div>
<div className="begin_time_container">
      <label htmlFor="begin_date_picker">Begin Date:</label>
      <div>
        <DatePicker
          id="begin_date_picker"
          selected={beginDate}
          onChange={handleBeginDateChange}
          dateFormat="dd/MM/yyyy"
        />
      </div>
    </div>

    <div className="end_time_container">
      <label htmlFor="end_date_picker">End Date:</label>
      <div>
        <DatePicker
          id="end_date_picker"
          selected={endDate}
          onChange={handleEndDateChange}
          dateFormat="dd/MM/yyyy"
        />
      </div>
    </div>

    <div className="fetch_container" onClick={handleFetchClick}>
      <h5>Fetch</h5>
    </div>
  </div>

  {errorMessage && <p className="loading"> {errorMessage}</p>}
  {loading && <h1 className="loading">Loading...</h1>}

  {flightArrival && 


<div className="table_container">
<div className="table_search">
  <TextField
    label="Search"
    variant="outlined"
    value={searchTerm}
    onChange={handleSearchChange}
  />
</div>

<Table>
  <TableHead>
    <TableRow>
      <TableCell sx={{ border: '1px solid  #4f3f84', color:'#FF662A' }}>ICAO 24-bit</TableCell>
      <TableCell sx={{ border: '1px solid  #4f3f84', color:'#FF662A' }}>Callsign</TableCell>
      <TableCell sx={{ border: '1px solid  #4f3f84', color:'#FF662A' }}>Departure Airport</TableCell>
      <TableCell sx={{ border: '1px solid  #4f3f84', color:'#FF662A' }}>Last Seen</TableCell>
      <TableCell sx={{ border: '1px solid  #4f3f84', color:'#FF662A' }}>Departure Airport Candidates Count</TableCell>
      <TableCell sx={{ border: '1px solid  #4f3f84', color:'#FF662A' }}>Departure Airport Horiz Distance</TableCell>
      <TableCell sx={{ border: '1px solid  #4f3f84', color:'#FF662A' }}>Departure Airport Vert Distance</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>{userRows}</TableBody>
</Table>
<div>
  <Button
    disabled={page === 0}
    onClick={() => handleChangePage(-1)}
  >
    Previous
  </Button>
  <Button
    disabled={endIndex >= flightArrival.length}
    onClick={() => handleChangePage(1)}
  >
    Next
  </Button>
</div>
</div>

  }
</>
);
};

export default ArriveFlight;