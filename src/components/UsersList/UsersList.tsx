import React, { FC } from 'react';
import './UsersList.css';
import { NavLink } from 'react-router-dom';

export interface User {
  login: string;
  id: number;
  avatarUrl: string;
  htmlUrl: string;
  repositories: number;
  organization: string;
}

interface UsersListProps {
  users: User[];
}

export const UsersList: FC<UsersListProps> = ({ users }) => {
  return (
    <div className="users-list">
      {users.map((user) => (
        <section className="users-list__item" key={user.id}>
          <div className="users-list__image-container">
            <img className="users-list__image" src={user.avatarUrl} alt={`${user.login}'s profile`} />
          </div>
          <div className="users-list__content">
            <h2 className="users-list__title">
              <NavLink to={`/users/${user.login}`} className="link">
                {user.login}
              </NavLink>
              , {`${user.repositories} репозитори${getRepositoriesDeclension(user.repositories)}`}
            </h2>
            <p className="users-list__text">{user.organization || 'Нет организации'}</p>
          </div>
        </section>
      ))}
    </div>
  );
};

const getRepositoriesDeclension = (count: number): string => {
  if (count % 100 >= 11 && count % 100 <= 19) {
    return 'ев';
  }

  const remainder = count % 10;
  if (remainder === 1) {
    return 'й';
  }

  if (remainder >= 2 && remainder <= 4) {
    return 'я';
  }

  return 'ев';
};
