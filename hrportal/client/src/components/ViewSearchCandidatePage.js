/*
Project: Hiring Portal Project
Author: Vishal
Date: 01/04/2024
Sprint: Sprint 1
User Story: Successful Login and Home Page

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |    Description 
-------------------------------------------------------------------------------------------------------
24/4/2024      Vishal                        3          Search Candidate
2/5/2024       Vishal                        3          Search Candidate Validations - Code Integration
-------------------------------------------------------------------------------------------------------
*/

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ViewSearchCandidatePage.module.css"; // Import CSS module

function ViewSearchCandidatePage() {
  const [searchType, setSearchType] = useState("date");
  const [searchData, setSearchData] = useState({
    year: "",
    month: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const nav = useNavigate();

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleInputChange = (event) => {
    setSearchData({ ...searchData, [event.target.name]: event.target.value });
    console.log(searchData);
  };

  const handleSearch = () => {
    const fetchData = async (searchTerm) => {
      if (searchTerm.firstName || searchTerm.lastName || searchTerm.email) {
        const { firstName, lastName, email } = searchTerm;

        // Constructing the query parameters based on user input
        const queryParams = new URLSearchParams({
          searchTerm: `${firstName} ${lastName} ${email}`.trim(), // Concatenating firstName, lastName, and email
        });

        setIsLoading(true);
        setError(null);

        try {
          const response = await fetch(
            `/api/candidate/search-candidate?${queryParams.toString()}`
          );
          console.log(response);
          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status}`);
          }
          const data = await response.json();
          setSearchResults(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      } else {
        const { month, year } = searchTerm;

        // Constructing the query parameters based on user input
        const queryParams = new URLSearchParams({
          searchTerm: `${year} ${month}`.trim(), // Concatenating month and year with '&'
        });

        setIsLoading(true);
        setError(null);

        try {
          const response = await fetch(
            `/api/candidate/view-candidate?${queryParams.toString()}`
          );
          console.log(response);
          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status}`);
          }
          const data = await response.json();
          setSearchResults(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (searchData) {
      fetchData(searchData);
    }
  };

  const handleViewDetails = (id) => {
    // nav(`/home/search-candidate/candidate/${id}`)
    nav(`/home/search-candidate/candiadte`);
    // Handle view details logic, e.g., open modal or navigate to a new page
    console.log("View details for ID:", id);
  };

  // Logic for pagination
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = searchResults.slice(
    indexOfFirstResult,
    indexOfLastResult
  );
  // const currentResults = searchResult.slice(
  //   indexOfFirstResult,
  //   indexOfLastResult
  // );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.search_container}>
      <div className={styles.title_container}>
        <p className={styles.form_title}>View/Search Candidate</p>
      </div>
      <div className={styles.divide}>
        <div className={styles.form_container}>
          <div className={styles.radio_group}>
            <div className={styles.flex_conatiner}>
              <input
                type="radio"
                id="dateSearch"
                name="searchType"
                value="date"
                checked={searchType === "date"}
                onChange={handleSearchTypeChange}
                className={styles.checkbox}
              />
              <label className={styles.radio_label} htmlFor="dateSearch">
                View the candidates applied in
              </label>
            </div>
            <div className={styles.flex_conatiner}>
              <input
                type="radio"
                id="userSearch"
                name="searchType"
                value="user"
                checked={searchType === "user"}
                onChange={handleSearchTypeChange}
                className={styles.checkbox}
              />
              <label className={styles.radio_label} htmlFor="userSearch">
                Search candidate
              </label>
            </div>
          </div>
          {searchType === "date" && (
            <div className={styles.input_group}>
              <div className={styles.flex_conatiner}>
                <label className={styles.label}>Year:</label>
                <input
                  type="text"
                  name="year"
                  value={searchData.year}
                  onChange={handleInputChange}
                  className={styles.input_field}
                />
              </div>
              <div className={styles.flex_conatiner}>
                <label className={styles.label}>Month:</label>
                <select
                  id="month"
                  name="month"
                  value={searchData.month}
                  onChange={handleInputChange}
                  className={styles.input_field}
                >
                  <option value="">Select Month</option>
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="5">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                  {/* Add more options as needed */}
                </select>
              </div>
            </div>
          )}
          {searchType === "user" && (
            <div className={styles.input_group}>
              <div className={styles.flex_conatiner}>
                <label className={styles.label}>First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  value={searchData.firstName}
                  onChange={handleInputChange}
                  className={styles.input_field}
                />
              </div>
              <div className={styles.flex_conatiner}>
                <label className={styles.label}>Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  value={searchData.lastName}
                  onChange={handleInputChange}
                  className={styles.input_field}
                />
              </div>
              <div className={styles.flex_conatiner}>
                <label className={styles.label}>Email:</label>
                <input
                  type="text"
                  name="email"
                  value={searchData.email}
                  onChange={handleInputChange}
                  className={styles.input_field}
                />
              </div>
            </div>
          )}
          {error && <p className={styles.errorMessage}>{error.message}</p>}
          <div className={styles.button_container}>
            <button
              onClick={handleSearch}
              className={styles.button}
              disabled={isLoading}
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
        {searchResults.length ? (
          <div className={styles.table_container}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>View</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Mobile Number</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentResults.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <button
                        onClick={() => handleViewDetails(item.id)}
                        className={styles.button_view}
                      >
                        View
                      </button>
                    </td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.mobileNumber}</td>
                    <td>{item.emailAddress}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={styles.pagination}>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={styles.table_button}
              >
                Previous
              </button>
              <span>{currentPage}</span>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastResult >= searchResults.length}
                className={styles.table_button}
              >
                Next
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ViewSearchCandidatePage;
