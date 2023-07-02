import React from 'react'
import { CCard, CCardHeader, CCardBody, CCardTitle, CCardText} from '@coreui/react';



const MyIssuesWork = () => {

    const array = [

        { color: 'light', textColor: 'black' },
        { color: 'light', textColor: 'black' },
        { color: 'light', textColor: 'black' },
        { color: 'light', textColor: 'black' },
        { color: 'light', textColor: 'black' },
        { color: 'light', textColor: 'black' },
        { color: 'light', textColor: 'black' },
        { color: 'light', textColor: 'black' },
    ]

    return (
        <CCard  className='' style={{height: 600, width: 600}}>
            <CCardHeader >My Open Bugs</CCardHeader>
            <div className=' overflow-auto  align-items-center flex-column'>
            <>
                {array.map((item, index) => (
                    <CCard
                        color={item.color}
                        textColor={item.textColor}
                        className="mb-3 "
                        style={{ maxWidth: '38rem', maxLength: '30rem' }}
                        key={index}
                    >
                        <div className=' row row-cols-3 text-center'>
                            <CCardHeader >Name</CCardHeader>
                            <CCardHeader >Status</CCardHeader>
                            <CCardHeader >Created</CCardHeader>
                        </div>
                        <CCardBody className=' row row-cols-3 text-center '>
                            <CCardTitle >{item.color} card title</CCardTitle>
                            <CCardText >
                                Open
                            </CCardText>
                            <CCardText >
                                June 12th 2021
                            </CCardText>
                        </CCardBody>
                    </CCard>
                ))}
            </>
            </div>
        </CCard >
    )
}

export default MyIssuesWork