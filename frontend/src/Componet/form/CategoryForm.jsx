import { useContext } from "react";
import { AddCategory} from "../../Api/Category";
import { MainContext } from "../../Context/ContextHolder"
import { toast } from "react-toastify"



const CategoryForm = ({ refesh }) => {
    const { Isloder } = useContext(MainContext)

    const SubmitHanlder = (e) => {
        e.preventDefault()

        const data = {
            name: e.target.name.value
        }
        const userData = localStorage.getItem("login")
        if (userData) {
            const admin = JSON.parse(userData)
            const id = admin.user.User._id
            if (id) {
                AddCategory(data, id)
                    .then(
                        (success) => {
                            if (success.data.status !== 1) {
                                toast.error(success.data.msg)
                            } else {
                                refesh()

                                toast.success(success.data.msg)
                                e.target.reset()
                            }
                        }
                    )
            }
        }


    }

    return (
        <>
            <form onSubmit={(e) => SubmitHanlder(e)} encType="multipart/form-data">
                <div className="form-group">
                    <input
                        type="name"
                        placeholder="create category name"
                        className="form-control  my-3   w-50 "
                        name="name"
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </>
    );
};

export default CategoryForm;
