import { useAuthState } from "../context/auth"
import { Route, Navigate } from "react-router-dom"

const DynamicRoute = (props) => {


    const { user } = useAuthState()

    if (props.authenticated && !user) {
        return <Navigate replace to="/login" />
    } else if (props.guest && user) {
        return <Navigate replace to="/" />
    } else {
        return <> <Route element={props.element} {...props} /></>
    }
}

export default DynamicRoute