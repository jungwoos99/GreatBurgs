import React, { useState } from "react";
import ReactModal from "react-modal";

export default function Home() {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    function toggleModal() {
        setModalIsOpen(prevModalIsOn => !prevModalIsOn)
    }

    return (
        <>
            <h1>Home Page</h1>
            <div onClick={() => toggleModal()}>Click Me!</div>
            <ReactModal
                isOpen={modalIsOpen}
                portalClassName="modal"
            >

            </ReactModal>
        </>
    )
}