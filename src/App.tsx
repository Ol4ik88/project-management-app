import PrivateRoute from 'components/routing/PrivateRoute';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Container } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Container className="text-center">
          <h1>Start project.</h1>
        </Container>
      </header>
      <Routes>
        <Route path="/" element={<p>Welcome page</p>} />
        <Route path="/login" element={<p>Sign in</p>} />
        <Route path="/registration" element={<p>Sign up</p>} />
        <Route
          path="/boards"
          element={
            <PrivateRoute>
              <p>Boards</p>
            </PrivateRoute>
          }
        />
        <Route
          path="/boards/:boardId"
          element={
            <PrivateRoute>
              <p>Board ID</p>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <p>profile</p>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<p>404</p>} />
      </Routes>
    </div>
  );
}

export default App;
