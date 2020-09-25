import React from 'react';
import { Card } from 'react-bootstrap';
import './Tab.css'

const Completed = (props) => {
    return (
        <div>
            {
                (props.courses) ? (
                    <div>
                        {
                            props.courses.map(
                                (obj) => (
                                    <Card key={obj.course_id} className="Card">
                                        <Card.Header>{obj.course_name}</Card.Header>
                                        <Card.Body className="row justify-content-around">
                                            <h6 style={{ color: '#218F76' }} >Completed on {obj.due_date}</h6>
                                            <h6 style={{color: '#3C40C6'}}>Points Earned : {obj.points_earned}</h6>
                                        </Card.Body>
                                    </Card>
                                )
                            )
                        }
                    </div>
                ) : null
            }
        </div>
    );
};

export default Completed;