import React from 'react'
import PropTypes from 'prop-types';
import { CCard, CCardBody, CCardHeader, CCardFooter, CCardText, CCardTitle, CButton, CProgressBar, CProgress } from '@coreui/react';
import { CChart } from '@coreui/react-chartjs';


function MyIssuesChart({completedTasks, lastYearTasks, parsedBugs, name}) {

    const progress = (completedTasks / lastYearTasks) * 100; 

    const filteredBugsClosed = parsedBugs.filter(bug => bug.status === 'closed');

    const bugsClosed = Array.from({ length: 12 }, () => 0);

    filteredBugsClosed.forEach(bug => {
      const month = new Date(bug.endDateTime).getMonth();
      bugsClosed[month]++;
    });

    const filteredBugsOpened = parsedBugs.filter(bug => bug.status === 'open' && bug.creator.toLowerCase() === name.toLowerCase());
    const bugsOpened = Array.from({ length: 12 }, () => 0);
    filteredBugsOpened.forEach(bug => {
        const month = new Date(bug.startDateTime).getMonth();
        bugsOpened[month]++;
      });

  return (
    <div className="container mb-5">
            <CCard className="text-center">
                <CCardBody>
                    <CCardTitle className="row align-items-start mx-5 mt-3">Performance Metric</CCardTitle>
                    <CChart
                        className="mt-3 "
                        type="line" 
                        data={
                            {
                                labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October","November","December"],
                                datasets: [
                                    {
                                        label: "Bugs Found",
                                        backgroundColor: "rgba(220, 220, 220, 0.2)",
                                        borderColor: "rgba(220, 220, 220, 1)",
                                        pointBackgroundColor: "rgba(220, 220, 220, 1)",
                                        pointBorderColor: "#fff",
                                        data: bugsOpened
                                    },
                                    {
                                        label: "Bugs Closed",
                                        backgroundColor: "rgba(151, 187, 205, 0.2)",
                                        borderColor: "rgba(8, 55, 102, 65)",
                                        pointBackgroundColor: "rgba(151, 187, 205, 1)",
                                        pointBorderColor: "#fff",
                                        data: bugsClosed
                                    },
                                ],
                            }}
                    />
                </CCardBody>
            </CCard>
        </div>
  )
}

MyIssuesChart.propTypes = {
    parsedBugs: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          status: PropTypes.string.isRequired,
          startDateTime: PropTypes.string.isRequired,
          // Add other necessary prop validations for each bug object
        })
      ).isRequired,
    completedTasks: PropTypes.number.isRequired,
    lastYearTasks: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  };

export default MyIssuesChart