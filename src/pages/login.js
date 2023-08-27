import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, TextField, Button, Grid } from '@mui/material';
import styles from '../styles/login.module.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    console.log('Username:', email);
    console.log('Password:', password);
    fetch('https://b8429pibz2.execute-api.us-east-1.amazonaws.com/v3/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    })
      .then((response) => {
        setLoading(false);
        return response.json(); 
      })
      .then((data) => {
        console.log('Response:', data);
        if (data.statusCode === 200 ) {
          sessionStorage.setItem('username', email);
          navigate('/home');
        } else {
          alert('Invalid credentials. Please try again.');
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
      });
  };
  
  

  return (
    <div className={styles.pageContainer}>
      <div className={styles.loginContainer}>
        <Container maxWidth="sm">
          <Paper elevation={3} className={styles.loginPaper}>
            <Typography variant="h5" gutterBottom>
              Login
            </Typography>
            <form onSubmit={handleSubmit} className={styles.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="password"
                    label="Password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={styles.submitButton}
                    disabled={loading}
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </Button>
                </Grid>
              </Grid>
            </form>
            <Typography variant="body2" align="center" gutterBottom>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </Typography>
          </Paper>
        </Container>
      </div>
    </div>
  );
};

export default LoginPage;
