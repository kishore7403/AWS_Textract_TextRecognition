import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, TextField, Button, Grid } from '@mui/material';
import styles from '../styles/signup.module.css';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    fetch('https://b8429pibz2.execute-api.us-east-1.amazonaws.com/v3/signin', {
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
        if (response.ok) {
          navigate('/login');
        } else {
          alert('Signup failed');
        }
      })
      .catch((error) => {
      
        console.error('Error:', error);
      });
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.signupContainer}>
        <Container maxWidth="sm">
          <Paper elevation={3} className={styles.signupPaper}>
            <Typography variant="h5" gutterBottom>
              Sign Up
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
                  <TextField
                    fullWidth
                    type="password"
                    label="Confirm Password"
                    variant="outlined"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" fullWidth variant="contained" color="primary" className={styles.submitButton}>
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
            </form>
            <Typography variant="body2" align="center" gutterBottom>
              Already have an account? <Link to="/login">Log In</Link>
            </Typography>
          </Paper>
        </Container>
      </div>
    </div>
  );
};

export default SignUpPage;
