import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Spinner = ({ path = "/login" }) => {
    const [Count, setCount] = useState(3);
    const Navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const Interval = setInterval(() => {
            setCount((PreValue) => --PreValue)
        }, 1000);
        Count === 0 && Navigate(`${path}`, { state: location.pathname })
        return () => clearInterval(Interval)
    }, [Count, Navigate, location, path])
    return (
        <>
            <div style={{ height: "100vh" }} className="d-flex justify-content-center  align-items-center " >
                <div className=" text-center ">redirecting to you in {Count} second</div>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>

        </>
    )
}

export default Spinner
