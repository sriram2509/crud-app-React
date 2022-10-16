import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { uuid } from "uuidv4";
import api from "../api/contacts";
import "./App.css";
import Header from "./Header";
import AddCity from "./AddCity";
import CityList from "./CityList";
import CityDetail from "./CityDetail";
import EditCity from "./EditCity";

function App() {
  const LOCAL_STORAGE_KEY = "senzmate";
  const [cities, setCities] = useState([]);

  //RetrieveCities
  const retrieveCities = async () => {
    const response = await api.get("/cities");
    return response.data;
  };

  const addCityHandler = async (city) => {
    console.log(city);
    const request = {
      id: uuid(),
      ...city,
    };

    const response = await api.post("/cities", request);
    console.log(response);
    setCities([...cities, response.data]);
  };

  const updateCityHandler = async (city) => {
    const response = await api.put(`/cities/${city.id}`, city);
    const { id, name, coordinate } = response.data;
    setCities(
      cities.map((city) => {
        return city.id === id ? { ...response.data } : city;
      })
    );
  };

  const removeCityHandler = async (id) => {
    await api.delete(`/cities/${id}`);
    const newCityList = cities.filter((city) => {
      return city.id !== id;
    });

    setCities(newCityList);
  };

  useEffect(() => {
    // const retriveCities = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retriveCities) setCities(retriveCities);
    const getAllCities = async () => {
      const allCities = await retrieveCities();
      if (allCities) setCities(allCities);
    };

    getAllCities();
  }, []);

  useEffect(() => {
    //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [cities]);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <CityList
                {...props}
                cities={cities}
                getCityId={removeCityHandler}
              />
            )}
          />
          <Route
            path="/add"
            render={(props) => (
              <AddCity {...props} addCityHandler={addCityHandler} />
            )}
          />

          <Route
            path="/edit"
            render={(props) => (
              <EditCity
                {...props}
                updateCityHandler={updateCityHandler}
              />
            )}
          />

          <Route path="/city/:id" component={CityDetail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
