import React, { Component } from 'react';
import MapBox from "./components/MapBox/index"
import './App.css';
import propertiesData from "./data.json";
import SearchForm from "./components/SearchForm/index";
import PriceChart from "./components/PriceChart/index"; 
import DaysOnMarketChart from "./components/DaysOnMarketChart/index"; 
import Table from "./components/Table/index";


class App extends Component {
  state = {
    properties: []
  }


componentDidMount() {
      this.fetchProperties("","")
    }

  fetchProperties = (min, max) => {
    if ((min==="") && (max==="")) {
      let filteredProperties = propertiesData.filter(ele => { 
        return Number(ele.price) >= 120000
      })
      this.setState({
        properties: filteredProperties
      });
    } else {
      let filteredProperties = propertiesData.filter(ele => { 
        return Number(ele.price) >= min && Number(ele.price <= max)
      })
      this.setState({
        properties: filteredProperties
      });
    }
} 



  handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const min = data.get("sel_min")
    const max = data.get("sel_max")

    this.fetchProperties(min, max)
  }



  render() {
    console.log(this.state.properties)
    return (
      <div>

        <nav className="nav-wrapper">
          <p className="center projectTitle p-0 text-white">Jersey City Homes For Sale</p>
        </nav>
      <div className="container-fluid">

      <div className="row mt-2 mb-0"> 

        <div className="col-md-5 m-0 p-1">
        <div className="m-0 p-0 mb-2">

            <SearchForm handleSubmit={this.handleSubmit}/> 

          </div>

          <div className="card m-0 p-0 mb-2 center"> 
            <h6><b>Number of Properties</b></h6> <h4><b>{this.state.properties.length}</b></h4>
          </div>

          <div className="card m-0 p-0 mb-2"> 
            <PriceChart results={this.state.properties} /> 
          </div>
          <div className="card m-0 p-0">
            <DaysOnMarketChart results={this.state.properties} /> 
          </div>
        </div>

          <div className="col-md-7 m-0 p-1">
              <div className="card m-0 p-0 h-100">
                <MapBox results={this.state.properties} /> 
              </div>
            </div>
        </div>

        <div className="row mt-2 p-1 mb-1"> 
        <Table results={this.state.properties} />

        </div>
          <p className="center">Data Source: <a target="_blank" rel="noopener noreferrer" aria-label="Zillow API" href="https://rapidapi.com/apimaker/api/zillow-com1/">Zillow API </a></p>
       </div> 
      </div>
    )
  }
}

export default App;