import AppLayout from "../components/global/layout/Layout"
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

const ProtectedRoute = ({ type, path, children, title, parent }) => {

    const { loggedIn } = useSelector(state => state.user);
    const params = useParams();
    let parent1 = parent
    if (parent) {
        parent1 = parent.map(item => ({ ...item, path: item.path.replace(':id', params.id) }))
    }
    if (type === "private") {
        // if (loggedIn) {
            return (
                // <AppLayout title={title} parent={parent1}> {children} </AppLayout >
                <AppLayout title={title} parent={parent1} > {children} </AppLayout >
            )
        // } else {
        //     return <Navigate to="/" replace />
        // }
    }
    if (type === "public") {
        return children;
    }
    if (type === "auth") {
        if (!loggedIn) {
            return children;
        } else {
            return <Navigate to="/dashboard" replace />;
        }

    }
    return children
}

export default ProtectedRoute;