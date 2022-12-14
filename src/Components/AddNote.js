import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import * as localForage from "localforage";
import moment from "moment";

import { useState } from "react";

const AddNote = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert("Please add some text to this note!");
      return;
    }

    localForage.setItem(moment().format("LLL"), {
      title: title,
      text: text,
    });

    onAdd({ title, text });

    setText("");
    setTitle("");
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form className="form" onSubmit={onSubmit}>
            <InputGroup className="mb-3">
              <Form.Control
                className="note-title note-creator"
                placeholder="Title"
                aria-label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </InputGroup>

            <Form.Group className="mb-3">
              <InputGroup>
                <Form.Control
                  required
                  className="note-text-input"
                  placeholder="Your note..."
                  rows={5}
                  as="textarea"
                  aria-label="With textarea"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </InputGroup>
            </Form.Group>
            <Button variant="success" type="submit">
              Add
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddNote;
