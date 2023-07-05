import React from 'react';
import { CCard, CCardHeader } from '@coreui/react';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';

const MyIssuesWork = ({ parsedBugs, header }) => {
  const bugTickets = parsedBugs.map((bug) => ({
    id: bug.id,
    name: bug.name,
    status: bug.status,
    startDateTime: bug.startDateTime,
    endDateTime: bug.endDateTime,
    lastmodified: bug.lastmodified,
    creator : bug.creator,
    collaborators : bug.collaborators,
    tags : bug.tags,
    severity : bug.severity,
  }));

  if (bugTickets.length === 0) {
    bugTickets.push({
      id: 0,
      name: 'No bugs found',
      status: '',
      startDateTime: '',
      lastmodified: '',
      creator : '',
      collaborators : '',
      tags : '',
      severity : '',
    });
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 140 },
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'status', headerName: 'Status', width: 80 },
    { field: 'startDateTime', headerName: 'Start Date', width: 140 },
    { field: 'lastmodified', headerName: 'Last Modified', width: 140 },
    { field: 'creator', headerName: 'Creator', width: 100 },
    { field: 'collaborators', headerName: 'Collaborators', width: 220 },
    { field: 'tags', headerName: 'Tags', width: 220 },
    { field: 'severity', headerName: 'Severity', width: 50 },
  ];

  return (
    <CCard className='rounded-5' style={{ height: '40%', width: '95%' }}>
      <CCardHeader>{header}</CCardHeader>
      <div className='overflow-auto align-items-center flex-column'>
        <div className='d-flex justify-content-evenly text-center'>
          <div className='w-100 h-100'>
            <DataGrid
              className='rounded-5'
              rows={bugTickets}
              columns={columns}
              pagination
              pageSize={5}
            />
          </div>
        </div>
      </div>
    </CCard>
  );
};

MyIssuesWork.propTypes = {
  parsedBugs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      startDateTime: PropTypes.string.isRequired,
    })
  ).isRequired,
  header: PropTypes.string.isRequired,
};

export default MyIssuesWork;
   