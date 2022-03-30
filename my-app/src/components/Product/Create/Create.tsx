import React, { useState } from 'react'
import Modal from '../Modal/Modal'

function Create() {

    const [open, setOpen] = useState(false);

    const openModal = (openModal: string) => {
        setOpen(false);
        if (openModal === "open") {
            setOpen(true);
        } else if (openModal === "close") {
            setOpen(false);
        }
    }

    const [choose, setChoose] = useState('');
    
    return (
        <div>
            <button className="btn createNew" onClick={() => (openModal("open"), setChoose("create"))}>Create New Product</button>
            {
                open ?
                    <Modal openModal={openModal} choose={choose} />
                : null
            }
        </div>
    )
}

export default Create