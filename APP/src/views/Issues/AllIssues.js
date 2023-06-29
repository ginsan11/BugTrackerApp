import { CForm, CFormInput, CFormLabel, CFormTextarea } from '@coreui/react'
import React from 'react'

const AllIssues = () => {
    return (
        <div>
            <CForm>
                <CFormInput
                    type="ID"
                    id="exampleFormControlInput1"
                    label="Bug ID"
                    placeholder="00000000-0000-0000-0000-000000000000"
                    text="Must be 8-20 characters long."
                    aria-describedby="exampleFormControlInputHelpInline"
                />
            </CForm>
        </div>

    )
}

export default AllIssues