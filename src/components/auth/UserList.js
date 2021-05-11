import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../actions/users.js';
import UserForm from './UserForm';
import { Card, Button } from 'react-bootstrap';

const UserList = (props) => {
  useEffect(() => {
    props.getUsers;
  });

  const [showEdit, setShowEdit] = useState(false);

  const userCard = (userProps) => {
    return (
      <div>
        <Card>
          <Card.Header>
            <Card.Title>{userProps.name}</Card.Title>
          </Card.Header>
          <Card.Body>
            <p>email: {userProps.email}</p>
            <p>role: {userProps.role}</p>
            <div>
              <Button
                onClick={() => {
                  setShowEdit(!showEdit);
                }}
              >
                Edit User
              </Button>
            </div>
          </Card.Body>
          {showEditForm(userProps)}
        </Card>
        <br />
      </div>
    );
  };

  const showEditForm = (userProps) => {
    if (showEdit) {
      return <UserForm mode="edit" editUser={userProps} />;
    }
  };

  const handleLoading = () => {
    if (props.userLoading == 'loading') {
      return <h1>loading</h1>;
    } else if (props.userLoading) {
      return (
        <div>
          {props.users.map((user) => {
            return <div key={`user-${user.id}`}>{userCard(user.attributes)}</div>;
          })}
        </div>
      );
    }
  };

  return (
    <div>
      <h1>All Users</h1>
      {handleLoading()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.usersList.data,
    userLoading: state.usersList.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: dispatch(getUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
