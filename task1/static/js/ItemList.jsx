import React from 'react';
import { Grid,ListGroup, ListGroupItem, Badge } from 'react-bootstrap';


const ItemList = (props) => {
    const alertClicked = (e) => {
      alert('You clicked the third ListGroupItem');
    }
    console.log('props')
    console.log(props)
    if (props.length != 0) {
        return (
            <Grid>
                <br/>
                <ListGroup>
                    {props.items.map((item) => {
                    return (
                        <ListGroupItem key={item.id} header={item.title} onClick={alertClicked}>
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