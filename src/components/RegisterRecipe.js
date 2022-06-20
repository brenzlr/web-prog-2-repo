import React, { useRef } from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import "./FormStyle.css";
import Dropdown from "react-bootstrap/esm/Dropdown";
import DropdownButton from "react-bootstrap/esm/DropdownButton";
import { useState } from "react";

export function RegisterRecipe() {
  //const [isLoggedIn, setIsLoggedIn] = React.useContext(LoggedInContext);
  const titleRef = useRef();
  const descRef = useRef();
  const instructRef = useRef();
  const ratingRef = useRef();
  const fileRef = useRef();
  const timeRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault(); // prevent page reload

    // to fill in based on callPostBody
    fetch("http://localhost:3001/recipes/register", {
      method: "POST",
      body: JSON.stringify({
        title: titleRef.current.value,
        description: descRef.current.value,
        instructions: instructRef.current.value,
        img: fileRef.current.value,
        timeToMake: timeRef.current.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((data) => data.json())
      .then((json) => {
        json.success ? alert("Recipe created successfully") : alert(json.msg);
      });
  };

  const [value, setValue] = useState("");
  const handleSelect = (e) => {
    console.log(e);
    setValue(e);
    timeRef = value;
  };

  //need picture here -----------------------------------------------
  return (
    <div className="container">
      <Col md={{ span: 4, offset: 4 }} className="mt-5">
        <Card>
          <h1>Register a recipe</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title" className="control-label" placeholder="">
              Recipe's name{" "}
            </label>
            <input id="title" type="text" ref={titleRef} className="form-control" required />
            <br></br>
            <label htmlFor="description" className="control-label">
              Description{" "}
            </label>
            <input id="description" type="text" ref={descRef} className="form-control" required />
            <br></br>
            <label htmlFor="instructions" className="control-label">
              Instructions to replicate{" "}
            </label>
            <input
              id="instructions"
              type="text"
              ref={instructRef}
              className="form-control"
              required
            />
            {/*------hidden because the other users 
        will be the one to determine it and default value is 0------*/}
            <label htmlFor="rating"></label>
            <input
              id="rating"
              type="number"
              ref={ratingRef}
              hidden="true"
              className="form-control"
              value={0}
            />

            <br></br>
            <label for="myfile" className="control-label">
              Select image{" "}
            </label>
            <input type="file" id="myfile" ref={fileRef} className="form-control"></input>

            <br></br>
            <DropdownButton
              id="dropdown-basic-button"
              title="Time to prepare"
              onSelect={handleSelect}
              size="sm"
            >
              <Dropdown.Item eventKey="10">~10min</Dropdown.Item>
              <Dropdown.Item eventKey="20">~20min</Dropdown.Item>
              <Dropdown.Item eventKey="30">~30min</Dropdown.Item>
            </DropdownButton>
            <br></br>

            <button type="submit" className="btn btn-success float-right">
              Post Recipe!
            </button>
          </form>
        </Card>
      </Col>
    </div>
  );
}

export default RegisterRecipe;
