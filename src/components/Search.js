import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useHistory, withRouter } from 'react-router-dom';

const Search = () => {
  const history = useHistory();
  const [query, setQuery] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    history.push(`/search/${query}`);
  };

  return (
    <Form onSubmit={onSubmit} inline>
      <InputGroup>
        <Form.Control
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Enter a term or SKU"
        />
        <InputGroup.Append>
          <Button type="submit">Search</Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
};

export default withRouter(Search);
