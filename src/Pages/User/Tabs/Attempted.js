import React from 'react';
import { Card } from 'react-bootstrap';
import './Tab.css'


const Attempted = (props) => {

    return (
        <div>
            <div>
                {
                    (props.courses) ? (
                        <div className="Card">
                            {
                                props.courses.map(
                                    (obj) => (
                                        <Card key={obj.course_id} className="Card">
                                            <Card.Header>{obj.course_name}</Card.Header>
                                            <Card.Body >
                                                <h6 style={{ marginLeft: '33%', color: '#EA425C' }} >To be completed before or on {obj.due_date}</h6>
                                            </Card.Body>
                                        </Card>
                                    )
                                )
                            }
                        </div>
                    ) : null
                }
            </div>
        </div>
    );
    
};

export default Attempted;