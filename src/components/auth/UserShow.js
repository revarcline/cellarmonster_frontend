import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../features/users/userSlice.js';
import { deleteUser } from '../../actions/auth';
import UserForm from './UserForm';
import { Card, Button, Spinner } from 'react-bootstrap';

const UserShow = (props) => {
  const dispatch = useDispatch();

  const {
    users: {
      user: { data, status },
    },
  } = useSelector((state) => state);
  const user = data.attributes;

  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleGetUser = async () => await dispatch(getUser(props.match.params.id));
  const handleDeleteUser = async (data) => await dispatch(deleteUser(data));

  useEffect(() => {
    handleGetUser();
  }, []);

  const showEditForm = () => {
    // wrap edit form 
    if (showEdit) {
      return <UserForm editUser={user} mode="edit" />;
    }
  };

  const showDeleteForm = () => {
    if (showDelete) {
      return <p>pending delete form</p>;
    }
  };

  const userCard = () => {
    return (
      <div className="pt-3">
        <Card>
          <Card.Header>
            <Card.Title>{user.name}</Card.Title>
          </Card.Header>
          <Card.Body>
            <p>email: {user.email}</p>
            <p>role: {user.role}</p>
            <div>
              <Button
                onClick={() => {
                  setShowEdit(!showEdit);
                }}
                aria-controls="collapse-form"
              >
                Edit User
              </Button>
              {' ⦙ '}
              <Button
                onClick={() => {
                  setShowDelete(!showDelete);
                }}
                aria-controls="collapse-form"
              >
                Delete User
              </Button>
            </div>
          </Card.Body>
          {showEditForm(user)}
          {showDeleteForm(user)}
          <br />
        </Card>
      </div>
    );
  };

  const handleLoading = () => {
    if (status === 'loading') {
      return <Spinner animation="border" role="status" />;
    } else if (status === 'finished') {
      return <>{userCard()}</>;
    }
  };

  return <div>{handleLoading()}</div>;
};

export default UserShow;
