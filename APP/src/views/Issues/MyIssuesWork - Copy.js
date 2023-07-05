import React from 'react';
import { CCard, CCardHeader, CCardBody, CCardTitle, CCardText } from '@coreui/react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom"


const MyIssuesWork = ({ parsedBugs, statusDisplay }) => {
  const filteredBugs = parsedBugs.filter(bug => bug.status === statusDisplay);
  var bugTickets = filteredBugs.map((bug) => ({
    color: 'light',
    textColor: 'black',
    name: bug.name,
    status: bug.status,
    startDateTime: bug.startDateTime,
    id: bug.id,
  }));

  if (bugTickets === null || bugTickets.length === 0) {
    bugTickets = [
      {
        color: 'light',
        textColor: 'black',
        status: 'No bugs found',
      }
    ];
  }


  return (
    <CCard className='' style={{ height: 600, width: 600 }}>
      <CCardHeader>My Open Bugs</CCardHeader>
      <div className='overflow-auto align-items-center flex-column'>
        <>
          {bugTickets.map((item, index) => (
            <CCard
              color={item.color}
              textColor={item.textColor}
              className='mb-3'
              style={{ maxWidth: '38rem', maxLength: '30rem' }}
              key={index}
            >
              <div className='row row-cols-3 text-center'>
                <CCardHeader>Name</CCardHeader>
                <CCardHeader>Status</CCardHeader>
                <CCardHeader>Created</CCardHeader>
              </div>
              <Link to={`/bug/${item.id}`}>
                <CCardBody className='row row-cols-3 text-center'>
                  <CCardTitle>{item.name}</CCardTitle>
                  <CCardText>{item.status}  </CCardText>
                  <CCardText>{item.startDateTime}</CCardText>
                </CCardBody>
              </Link>
            </CCard>
          ))}
        </>
      </div>
    </CCard>
  );
};

MyIssuesWork.propTypes = {
    parsedBugs: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        startDateTime: PropTypes.string.isRequired,
        // Add other necessary prop validations for each bug object
      })
    ).isRequired,
    statusDisplay: PropTypes.string.isRequired,
  };

export default MyIssuesWork;
