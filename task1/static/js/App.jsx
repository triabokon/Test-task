import React from "react";
import ItemList from './ItemList'
import {Grid, Jumbotron, Tabs, Tab} from "react-bootstrap";
var $ = require ('jquery')

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            tvs:[],
            fridges:[]
        }
    }

    getTVs(){
         $.ajax({
              url: 'http://127.0.0.1:5000/tv',
              dataType: 'json',
              success: function(data) {
                this.setState({tvs: data.data.tvs}, console.log(this.state.items));
              }.bind(this),
              error: function(xhr, status, error) {
                console.log('An error ('+status+') occured:', error.toString());
              }.bind(this)
            });
    }

    getFridges(){
         $.ajax({
              url: 'http://127.0.0.1:5000/fridge',
              dataType: 'json',
              success: function(data) {
                this.setState({fridges: data.data.fridges}, console.log(this.state.items));
              }.bind(this),
              error: function(xhr, status, error) {
                console.log('An error ('+status+') occured:', error.toString());
              }.bind(this)
            });
    }

    componentDidMount(){
        this.getTVs()
        this.getFridges()
    }

    render () {
        return (
            <div>
                <Jumbotron>
                    <Grid>
                        <h1>Televisions and Refrigerators</h1>
                          <p>
                            This page contains two tabs with sortable lists with data about TVs and Fridges.
                              You can click on list element and all items of the list will sort by count of clicks.
                          </p>
                    </Grid>
                </Jumbotron>
                <Grid>
                    <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
                        <Tab eventKey={1} title={<h2>TV</h2>}>
                        <ItemList items={this.state.tvs}/>
                      </Tab>
                      <Tab eventKey={2} title={<h2>Fridges</h2>}>
                        <ItemList items={this.state.fridges}/>
                      </Tab>
                    </Tabs>
                </Grid>
            </div>
        );
    }
}
