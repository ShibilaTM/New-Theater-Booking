

import { Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { IoMdStar, IoMdStarOutline } from 'react-icons/io';

const MovieReview = () => {
  const [rating, setRating] = useState(Array(5).fill(false)); // Initialize array to keep track of star ratings
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = useState({ title: "", query: "" });

  const handleClickOpen = (val) => {
    setSelectedValue(val);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleStarClick = index => {
    const newRating = rating.map((_, i) => i <= index);
    setRating(newRating);
    // setComments({
    //   ...comments,
    //   star: index + 1 // Store the selected star rating (1-indexed)
    // });
  }
  return (
    <Grid container spacing={2}>
    <Grid item xs={12}>
      <h1 style={{
        padding: '50px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '70%'
      }}>Movie Review</h1>
    </Grid>
    <Grid item xs={12}>
      <Card style={{ marginLeft: "4em", width: "60%", padding: "1em", marginRight: "5em" }}>
        <Grid container spacing={2}>
          <Grid item xs={5} sm={9} md={10}>
            Add Your Comments....
          </Grid>
          <Grid item xs={7} sm={3} md={2}>
            <React.Fragment>
              <Button variant="contained" style={{ backgroundColor: 'rgb(252, 110, 28)' }} onClick={handleClickOpen}>
                Add
              </Button>

              <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
                <DialogTitle><b>Movie Review</b></DialogTitle>
                <DialogContent>
           
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="h6">Ratings</Typography>
                      <div>
                        {rating.map((filled, index) =>
                          filled ? (
                            <IoMdStar
                              key={index}
                              style={{ color: 'orange', fontSize: '24px' }}
                              onClick={() => handleStarClick(index)}
                            />
                          ) : (
                            <IoMdStarOutline
                              key={index}
                              style={{ color: 'orange', fontSize: '24px' }}
                              onClick={() => handleStarClick(index)}
                            />
                          )
                        )}
                      </div>
                    </Grid>
                  </Grid>

                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Write your reviews..."
                    type="text"
                    fullWidth
                    variant="standard"
                    multiline
                    rows={4}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} style={{color:'rgb(252, 110, 28)'}}>Cancel</Button>
                  <Button onClick={handleClose} style={{color:'rgb(252, 110, 28)'}}>Add</Button>
                </DialogActions>
              </Dialog>

            </React.Fragment>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  </Grid>
  );
};

export default MovieReview;

