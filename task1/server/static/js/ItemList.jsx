import React from 'react';
import { Grid,ListGroup, ListGroupItem, Badge } from 'react-bootstrap';

const ItemList = (props) => {

    if (props.length != 0) {
        return (
            <Grid>
                <br/>
                <ListGroup>
                    {props.items.map((item) => {
                    return (
                        <ListGroupItem key={item.id} header={item.title} onClick={ e => props.event(item.id, props.path, props.items, e)}>
                            Cost: {item.cost} UAH<br/>Size: {item.size}<br/><br/>
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