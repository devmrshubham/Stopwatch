import { useState } from 'react'
import { Button, Modal } from "react-bootstrap"
import { updateCategoryName } from '../../Api/Category';
import { toast } from "react-toastify"

const UpdateCategory = (props) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [name, setname] = useState(props.name)
    const [Id, setId] = useState(props.id)

    const SubmitHandler = (e) => {
        e.preventDefault()

        const Admin = JSON.parse(localStorage.getItem("login"))

        const itemId = e.target.itemId.value
        const data = { name: e.target.name.value }
        const id = Admin.user.User?._id


        updateCategoryName(id, itemId, data)
            .then(
                (success) => {
                    console.log(success)
                    if (success.data.status === 1) {
                        toast.success(success.data.msg)
                        e.target.reset()
                        handleClose()
                        props.refesh()
                    } else {
                        toast.error(success.data.msg)
                    }
                }
            ).catch(
                (error) => {
                    console.log(error)
                }
            )







    }


    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Edit
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Category Name Update</Modal.Title>
                </Modal.Header>
                <form onSubmit={(e) => SubmitHandler(e)}>
                    <Modal.Body>
                        <input type="text" name='name' value={name} onChange={(e) => setname(e.target.name.value)} placeholder='Enter Category Name' className=' form-control ' />
                        <input type="text" hidden value={Id} name='itemId' className='form-control' />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type='submit'>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default UpdateCategory
