import React, { Component } from 'react';
import './App.css';
import NumberFormat from 'react-number-format';
import {Sparklines, SparklinesLine,SparklinesSpots,SparklinesNormalBand} from 'react-sparklines';

var dataset = require('./data.json')
var months = ['Jan ','Feb ','Mar ','Apr ','May ','Jun ','Jul ','Aug ','Sep ','Oct ','Nov ','Dec '];
class App extends Component {

  visualize(dataset){
    return dataset.map(data => {
      return(
      <tr className='tableRow' key={data.weekEnding}>
          <td>{data.weekEnding}</td>
          <td><NumberFormat value={data.retailSales} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
          <td><NumberFormat value={data.wholesaleSales} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
          <td>{data.unitsSold}</td>
          <td><NumberFormat value={data.retailerMargin} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
        </tr>
    );
    })
  }

  printMonths()
  {
    return months.map(month =>{
      return (
        month
      )
    });
  }
  render() {
     var observations = [];
     
     dataset[0].sales.map(sale => {
       return observations.push(sale);
     });

     var retail_sales = [];
     var wholesale_sales = [];

    
     observations.map(observation => {
       return retail_sales.push(observation.retailSales);
     });

     observations.map(observation => {
       return wholesale_sales.push(observation.wholesaleSales);
     });
    return (
      <div className = 'parent_container'>
      <div className = 'image_container'>
        <img src = 	 "https://images-na.ssl-images-amazon.com/images/I/51h-a5IaHeL.jpg" alt = "Error resource not found" />
         <h3 align = 'center'>Shark Ninja</h3>
         <h4 align = 'center'>Pantry Blender Lightning Deal</h4>
    
         <a>Overview</a><br></br>
         <a>Sales</a>
        
       </div>
      
      <div className = 'retail_sales'>
        <Sparklines width = {200} data = {retail_sales} min = {0} max = {1000000} limit = {12}>
        <SparklinesLine style={{ strokeWidth : 0.15 ,stroke: "#2991c8", fill: "#2991c8"}} />
    <SparklinesSpots />
    <SparklinesNormalBand style={{ fill: "#2991c8", fillOpacity: .1 }} />  
        </Sparklines>

      </div>

      <div className = 'wholesale_sales'>
        <Sparklines data = {wholesale_sales} min = {0} max = {1000000} limit = {12}>
          <SparklinesLine width = {200} style={{ strokeWidth: 0.1, stroke: "red", fill: "red" }} />
          <SparklinesSpots/>
          <SparklinesNormalBand style={{ fill: "red", fillOpacity: .1 }} />  

        </Sparklines>
        <h1>{this.printMonths()}</h1>
        <h5 style ={{color : 'red'}} >Wholesale Sales</h5>
        <h5 style = {{color : '#336aff'}} >Retail Sales</h5>
        
      </div>

      
      <div className = 'statsTable'>
          <table>
            <thead>
              <tr>
                <th>Week Ending</th>
                <th>Retail</th>
                <th>Wholesale</th>
                <th>Units Sold</th>
                <th >Retail Margin</th>
              </tr>
            </thead>
            <tbody>
              {this.visualize(observations)}
            </tbody>
          </table>
        </div>
      </div>
    
    );
  }
}

export default App;
