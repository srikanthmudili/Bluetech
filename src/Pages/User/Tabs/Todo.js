import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './Tab.css'


const Todo = (props) => {


    return (
        <div>
            {
                (props.courses) ? (
                    <div className="Card">
                        {
                            props.courses.map(
                                (obj, i) => (
                                    <Card key={obj.course_id} className="Card">
                                        <Card.Header>{obj.course_name}</Card.Header>
                                        <Card.Body className="col">
                                            <h6 style={{ float: 'right' }}>Due: {obj.due_date}</h6>
                                            <div style={{ float: 'left' }}>
                                                <p>Course ID: {obj.course_id}</p>
                                                <Button variant={
                                                    obj.is_attempted ? (
                                                        "success"
                                                    ) : (
                                                            "warning"
                                                        )
                                                } size="sm">{
                                                        obj.is_attempted ? (
                                                            <div>
                                                                To be Completed
                                                            </div>
                                                        ) : (<div>
                                                            Yet to Start
                                                        </div>)
                                                    }</Button>
                                            </div>
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

export default Todo;