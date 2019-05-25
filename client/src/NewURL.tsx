// Import necessary libraries
import React from 'react';
import Form from 'react-bootstrap/Form'
import CopyToClipboard from 'react-copy-to-clipboard';
import Button from 'react-bootstrap/Button'
// Functional component for dispaying the movie names
const InputURL = (props: any) => {
  let hiddenStyle = props.shortenURL === '' ? "none" : "inline-block"
  return (
    <form>
      <Form.Row>
        <p style={{display: 'inline-block', margin: '2em'}}>{props.shortenURL}</p>
        <CopyToClipboard text={props.shortenURL}
          onCopy={props.setCopiedToTrue}
        >
          <Button style={{fontSize: '0.5em', display: hiddenStyle}}>Copy to Clipboard</Button>
        </CopyToClipboard>
      </Form.Row>
      <Form.Row>
        {props.copied ? <span style={{color: 'green'}}>Copied</span> : null}
      </Form.Row>
    </form>
  )
}
// Export the component as the default object
export default InputURL;
