import React from "react";
import { Link } from "react-router-dom";
import CityCard from "./CityCard";

const CityList = (props) => {
  console.log(props);

  const deleteCityHandler = (id) => {
    props.getCityId(id);
  };

  const renderCityList = props.cities.map((city) => {
    return (
      <CityCard
        city={city}
        clickHander={deleteCityHandler}
        key={city.id}
      />
    );
  });
  return (
    <div className="main">
      <h2>
        Cities List
        <Link to="/add">
          <button className="ui button blue right">Add Cities</button>
        </Link>
      </h2>
      <div className="ui celled list">{renderCityList}</div>
    </div>
  );
};

export default CityList;
