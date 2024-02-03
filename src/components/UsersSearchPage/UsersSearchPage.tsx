import React, { FC, useEffect, useState } from 'react';
import { Header } from '../Header/Header';
import { useLocation } from 'react-router-dom';
import { UsersList, User } from '../UsersList/UsersList';
import { fetchUsersData, fetchUserData, fetchOrgData } from '../../utils/api';
import { SearchResultItem } from '../../types';

export const UsersSearchPage: FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') || '';
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data: SearchResultItem[] = await fetchUsersData(query);

        if (data.length === 0) {
          setUsers([]);
        } else {
          const usersData: User[] = await Promise.all(
            data.map(async (item) => {
              const userData = await fetchUserData(item.login);
              const orgData = await fetchOrgData(item.login);

              return {
                login: item.login,
                id: item.id,
                avatarUrl: item.avatar_url,
                htmlUrl: item.html_url,
                repositories: userData.public_repos,
                organization: orgData.length > 0 ? orgData[0].login : 'Нет организации',
              };
            })
          );
          setUsers(usersData);
        }
      } catch (error) {
        setError(`Error fetching users: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [query]);

  return (
    <>
      <Header />
      <main>
        <div className="container">
          {loading ? (
            <div className="loader">Загрузка...</div>
          ) : error ? (
            <h1 className="title">Error: {error}</h1>
          ) : users.length === 0 ? (
            <h1 className="title">Ничего не найдено по запросу {query}</h1>
          ) : (
            <>
              <h1 className="title">Пользователи по запросу {query}</h1>
              <UsersList users={users} />
            </>
          )}
        </div>
      </main>
    </>
  );
};
