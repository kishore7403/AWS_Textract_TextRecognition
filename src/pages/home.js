import React, { useState,useEffect  } from 'react';
import { Container, Paper, Typography, Button, TextField, AppBar, Toolbar, Box } from '@mui/material';
import styles from '../styles/home.module.css';

const HomePage = () => {
  const placeholderImageURL = 'https://www.pngarts.com/files/2/Upload-PNG-Transparent-Image.png';
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(placeholderImageURL);
  const [extractedText, setExtractedText] = useState('');
  const username = sessionStorage.getItem('username');

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(placeholderImageURL);
    }
  };

  const handleUploadImage = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Image = event.target.result.split(',')[1]; 
        const timestamp = Date.now();
        const filename = `${username}_content_${timestamp}.jpg`; 
        const requestBody = {
          content: base64Image,
          username: username,
          filename: filename,
        };
        console.log(requestBody);

        fetch('https://b8429pibz2.execute-api.us-east-1.amazonaws.com/v3/uploadimage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Failed to upload image');
            }
          })
          .then((data) => {
            console.log(data);
            alert('Image uploaded successfully!');
            sessionStorage.setItem('filename', filename);
          })
          .catch((error) => {
            console.error(error);
            alert('Error uploading image');
          });
      };

      reader.readAsDataURL(selectedFile);
    } else {
      alert('Please choose an image to upload.');
    }
  };
  

  const handleExtractText = () => {
    fetch('https://b8429pibz2.execute-api.us-east-1.amazonaws.com/v3/extracttext', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filename: sessionStorage.getItem('filename'),
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to extract text');
        }
      })
      .then((data) => {
       
        console.log(data);
       
        setExtractedText(data.extracted_text);
      })
      .catch((error) => {
       
        console.error(error);
        alert('Error extracting text');
      });
  };

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.replace('/login');
  };

  useEffect(() => {
   
    return () => {
      window.onpopstate = null;
    };
  }, []);
  

  return (
    <div>
     
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TextRecognition
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ mr: 2 }}>
              Welcome, {username}!
            </Typography>
            <Button onClick={handleLogout} color="inherit">
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <div className={styles.pageContainer}>
        <div className={styles.homeContainer}>
          <Container maxWidth="sm">
            <Paper elevation={3} className={styles.homePaper}>
              <Typography variant="h5" gutterBottom>
                Upload Image
              </Typography>
              <div className={styles.pictureContainer}>
                {previewImage && <img src={previewImage} alt="Preview" className={styles.previewImage} />}
              </div>
              <div className={styles.buttonContainer}>
                <input type="file" id="uploadInput" className={styles.uploadInput} onChange={handleFileInputChange} />
                <label htmlFor="uploadInput">
                  <Button variant="contained" component="span">
                    Choose File
                  </Button>
                </label>
                <Button onClick={handleUploadImage} variant="contained" component="span" className={styles.uploadImageButton}>
                  Upload Image
                </Button>
              </div>
            </Paper>
          </Container>
        </div>

        <div className={styles.middleContainer}>
          <div className={styles.welcomeContainer}>
            <Typography variant="h5" gutterBottom>
              Welcome, {username}!
            </Typography>
          </div>
          <Typography variant="body1" gutterBottom>
            Convert Code, Image, Handwriting to Text
          </Typography>
          <Button onClick={handleExtractText} variant="contained" color="primary" className={styles.extractButton}>
            Extract Text
          </Button>
        </div>

        <div className={styles.rightContainer}>
          <TextField
            multiline
            rows={10}
            variant="outlined"
            label="Extracted Text"
            value={extractedText}
            className={styles.textField}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;