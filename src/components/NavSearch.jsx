import React, { useState, useEffect, useMemo } from "react";
import "../styles/NavSearch.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NavSearch = () => {
  const [airStates, setAirStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [icaValue, setIcaValue] = useState("");
  const [beginDate, setBeginDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [beginUnixTimestamp, setBeginUnixTimestamp] = useState("");
  const [endUnixTimestamp, setEndUnixTimestamp] = useState("");

  useEffect(() => {
    const getAirStates = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://opensky-network.org/api/states/all"
        );
        if (response.ok) {
          const data = await response.json();
          setAirStates(data);
        }
      } catch (error) {
        console.log(error);
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

  const getArrivalAirport = async()=>{
    try{
      const request = await fetch(`https://opensky-network.org/api/flights/aircraft?icao24=${icaValue}&begin=${beginUnixTimestamp}&end=${endUnixTimestamp}`);
      const resp = await request.json();
      console.log(resp);
    }catch(err){
      console.log(err)
    };
  }

  const handleFetchClick = () => {
    getArrivalAirport ();
    console.log(icaValue, beginUnixTimestamp, endUnixTimestamp);
  };

  const memoizedAirStates = useMemo(
    () => airStates.states || [],
    [airStates.states]
  );

  return (
    <>
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

      {loading && <h1>Loading...</h1>}
    </>
  );
};

export default NavSearch;