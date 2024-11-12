import React, { useEffect, useState, useContext } from 'react';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import { UserContext } from '../UserContext';


function VolunteerHistory() {
  const { user } = useContext(UserContext);

  const userId = user.id;

  const [volunteerParticipationData, setVolunteerParticipationData] = useState([]);

  useEffect(() => {
    const fetchVolunteerParticipationData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/history/${userId}`);
        setVolunteerParticipationData(response.data);
      } catch (error) {
        console.error('Error fetching volunteer participation data:', error);
      }
    };
    fetchVolunteerParticipationData();
  }, []);
  



  // const volunteerParticipationData = [
  //   {
  //     id: 1,
  //     title: 'Beach Cleanup',
  //     date: 'September 15, 2024',
  //     location: 'Santa Monica Beach',
  //     description: 'Help us clean up the beach and make it a cleaner place for everyone.',
  //     status: 'Participated'
  //   },
  //   {
  //     id: 2,
  //     title: 'Food Bank Volunteering',
  //     date: 'September 22, 2024',
  //     location: 'Downtown Community Food Bank',
  //     description: 'Assist in distributing food to those in need at the community food bank.',
  //     status: 'Registered'
  //   },
  //   {
  //     id: 3,
  //     title: 'Tree Planting Event',
  //     date: 'October 1, 2024',
  //     location: 'City Park',
  //     description: 'Join us in planting trees to help make our city greener.',
  //     status: 'Participated'
  //   }
  // ];

  return (
    <Container style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Volunteer Participation History
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Event Title</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Location</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {volunteerParticipationData.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.title}</TableCell>
                <TableCell>{event.date}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>{event.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default VolunteerHistory;
