import React from "react";
import ItemList from './ItemList'
import {Button, Grid, Jumbotron, Tabs, Tab} from "react-bootstrap";
var $ = require ('jquery');

export default class App extends React.Component {
    constructor(props) {
        super(props);

        let url = (window.location.href).split('/');

        this.state = {
            location: url[2],
            tvs: [],
            fridges: []
        };

        this.itemClicked = this.itemClicked.bind(this);
        this.resetClicks = this.resetClicks.bind(this);
    }

    getTVs(){
         $.ajax({
              url: "http://"+this.state.location+'/tv',
              dataType: 'json',
              success: function(data) {
                this.setState({tvs: data.data.tvs.sort((a,b)=>{return b.clicks - a.clicks})},
                    console.log(this.state.items));
              }.bind(this),
              error: function(xhr, status, error) {
                console.log('An error ('+status+') occured:', error.toString());
              }.bind(this)
            });
    }

    getFridges(){
         $.ajax({
              url: "http://"+this.state.location+'/fridge',
              dataType: 'json',
              success: function(data) {
                this.setState({fridges: data.data.fridges.sort((a,b)=>{return b.clicks - a.clicks})}, console.log(this.state.items));
              }.bind(this),
              error: function(xhr, status, error) {
                console.log('An error ('+status+') occured:', error.toString());
              }.bind(this)
            });
    }

    itemClicked (id, path,items, e) {
        e.preventDefault();
        $.ajax({
              url:  "http://"+this.state.location+'/'+path,
              dataType: 'json',
              method: 'POST',
              data: {id:id},
              success: function(data) {
                console.log(data);
                items.find((element)=>{return element.id === id}).clicks += 1;
                if(path === 'tv')
                    this.setState({tvs: items.sort((a,b)=>{return b.clicks - a.clicks})});
                  else
                     this.setState({fridges: items.sort((a,b)=>{return b.clicks - a.clicks})})
              }.bind(this),
              error: function(xhr, status, error) {
                console.log('An error ('+status+') occured:', error.toString());
              }.bind(this)
            });
    };

     resetClicks (e) {
        e.preventDefault();
        $.ajax({
              url:  "http://"+this.state.location+"/reset",
              dataType: 'json',
              method: 'POST',
              success: function(data) {
                    console.log(data);
                    this.getFridges();
                    this.getTVs();
              }.bind(this),
              error: function(xhr, status, error) {
                console.log('An error ('+status+') occured:', error.toString());
              }.bind(this)
            });
    };

    componentDidMount(){
        this.getTVs();
        this.getFridges();
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
                        <ItemList items={this.state.tvs} path={'tv'} event={this.itemClicked}/>
                      </Tab>
                      <Tab eventKey={2} title={<h2>Fridges</h2>}>
                        <ItemList items={this.state.fridges} path={'fridge'} event={this.itemClicked}/>
                      </Tab>
                    </Tabs>
                    <br/>
                    <Button bsStyle='primary' onClick={e => this.resetClicks(e)}>Reset clicks</Button>
                    <br/>
                    <hr/>
                </Grid>
            </div>
        );
    }
}
