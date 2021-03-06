import Homepage from "./components/Homepage";
import { Route, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar.js";
import EmployeeChart from "./components/EmployeeChart";
import ManagerChart from "./components/ManagerChart.js";
import SupervisorChart from "./components/SupervisorChart";
import Linkspage from "./components/LinksPage.js";
import React, { useState, useEffect } from "react";
import "./App.css";


function App() {
  const [employees, setEmployees] = useState([]);
  const [managers, setManagers] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [searchOnChange, setSearchOnChange] = useState("");
  //////////////////////////////////////////////////////////////////
  //FETCH EMPLOYEES
  useEffect(() => {
    fetch("http://localhost:9292/employees")
      .then((res) => res.json())
      .then((employees) => {
        setEmployees(employees);
      });
  }, []);

  //SEARCH EMPLOYEES
 

 

  //DELETE REQUEST EMPLOYEES
  const onDelete = (objID) => {
    fetch(`http://localhost:9292/employees/${objID}`, {
      method: "DELETE",
    }).then(() => {
      setEmployees(employees.filter((el) => el.id !== objID));
    });
  };

  //////////////////////////////////////////////////////////////////
  //FETCH MANAGERS
  useEffect(() => {
    fetch("http://localhost:9292/managers")
      .then((res) => res.json())
      .then((managers) => {
        setManagers(managers);
      });
  }, []);

  // DELETE REQUEST MANAGERS
  const onDeleteManagers = (objID) => {
    fetch(`http://localhost:9292/managers/${objID}`, {
      method: "DELETE",
    }).then(() => {
      setManagers(managers.filter((el) => el.id !== objID));
    });
  };

  //////////////////////////////////////////////////////////////////
  //FETCH SUPERVISORS
  useEffect(() => {
    fetch("http://localhost:9292/supervisors")
      .then((res) => res.json())
      .then((supervisors) => {
        setSupervisors(supervisors);
      });
  }, []);

  // DELETE REQUEST SUPERVISORS
  const onDeleteSuper = (objID) => {
    fetch(`http://localhost:9292/supervisors/${objID}`, {
      method: "DELETE",
    }).then(() => {
      setSupervisors(supervisors.filter((el) => el.id !== objID));
    });
  };

  return (
    <div className="App">
      <NavBar />
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route path="/home">
        <Homepage />
      </Route>
      <Route path="/your-employees">
        <EmployeeChart
          employees={employees}
          onDelete={onDelete}
          searchOnChange= {searchOnChange}
          setSearchOnChange={setSearchOnChange}
          setEmployees={setEmployees}
        />
      </Route>
      <Route path="/your-managers">
        <ManagerChart
          managers={managers}
          onDelete={onDeleteManagers}
          setManagers={setManagers}
        />
      </Route>
      <Route path="/your-supervisors">
        <SupervisorChart
          supervisors={supervisors}
          setSupervisors={setSupervisors}
          onDelete={onDeleteSuper}
        />
      </Route>
      <Route path="/helpful-links">
        <Linkspage />
      </Route>
    </div>
  );
}

export default App;
