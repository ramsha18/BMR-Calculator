import React, { Component } from "react";
class Input extends Component {
  constructor() {
    super();
    this.state = {
      gender: "",
      weight: 0,
      heightfeet: 0,
      heightinch: 0,
      activity: "",
      age: 0,
      bmr: null,
      msg: null,
      weightunit: "Pounds",
      heightunit: "Feet and Inches",
      unitselect: 0,
      cal: null
    };
  }
  handleAgeChange = (event) => {
    this.setState({
      age: event.target.value
    });
  };
  handleWeightChange = (event) => {
    this.setState({
      weight: event.target.value
    });
  };
  handleHeightfeetChange = (event) => {
    this.setState({
      heightfeet: event.target.value
    });
  };
  handleHeightinchChange = (event) => {
    this.setState({
      heightinch: event.target.value
    });
  };
  handleGenderChange = (event) => {
    this.setState({
      gender: event.target.value
    });
  };
  calculatebmr = () => {
    let gender = this.state.gender;
    let weight = this.state.weight;
    let age = this.state.age;

    if (weight == 0 || age == 0 || this.state.heightfeet == 0 || gender == "") {
      this.setState({
        msg: "All Fields are Required"
      });
    } else if (gender == "1") {
      document.getElementById("disappear").style.display = "none";
      document.getElementById("workout").style.display = "block";
      if (this.state.unitselect == 1) {
        this.setState({
          bmr: parseInt(
            655 +
              4.35 * weight +
              4.7 *
                (parseInt(this.state.heightinch) +
                  12 * parseInt(this.state.heightfeet)) -
              4.7 * age
          ),
          msg: ""
        });
      } else {
        this.setState({
          bmr: parseInt(
            655 + 9.6 * weight + 1.8 * this.state.heightfeet - 4.7 * age
          ),
          msg: ""
        });
      }
    } else if (gender == "2") {
      document.getElementById("disappear").style.display = "none";
      document.getElementById("workout").style.display = "block";
      if (this.state.unitselect == 1) {
        this.setState({
          bmr: parseInt(
            66 +
              6.23 * weight +
              12.7 *
                (parseInt(this.state.heightinch) +
                  12 * parseInt(this.state.heightfeet)) -
              6.8 * age
          ),
          msg: ""
        });
      } else {
        this.setState({
          bmr: parseInt(
            66 + 13.7 * weight + 5 * this.state.heightfeet - 6.8 * age
          ),
          msg: ""
        });
      }
    }
  };
  showImperial = () => {
    this.setState({
      weightunit: "Pounds",
      heightunit: "Feet and Inches",
      msg: "",
      unitselect: 1
    });
    document.getElementById("appear").style.display = "block";
    document.getElementById("heightInches").style.display = "unset";
  };
  showMetric = () => {
    this.setState({
      weightunit: "Kg",
      heightunit: "Cm",
      msg: "",
      unitselect: "2"
    });
    document.getElementById("appear").style.display = "block";
    document.getElementById("heightInches").style.display = "none";
  };

  handleActivity = (event) => {
    this.setState({
      activity: event.target.value
    });
  };

  calculateCalories = () => {
    if (
      this.state.activity == "" ||
      this.state.activity == "0" ||
      this.state.activity == 0
    ) {
      this.setState({
        msg: "Please Select Activity",
        cal: null
      });
    } else {
      this.setState({
        msg: "",
        cal: parseInt(this.state.activity * this.state.bmr)
      });
    }
  };

  render() {
    return (
      <div id="bmrcalc">
        <div className="form">
          <h2>BMR &amp; Daily Calorie Calculator</h2>
          <h4>{this.state.msg}</h4>
          <div id="disappear">
            <div className="Unit">
              <button
                type="button"
                className="unitbtn"
                onClick={this.showImperial}
              >
                Imperial
              </button>
              <button
                type="button"
                className="unitbtn"
                onClick={this.showMetric}
              >
                Metric
              </button>
            </div>
            <div className="main" id="appear">
              <div className="inputwrap padd">
                <label className="label">Gender</label>
                <label>
                  <input
                    type="radio"
                    onChange={this.handleGenderChange}
                    className="genderF"
                    name="gender"
                    value="1"
                  />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    onChange={this.handleGenderChange}
                    className="genderM"
                    name="gender"
                    value="2"
                  />
                  Male
                </label>
              </div>
              <div className="inputwrap">
                <label className="label">
                  Weight in {this.state.weightunit}
                </label>
                <input
                  type="number"
                  onChange={this.handleWeightChange}
                  name="weight"
                  className="weight"
                  min="0"
                  max="999"
                />
              </div>
              <div className="inputwrap">
                <label className="label">
                  Height in {this.state.heightunit}
                </label>
                <input
                  type="number"
                  onChange={this.handleHeightfeetChange}
                  name="heightFeet"
                  className="heightFeet"
                  min="0"
                  max="8"
                />
                <input
                  type="number"
                  onChange={this.handleHeightinchChange}
                  name="heightInches"
                  id="heightInches"
                  className="heightInches"
                  min="0"
                  max="11"
                />
              </div>
              <div className="inputwrap">
                <label className="label">Age in years</label>
                <input
                  type="number"
                  onChange={this.handleAgeChange}
                  className="age"
                  name="age"
                  min="0"
                  max="120"
                />
              </div>
              <button type="button" onClick={this.calculatebmr}>
                Calculate BMR
              </button>
            </div>
          </div>
          <div className="workout main" id="workout">
            <h3>Your BMR is : {this.state.bmr}</h3>
            <div className="inputwrap inputwork">
              <label className="label">Workout in a Week</label>
              <select
                className="activity"
                name="activity"
                onChange={this.handleActivity}
              >
                <option value="0">Select your Activity</option>
                <option value="1.2">
                  Sedentary (Very little or no exercise, and desk job)
                </option>
                <option value="1.375">
                  Lightly Active (Light exercise 1 to 3 days per week)
                </option>
                <option value="1.55">
                  Moderately Active (Moderate exercise 3 to 5 days per week)
                </option>
                <option value="1.725">
                  Very Active (Heavy exercise 6 to 7 days per week)
                </option>
                <option value="1.9">
                  Extremely Active (Very intense exercise, and physical job,
                  exercise multiple times per day)
                </option>
              </select>
            </div>
            <button type="button" onClick={this.calculateCalories}>
              Calculate Calories
            </button>
            <p>
              <h3>Daily KiloCalories Needed : {this.state.cal}</h3>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Input;
