import React, { useState } from 'react';
import {
    CContainer,
    CCol,
    CFormInput,
    CForm,
    CFormSelect,
    CFormCheck,
    CButton,
    CCard,
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

        const payload = {
            name: bugData.name,
            description: bugData.description,
            Creator: bugData.Creator,
            Collaborators: bugData.Collaborators,
            startDateTime: bugData.startDateTime,
            endDateTime: bugData.status === '1' ? null : bugData.endDateTime,
            status: Number(bugData.status),
            LinkedBugs: [],
            Tags: bugData.Tags,
            Severity: Number(bugData.Severity),
        };

        fetch('http://localhost:5157/bug', {
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
                            <CFormInput
                                type="text"
                                name="name"
                                value={bugData.name}
                                onChange={handleInputChange}
                                placeholder="Bug Name"
                                required
                            />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                type="textarea"
                                name="description"
                                value={bugData.description}
                                onChange={handleInputChange}
                                placeholder="Description"
                                required
                            />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                type="text"
                                name="Creator"
                                value={bugData.Creator}
                                onChange={handleInputChange}
                                placeholder="Creator"
                                required
                            />
                        </CCol>
                        <CCol md={6}>
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
                                <option value="4">Blocker</option>
                                <option value="5">Emergency</option>
                            </CFormSelect>
                        </CCol>
                        <CCol md={6}>
                            <CFormSelect
                                name="status"
                                value={bugData.status}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="0">Open</option>
                                <option value="1">Closed</option>
                            </CFormSelect>
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                type="datetime-local"
                                name="startDateTime"
                                value={bugData.startDateTime}
                                onChange={handleInputChange}
                                placeholder="Start Date & Time"
                                required
                            />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                type="datetime-local"
                                name="endDateTime"
                                value={bugData.endDateTime}
                                onChange={handleInputChange}
                                placeholder="End Date & Time"
                                disabled={bugData.status === '1'}
                                required={!bugData.status === '1'}
                            />
                        </CCol>
                        <CCol md={6}>
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
                        </CCol>
                        <CCol md={6}>
                            <CFormSelect
                                multiple
                                name="Tags"
                                value={bugData.Tags}
                                onChange={handleTagsChange}
                            >
                                <option value="backend">backend</option>
                                <option value="Bugmodel">Bugmodel</option>
                                <option value="frontend">frontend</option>
                                <option value="security">security</option>
                            </CFormSelect>
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
