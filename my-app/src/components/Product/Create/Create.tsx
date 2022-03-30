import React, { useState } from 'react'
import Modal from '../Modal/Modal'

function Create() {

    const [open, setOpen] = useState(false);

    const openModal = (openModal: string) => {
        setOpen(false);
        if (openModal === "open") {
            setOpen(true);
        } else if (openModal === 'close') {
            setOpen(false);
        }
    }

    return (
        <div>
            <button className="btn createNew" onClick={() => setOpen(true)}>Create New Product</button>
            {
                open ?
                    <Modal openModal={openModal} />
                    : null
            }
        </div>
    )
}

export default Create