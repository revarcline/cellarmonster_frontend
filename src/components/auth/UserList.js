import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../actions/users.js';

const UserList = (props) => {
  useEffect(() => {
    props.getUsers;
  });

  const userCard = (userProps) => {
    return <h1>{userProps.name}</h1>;
  };

  const handleLoading = () => {
    if (props.userLoading == 'loading') {
      return <h1>loading</h1>;
    } else if (props.userLoading) {
      return (
        <div>
          {props.users.map((user) => {
            return <div key={`user-${user.id}`}>{userCard(user)}</div>;
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
