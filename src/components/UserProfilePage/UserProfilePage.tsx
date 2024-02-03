import React, { FC, useEffect, useState } from 'react';
import './UserProfilePage.css';
import { Header } from '../Header/Header';
import { useParams } from 'react-router-dom';
import { UserData } from '../../types';
import { formatNumberWithSpacesAndK } from '../../utils/formatNumberWithSpacesAndK';
import { fetchUserData, fetchUserRepos } from '../../utils/api';

export const UserProfilePage: FC = () => {
  const { id }: { id?: string } = useParams();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [repos, setRepos] = useState<any[]>([]);
  const [loadingRepos, setLoadingRepos] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserDataAndRepos = async () => {
      try {
        if (!id) {
          setError('User ID is not provided.');
          return;
        }

        // Fetch user data
        const userDataResponse = await fetchUserData(id);
        // @ts-ignore
        setUserData(userDataResponse);

        // Fetch user repositories
        setLoadingRepos(true);
        const reposResponse = await fetchUserRepos(id);
        if (reposResponse.ok) {
          const reposData = await reposResponse.json();
          setRepos(reposData);
        } else {
          console.error(`Failed to fetch user repositories: ${reposResponse.status}`);
        }
        setLoadingRepos(false);
      } catch (error) {
        const errorMessage = `Error fetching user data: ${error instanceof Error ? error.message : 'Unknown error'}`;
        setError(errorMessage);
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserDataAndRepos();
  }, [id]);

  return (
    <>
      <Header />

      <main>
        <div className="container">
          {error ? (
            <h1 className="title">Error: {error}</h1>
          ) : (
            <>
              <section className="user-profile">
                <div className="user-profile__image-container">
                  {userData && (
                    <img className="user-profile__image" src={userData.avatar_url} alt={`${userData.name}'s profile`} />
                  )}
                </div>
                <div className="user-profile__content">
                  {userData && (
                    <>
                      <h1 className="user-profile__title">
                        {userData.name ? userData.name.toUpperCase() : 'No Name'},{' '}
                        <span className="user-profile__accent">{id}</span>
                      </h1>
                      <p className="user-profile__text">
                        <span className="user-profile__accent">{formatNumberWithSpacesAndK(userData.followers)}</span>{' '}
                        подписчиков ·{' '}
                        <span className="user-profile__accent">{formatNumberWithSpacesAndK(userData.following)}</span>{' '}
                        подписок ·{' '}
                        {userData.blog && (
                          <a href={userData.blog} className="link" target="_blank" rel="noreferrer">
                            {userData.blog}
                          </a>
                        )}
                      </p>
                    </>
                  )}
                </div>
              </section>
              <section className="repository-list">
                <div className="repository-list__header">
                  <h2 className="repository-list__title">Репозитории</h2>
                  {userData && (
                    <a
                      href={`https://github.com/${id}?tab=repositories`}
                      className="link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Все репозитории
                    </a>
                  )}
                </div>

                <div className="repository-list__container">
                  {loadingRepos && <p>Загружаем репозитории...</p>}
                  {repos.map((repo) => (
                    <section className="repository-list__item" key={repo.id}>
                      <h3 className="repository-list__item-title">
                        <a href={repo.html_url} className="link" target="_blank" rel="noreferrer">
                          {repo.name}
                        </a>
                      </h3>
                      <p className="repository-list__item-text">{repo.description}</p>
                    </section>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </main>
    </>
  );
};
