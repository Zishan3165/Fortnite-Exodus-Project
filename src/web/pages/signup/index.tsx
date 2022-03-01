import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router';
import { displaySuccess } from '../../../utils/toaster';
import { InputBox } from '../../common/forms/InputBox';
import { FaExclamation } from 'react-icons/fa';
import { useAuth } from '../../../utils/hooks/useAuth';
import services from '../../../services';

export function Signup() {
  const { auth } = useAuth();
  if (auth?.username) {
    return <Navigate to="/logs" />;
  }
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setError(null);
      setLoading(true);
      const body = { username, email, password };
      const response = await services.signUp(body);
      if (response?.responseCode === 409) {
        return setError('User already exists');
      }
      displaySuccess('Success', 'Signup Successful. Please login');
      navigate('/login');
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="background-container">
      <div className="outer">
        <div className="inner">
          <h3>Sign Up</h3>
          <InputBox label="Username" onChange={setUsername} value={username} />
          <InputBox label="Email" onChange={setEmail} value={email} type="email" />
          <InputBox label="Password" type="password" onChange={setPassword} value={password} />
          {error && (
            <>
              <hr className="my-2" />
              <Alert variant="danger" className="my-0 py-2">
                <FaExclamation /> {error + ''}
              </Alert>
            </>
          )}
          <div className="text-center my-2">
            <Button
              onClick={handleSignup}
              className="btn btn-dark btn-block w-100"
              disabled={loading}>
              Sign Up
            </Button>
          </div>
          <p className="forgot-password text-right">
            Already registered?
            <span
              className="px-1"
              onClick={() => navigate('./../login')}
              style={{ cursor: 'pointer' }}>
              <u>Login</u>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}