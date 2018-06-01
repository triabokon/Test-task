import React from "react";
import ItemList from './ItemList'
import {Button, Grid, Jumbotron, Tabs, Tab} from "react-bootstrap";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tvs: [],
            fridges: []
        };

        this.itemClicked = this.itemClicked.bind(this);
        this.resetClicks = this.resetClicks.bind(this);
    }

    getTVs(){
         fetch('/tv/')
              .then(response => response.json())
              .then(data => {
                this.setState({tvs: data.data.tvs.sort((a,b)=>{return b.clicks - a.clicks})},
                     console.log(this.state.items));
              }).catch(error => {
                  console.log(error)
         });
    }

    getFridges(){
        fetch('/fridge/')
              .then(response => response.json())
              .then(data => {
                this.setState({fridges: data.data.fridges.sort((a,b)=>{return b.clicks - a.clicks})},
                    console.log(this.state.items));
              }).catch(error => {
                  console.log(error)
         });
    }

    itemClicked (id, path,items, e) {
        e.preventDefault();
            fetch('/'+path+'/', {
              method: 'post',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({id:id})
            }).then(data => {
                items.find((element)=>{return element.id === id}).clicks += 1;
                if(path === 'tv')
                    this.setState({tvs: items.sort((a,b)=>{return b.clicks - a.clicks})});
                  else
                     this.setState({fridges: items.sort((a,b)=>{return b.clicks - a.clicks})})
            }).catch(error => {
                console.log(error)
            })
    };

     resetClicks (e) {
        e.preventDefault();

        fetch('/reset/', {
              method: 'post',
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(data => {
                    this.getFridges();
                    this.getTVs();
            }).catch(error => {
                console.log(error)
            })
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
                        <ItemList items={this.state.tvs} path='tv' event={this.itemClicked}/>
                      </Tab>
                      <Tab eventKey={2} title={<h2>Fridges</h2>}>
                        <ItemList items={this.state.fridges} path='fridge' event={this.itemClicked}/>
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
