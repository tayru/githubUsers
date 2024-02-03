import React, { FC, useEffect, useState } from 'react';
import { Header } from '../Header/Header';
import { UsersList } from '../UsersList/UsersList';
import { fetchUserData, fetchOrgData } from '../../utils/api';
import { token, apiVersion } from '../../utils/apiConfig';
import { User, SearchResultItem } from '../../types';

export const UsersPage: FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`https://api.github.com/users`, {
          headers: {
            Authorization: `token ${token}`,
            'X-GitHub-Api-Version': apiVersion,
          },
        });

        if (response.ok) {
          const data: SearchResultItem[] = await response.json();
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
                organization: orgData.length > 0 ? orgData[0].login : '',
              };
            })
          );
          setUsers(usersData);
        } else {
          console.error(`Failed to fetch users: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Header />
      <main>
        <div className="container">
          <UsersList users={users} />
        </div>
      </main>
    </>
  );
};
