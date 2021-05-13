import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../actions/users';
import UserForm from './UserForm';
import { Card, Button, Spinner } from 'react-bootstrap';

const UserShow = (props) => {
  const dispatch = useDispatch();

  const { usersList } = useSelector((state) => state);
  const user = usersList.user.attributes;
  const loading = usersList.userLoading;

  const [showEdit, setShowEdit] = useState(false);

  const handleGetUser = async () => await dispatch(getUser(props.match.params.id));

  useEffect(() => {
    handleGetUser();
  }, []);

  const showEditForm = () => {
    // wrap edit form
    if (showEdit) {
      return <UserForm mode="edit" editUser={user} />;
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
              >
                Edit User
              </Button>
            </div>
          </Card.Body>
          {showEditForm(user)}
          <br />
        </Card>
      </div>
    );
  };

  const handleLoading = () => {
    if (loading === 'loading') {
      return <Spinner animation="border" role="status" />;
    } else if (loading === 'finished') {
      return <>{userCard()}</>;
    }
  };

  return <div>{handleLoading()}</div>;
};

export default UserShow;
