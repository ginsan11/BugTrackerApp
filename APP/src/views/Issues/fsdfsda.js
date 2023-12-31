import React from 'react'
import PropTypes from 'prop-types';
import { CCard, CCardBody, CCardHeader, CCardFooter, CCardText, CCardTitle, CButton, CProgressBar, CProgress } from '@coreui/react';
import { CChart } from '@coreui/react-chartjs';


function MyIssuesChart({completedTasks, lastYearTasks}) {

    const progress = (completedTasks / lastYearTasks) * 100; 

    console.log(progress);

  return (
    <div className="container">
            <CCard className="text-center">
                <CCardBody>
                    <CCardTitle className="row align-items-start mx-5 mt-3">Yearly Performance Metric</CCardTitle>
                    <CChart
                        className="mt-3 "
                        type="line" 
                        data={
                            {
                                labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October","November","December"],
                                datasets: [
                                    {
                                        label: "Bugs found",
                                        backgroundColor: "rgba(220, 220, 220, 0.2)",
                                        borderColor: "rgba(220, 220, 220, 1)",
                                        pointBackgroundColor: "rgba(220, 220, 220, 1)",
                                        pointBorderColor: "#fff",
                                        data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
                                    },
                                    {
                                        label: "Bugs fixed",
                                        backgroundColor: "rgba(151, 187, 205, 0.2)",
                                        borderColor: "rgba(151, 187, 205, 1)",
                                        pointBackgroundColor: "rgba(151, 187, 205, 1)",
                                        pointBorderColor: "#fff",
                                        data: [50, 12, 28, 29, 7, 25, 12, 70, 60, 30, 20, 10]
                                    },
                                    {
                                        label: "Backlog Completed",
                                        backgroundColor: "rgba(90, 110, 250, 0.2)",
                                        borderColor: "rgba(90, 110, 250, 1)",
                                        pointBackgroundColor: "rgba(90, 110, 250, 1)",
                                        pointBorderColor: "#fff",
                                        data: [25, 6, 14, 15, 3, 10, 6, 35, 30, 15, 10, 5]
                                    },
                                ],
                            }}
                    />
                </CCardBody>
                <CCardFooter >
                    <div className="d-flex text-center my-3">
                        <div className='px-2 text-medium-emphasis'>
                            Track to passing last month:
                        </div>
                        <strong>
                            {completedTasks}
                            &nbsp; Tasks Completed
                        </strong>
                        <div className="p-2 flex-grow-1">
                            <CProgress className="mb-1">
                                <CProgressBar value={progress}>{progress}%</CProgressBar>
                            </CProgress>
                        </div>
                    </div>
                </CCardFooter>
            </CCard>
        </div>
  )
}

MyIssuesChart.propTypes = {
    completedTasks: PropTypes.number.isRequired,
    lastYearTasks: PropTypes.number.isRequired,
  };

export default MyIssuesChart