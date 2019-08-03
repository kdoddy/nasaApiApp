import React from 'react';
import './App.css';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      displayDate: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
    this.getPhotos = this.getPhotos.bind(this);
  }

  handleChange(date) {
    axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=' + date.toISOString().substring(0, 10) + '&api_key=1by7qsV7jpSN2AdwPPekp9vbvxfBql6aTYRr6lg3')
    .then( (response) => {
      this.setState({
        photos: response.data.photos,
        displayDate: date
    })
  })
  console.log(date.toISOString().substring(0, 10));
  }

  getPhotos(date) {
    axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=' + date + '&api_key=1by7qsV7jpSN2AdwPPekp9vbvxfBql6aTYRr6lg3')
      .then( (response) => {
        this.setState({
          photos: response.data.photos
      })
    })
  }

  componentWillMount() {
    axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity?api_key=1by7qsV7jpSN2AdwPPekp9vbvxfBql6aTYRr6lg3')
      .then( (response) => {
        this.getPhotos(response.data.rover.max_date)
    })
  }

  render () {
  return (
    <div className="App-header">
      <div>
        Select Date <br></br>
        <DatePicker
          selected={this.state.displayDate}
          onChange={this.handleChange}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a date"
        />
      </div>
      <header>
        Curiosity images:
        <div>
          {this.state.photos.length > 0 ?  
            this.state.photos.map((photo, i) => ( 
              <div><img src={photo.img_src} /></div>
            )) : 'No photos available at given date'
          }
        </div>
      </header>
    </div>
  );
}
}

export default App;
