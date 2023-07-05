import React, { useState, useEffect } from 'react';
import { CRow, CCol, CWidgetStatsC, CCardTitle, CCardText } from '@coreui/react';
import { cilChartPie } from '@coreui/icons';
import CIcon from '@coreui/icons-react'
import MyIssuesChart from './MyIssuesChart';
import MyIssuesWork from './MyIssuesWork';
// import { CProgressBar } from '@coreui/';
// import { CProgress } from '@coreui/react-progress';
import { classNames } from 'classnames';
import { DataGrid } from '@mui/x-data-grid';



const AllIssues = () => {
  const [bugs, setBugs] = useState(null);
  useEffect(() => {
    // Replace "http://localhost:80/bug/" with the appropriate API endpoint URL
    fetch('http://localhost:80/bug/allbugs')
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const parsedBugs = data.map(bug => (
            {
              id: bug.id,
              name: bug.name,
              description: bug.description,
              creator: bug.creator,
              collaborators: bug.collaborators,
              startDateTime: bug.startDateTime,
              endDateTime: bug.endDateTime,
              lastmodified: bug.lastModified,
              status: bug.status === 0 ? 'open' : 'closed',
              linkedbugs: bug.linkedbugs,
              creator: bug.creator,
              collaborators: bug.collaborators,
              tags: bug.tags,
              severity: bug.severity,
            }));
          setBugs(parsedBugs);
        } else {
          setBugs(null);
        }
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });
  }, []);


  const filteredBugs = bugs ? bugs.filter(bug => bug.status === 'open') : [];


  const ticketsOpen = filteredBugs.length;
  const ticketsClosed = bugs ? bugs.length - filteredBugs.length : 0;

  return (

    <main>
      <h1 className='text-center py-5 pb-5'>All Issues</h1>
      <div className='d-flex justify-content-evenly text-center'>
        <div style={{ width: '100%' }}>
          <div className='d-flex justify-content-evenly text-center pb-5'>
            <CCol xs={4}>
              <CWidgetStatsC
                className="mb-3"
                icon={<CIcon icon={cilChartPie} height={36} />}
                color="primary"
                inverse
                progress={{ value: 100 }}
                text=""
                title="Tickets Open"
                value={ticketsOpen}
              />
            </CCol>
            <CCol xs={4}>
              <CWidgetStatsC
                className="mb-3"
                icon={<CIcon icon={cilChartPie} height={36} />}
                color="primary"
                inverse
                progress={{ value: 100 }}
                text=""
                title="Tickets Closed"
                value={ticketsClosed}
              />
            </CCol>
          </div>
        </div>
      </div>
      <div className='d-flex justify-content-around  text-center'>
        {bugs && <MyIssuesWork parsedBugs={bugs}
        header='All Issues'
          statusDisplay='closed'
        />}
      </div>
    </main>
  );
};

export default AllIssues;

