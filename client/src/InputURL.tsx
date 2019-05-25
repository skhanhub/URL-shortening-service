// Import necessary libraries
import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const InputURL = (props: any) => {

  return (
    <form>
      <Form.Row>
        <Form.Control
          style={{width: '50em', fontSize: '0.5em'}}
          size="lg"
          type="text"
          placeholder="Incert URL"
          onChange={props.NewinputURL}
          onKeyPress={(e: any) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              props.GetURL()
            }
          }}
        />
        <Button
          style={{fontSize: '0.5em'}}
          variant="primary"
          onClick={props.GetURL}>
          Get URL
        </Button>
      </Form.Row>
    </form>
  )
}
// Export the component as the default object
export default InputURL;
