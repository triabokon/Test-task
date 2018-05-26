import React from 'react';
import { Grid,ListGroup, ListGroupItem, Badge } from 'react-bootstrap';
var $ = require ('jquery')

const ItemList = (props) => {
    // const itemClicked = (id, path, e) => {
    //     $.ajax({
    //           url:  "http://127.0.0.1:5000/"+path,
    //           dataType: 'json',
    //           method: 'POST',
    //           data: {id:id},
    //           success: function(data) {
    //             console.log(data)
    //               props.items[id].clicks+=1
    //           }.bind(this),
    //           error: function(xhr, status, error) {
    //             console.log('An error ('+status+') occured:', error.toString());
    //           }.bind(this)
    //         });
    // }
    console.log('props')
    console.log(props)
    if (props.length != 0) {
        return (
            <Grid>
                <br/>
                <ListGroup>
                    {props.items.map((item) => {
                    return (
                        <ListGroupItem key={item.id} header={item.title} onClick={ e => props.event(item.id, props.path, props.items, e)}>
                            <p>Cost: {item.cost} UAH<br/>Size: {item.size}</p>
                            <Badge color="primary">{item.clicks} clicks</Badge>
                        </ListGroupItem>
                    )
                })}
                </ListGroup>
            </Grid>
        )
    } else return null
};

export default ItemList;