import React, { useState, useEffect, ReactImg, VueImg, AngularImg } from 'react';
import { useParams } from 'react-router-dom';
import {
    CCard, CHeader, CCardBody, CCardTitle, CCardText, CCardSubtitle, CCardLink,
    CCarousel, CCarouselItem, CImage, CCardFooter, CBadge, CCardHeader, CButton
} from '@coreui/react';
//import DefaultLayout from 'DefaultLayout'
import DefaultLayout from '../../layout/DefaultLayout';

const BugView = () => {
    const { bugId } = useParams();
    const [bugData, setBugData] = useState(null);

    useEffect(() => {
        // Fetch bug information based on bugId
        fetch(`http://localhost:80/bug/${bugId}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Request failed');
                }
            })
            .then((data) => {
                // Update bugData state with the fetched bug information
                setBugData(data);
            })
            .catch((error) => {
                // Handle any errors
                console.error(error);
            });
    }, [bugId]);

    const handleDelete = () => {
        // Send the DELETE request to the backend
        fetch(`http://localhost:80/bug/${bugData.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            if (response.ok) {
              // Success - handle the deletion however you like
              console.log('Bug deleted successfully.');
              // For example, redirect to a different page
              // history.push('/bugs');
            } else {
              throw new Error('Delete request failed');
            }
          })
          .catch((error) => {
            // Handle any errors
            console.error(error);
          });
      };

    const comments = ['comment1', 'comment2', 'comment3', 'comment4', 'comment5', 'comment6', 'comment7', 'comment8', 'comment9', 'comment10']

    var preppedComments = comments.map((comment) => ({
        color: 'light',
        textColor: 'black',
        comment: comment,

    }));

    //<p>Bug ID: {bugData.id}</p>

    return (

        <div>
            {bugData ? (
                <div className='row '>
                    <div className='col-xxl-8  col-lg-8 col-sm-6 w-100 pb-5'>
                        <CCard className='rounded-5 ' style={{ height: '50rem' }} >
                            <CCardBody>
                                <CCardTitle className='text-center fs-1 '>{bugData.name}
                                    <CButton
                                        className="float-end"
                                        color="danger"
                                        onClick={handleDelete}
                                    >Delete</CButton>
                                </CCardTitle>


                                <div className='row '>


                                    <CCardSubtitle className="mb-2 text-medium-emphasis text-center">id: {bugData.id}</CCardSubtitle>


                                </div>

                                <CCarousel controls indicators className='h-50'>
                                    <CCarouselItem>
                                        <CImage className="d-block w-100" src={ReactImg} alt="slide 1" />
                                    </CCarouselItem>
                                    <CCarouselItem>
                                        <CImage className="d-block w-100" src={VueImg} alt="slide 2" />
                                    </CCarouselItem>
                                    <CCarouselItem>
                                        <CImage className="d-block w-100" src={AngularImg} alt="slide 3" />
                                    </CCarouselItem>
                                </CCarousel>
                                <CHeader />
                                <CCardText className='h-25 overflow-auto'>{bugData.description}</CCardText>
                            </CCardBody>
                            <CCardFooter className='mh-100 w-100 overflow-auto fs-6 fw-bold rounded-bottom-5' style={{ height: '11rem' }}>
                                <div className='row'>
                                    <div className=' col-5 py-1 ps-3'>
                                        Ticket Start Date: {bugData.startDateTime}{' '}
                                    </div>
                                    <div className='col-5 py-1 pe-4'>
                                        {bugData.status === 1 ? `Last Modified Date: ${bugData.startDateTime}` : `Last End Date: ${bugData.startDateTime}`}

                                    </div>
                                </div>
                                <div className='py-2'>
                                    <br />
                                    Status: <span> </span>
                                    <CBadge className='' color="success">{bugData.status == 1 ? 'open' : 'closed'}</CBadge>
                                    <br />
                                    <br />
                                    Labels: <span> </span>
                                    <CBadge className='' color="success">Front-end</CBadge>
                                </div>
                            </CCardFooter>
                        </CCard>
                    </div>
                    <div className='col-xxl-8  col-lg-8 col-sm-6 w-100'>
                        <CCard className='rounded-5 ' style={{ width: '100%' }}>

                            <div className='row text-center py-5 items-center'>
                                <div className=' col-5  ps-5'>
                                    Creator: {bugData.creator}
                                </div>
                                <div className='col-5 pe-4'>
                                    Collaborators: {bugData.collaborators}
                                </div>
                            </div>
                            <CCardBody>
                                <div className='d-flex align-items-center flex-column  rounded-5 w-100'>
                                    <>
                                        {preppedComments.map((item, index) => (
                                            <CCard
                                                textColor={item.textColor}
                                                className={`mb-3 w-100 rounded-5 border-${item.color}`}
                                                style={{ maxWidth: '80%', height: '8rem', maxHeight: '28rem' }}
                                                key={index}
                                            >
                                                <CCardHeader className='rounded-5 '>NAME Commented on DATE</CCardHeader>
                                                <CCardBody>
                                                    <CCardText>{item.comment}
                                                    </CCardText>
                                                </CCardBody>
                                            </CCard>
                                        ))}
                                    </>
                                </div>
                            </CCardBody>
                        </CCard>
                    </div>
                </div>
            ) : (
                <p>Loading bug data...</p>
            )
            }
        </div >

    );
};

export default BugView;
