import React, { FC, useEffect } from 'react';
import { UserProfilePage } from '../UserProfilePage/UserProfilePage';
import { UsersPage } from '../UsersPage/UsersPage';
import { UsersSearchPage } from '../UsersSearchPage/UsersSearchPage';
import { Routes, Route, useLocation } from 'react-router-dom';

export const App: FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Routes>
        <Route path="/search" element={<UsersSearchPage />} />
        <Route path="/users/:id" element={<UserProfilePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/" element={<UsersPage />} />
      </Routes>
    </>
  );
};

export default App;
