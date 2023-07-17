import React, { useState } from 'react';
import { format } from 'date-fns';
import {
    CContainer,
    CCol,
    CFormInput,
    CForm,
    CFormSelect,
    CFormCheck,
    CButton,
    CCard,
    CInputGroup,
    CInputGroupText,
    CFormTextarea,
} from '@coreui/react';

const CreateBug = () => {
    const [bugData, setBugData] = useState({
        name: '',
        description: '',
        Creator: '',
        Collaborators: [],
        startDateTime: '',
        endDateTime: '',
        status: '0',
        LinkedBugs: [],
        Tags: [],
        Severity: '0',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBugData({ ...bugData, [name]: value });
    };

    const handleCollaboratorsChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
        setBugData({ ...bugData, Collaborators: selectedOptions });
    };

    const handleTagsChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
        setBugData({ ...bugData, Tags: selectedOptions });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const formattedStartDateTime = format(new Date(bugData.startDateTime), "yyyy-MM-dd'T'HH:mm:ss");
        const formattedEndDateTime = format(new Date(bugData.endDateTime), "yyyy-MM-dd'T'HH:mm:ss");
        
        const payload = {
            name: bugData.name,
            description: bugData.description,
            Creator: bugData.Creator,
            Collaborators: bugData.Collaborators,
            startDateTime: formattedStartDateTime,
            endDateTime: bugData.status === '1' ? null : formattedEndDateTime,
            status: Number(bugData.status),
            LinkedBugs: [],
            Tags: bugData.Tags.split(',').map((tag) => tag.trim()),
            Severity: Number(bugData.Severity),

            //LinkedBugs: bugData.LinkedBugs.split(',').map((bug) => bug.trim()),
            //Tags: bugData.Tags.split(',').map((tag) => tag.trim()),
        };
    
        console.log(payload); // Print the form JSON object to the console
    
        fetch('http://localhost:80/bug/createbug', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    
    return (
        <CContainer fluid>
            <div>
                <CCard className='rounded-5'>
                    <div className='py-5 px-5'>
                        <CForm className="row g-3" onSubmit={handleSubmit}>
                            <CCol md={6}>
                                <CInputGroup>
                                    <CInputGroupText>Name</CInputGroupText>
                                    <CFormInput
                                        type="text"
                                        name="name"
                                        value={bugData.name}
                                        onChange={handleInputChange}
                                        placeholder="Bug Name"
                                        required
                                    />
                                </CInputGroup>
                            </CCol>
                            <CCol md={6}>
                                <CInputGroup>
                                    <CInputGroupText>Description</CInputGroupText>
                                    <CFormTextarea
                                        aria-label="With textarea"
                                        type="text"
                                        name="description"
                                        value={bugData.description}
                                        onChange={handleInputChange}
                                        placeholder="Description"
                                        required
                                    />
                                </CInputGroup>
                            </CCol>
                            <CCol md={6}>
                                <CInputGroup>
                                    <CInputGroupText>Creator</CInputGroupText>
                                    <CFormInput
                                        type="text"
                                        name="Creator"
                                        value={bugData.Creator}
                                        onChange={handleInputChange}
                                        placeholder="Creator"
                                        required
                                    />
                                </CInputGroup>
                            </CCol>
                            <CCol md={6}>
                                <CInputGroup>
                                    <CInputGroupText>Severity</CInputGroupText>
                                    <CFormSelect
                                        name="Severity"
                                        value={bugData.Severity}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="0">Low</option>
                                        <option value="1">Medium</option>
                                        <option value="2">High</option>
                                        <option value="3">Critical</option>
                                    </CFormSelect>
                                </CInputGroup>
                            </CCol>
                            <CCol md={6}>
                                <CInputGroup>
                                    <CInputGroupText>Status</CInputGroupText>
                                    <CFormSelect
                                        name="status"
                                        value={bugData.status}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="0">Open</option>
                                        <option value="1">Closed</option>
                                    </CFormSelect>
                                </CInputGroup>
                            </CCol>
                            <CCol md={6}>
                                <CInputGroup>
                                    <CInputGroupText>Start Date & Time</CInputGroupText>
                                    <CFormInput
                                        type="Datetime-local"
                                        name="startDateTime"
                                        value={bugData.startDateTime}
                                        onChange={handleInputChange}
                                        placeholder="Start Date & Time"
                                        required
                                    />
                                </CInputGroup>
                            </CCol>
                            <CCol md={6}>
                                <CInputGroup>
                                    <CInputGroupText>End Date & Time</CInputGroupText>
                                    <CFormInput
                                        type="Datetime-local"
                                        name="endDateTime"
                                        value={bugData.endDateTime}
                                        onChange={handleInputChange}
                                        placeholder="End Date & Time"
                                        disabled={bugData.status === '1'}
                                        required={!bugData.status === '1'}
                                    />
                                </CInputGroup>
                            </CCol>
                            <CCol md={6}>
                                <CInputGroup>
                                    <CInputGroupText>Collaborators</CInputGroupText>
                                    <CFormSelect
                                        multiple
                                        name="Collaborators"
                                        value={bugData.Collaborators}
                                        onChange={handleCollaboratorsChange}
                                    >
                                        <option value="Cole">Cole</option>
                                        <option value="Ali">Ali</option>
                                        <option value="Tim">Tim</option>
                                        <option value="Jonathan">Jonathan</option>
                                    </CFormSelect>
                                </CInputGroup>
                            </CCol>
                            <CCol md={6}>
                                <CInputGroup>
                                    <CInputGroupText>Tags</CInputGroupText>
                                    <CFormInput
                                        type="text"
                                        name="Tags"
                                        value={bugData.Tags}
                                        onChange={handleInputChange}
                                        placeholder="Tags (ex: frontend, backend, etc.)"
                                    />
                                </CInputGroup>
                            </CCol>
                            <CCol md={6}>
                                <CInputGroup>
                                    <CInputGroupText>Linked Bugs</CInputGroupText>
                                    <CFormInput
                                        type="text"
                                        name="LinkedBugs"
                                        value={bugData.LinkedBugs}
                                        onChange={handleInputChange}
                                        placeholder="Linked Bugs (ex: 1, 2, 3, etc.)"
                                    />
                                </CInputGroup>
                            </CCol>
                            <CCol xs={12}>
                                <CButton type="submit">Create Bug</CButton>
                            </CCol>
                        </CForm>
                    </div>
                </CCard>
            </div>
        </CContainer>
    );
};

export default CreateBug;
