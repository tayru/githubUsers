import { apiVersion, token } from './apiConfig';
import { User, SearchResultItem, SearchResult } from '../types';

export const fetchUserData = async (login: string): Promise<User> => {
  const userResponse = await fetch(`https://api.github.com/users/${login}`, {
    headers: {
      Authorization: `token ${token}`,
      'X-GitHub-Api-Version': apiVersion,
    },
  });
  return userResponse.json();
};

export const fetchOrgData = async (login: string): Promise<any[]> => {
  const orgResponse = await fetch(`https://api.github.com/users/${login}/orgs`, {
    headers: {
      Authorization: `token ${token}`,
      'X-GitHub-Api-Version': apiVersion,
    },
  });
  return orgResponse.json();
};

export const fetchUsersData = async (query: string): Promise<SearchResultItem[]> => {
  const response = await fetch(`https://api.github.com/search/users?q=${query}`, {
    headers: {
      Authorization: `token ${token}`,
      'X-GitHub-Api-Version': apiVersion,
    },
  });

  if (response.ok) {
    const data: SearchResult = await response.json();
    return data.items;
  } else {
    throw new Error(`Failed to fetch users: ${response.status}`);
  }
};

export const fetchUserRepos = async (login: string) => {
  return fetch(`https://api.github.com/users/${login}/repos`, {
    headers: {
      Authorization: `token ${token}`,
      'X-GitHub-Api-Version': apiVersion,
    },
  });
};
