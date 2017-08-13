import React, { Component } from 'react';
import './semantic.min.css';
import './App.css';
import Nav from './components/Nav';
import About from './components/About';
import ClickerPage from './components/ClickerPage';
import Options from './components/Options';
import Achievements from './components/Achievements';
import GameData from './data/GameData';

var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "Clicking Master",
      score: 0,
      upgrades: GameData.upgrades,
      buildings: GameData.buildings,
      clickModifier: 1,
      generatedScore: 0
    }
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handleScoreChange = this.handleScoreChange.bind(this);    
    this.handleUpgradePurchase = this.handleUpgradePurchase.bind(this);    
    this.calculateClickModifier = this.calculateClickModifier.bind(this);    
  }




  handleUsernameInput(username){
    this.setState({
      username: username.target.value
    });
  }

  handleScoreChange(num){
    const updatedScore = this.state.score + num*this.state.clickModifier;
    this.setState({
      score: updatedScore
    });
  }

  handleUpgradePurchase(id){
    let tempUpgrades = this.state.upgrades;
    if(this.state.score >= tempUpgrades[id].price){
      const updatedScore = this.state.score - tempUpgrades[id].price;
      tempUpgrades[id].active = true;
      this.setState({
        upgrades: tempUpgrades,
        score: updatedScore
      });
      this.calculateClickModifier();
    }
  }

  calculateClickModifier(){
    let newModifier = 1;
    this.state.upgrades.forEach(function(upgrade){
      if (upgrade.active === true){
        newModifier = newModifier * upgrade.clickModifier;
      }
    })
    this.setState({
      clickModifier: newModifier
    });
  }
  render() {
    console.log(GameData);
    return (
      <Router>         
        <div className="App">
          <Nav name={"React Clicker"}/>
            <Switch>
              <Route exact path="/" render={(props) => (
              <ClickerPage username={this.state.username} passScoreChange={this.handleScoreChange} score={this.state.score} upgrades={this.state.upgrades} handleUpgradePurchase={this.handleUpgradePurchase} buildings={this.state.buildings}/>
               )}/>
              }
              <Route exact path="/about" component={About}/>
              <Route exact path="/options" render={(props) => ( <Options onUsernameInput={this.handleUsernameInput} username={this.state.username}/> )}/>              
              <Route exact path="/achievements" component={Achievements}/>
              <Route render={function(){
                  return <p>Not found</p>
              }}/>          
            </Switch>
        </div>
      </Router>        
    );
  }
}

export default App;
