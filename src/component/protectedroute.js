import PropTypes from 'prop-types'
import { Route,  Navigate } from 'react-router-dom'


export default function ProtectedRoute({user, children,...rest}){
    return (
        <Route {...rest} render={({location})=>{
            if(user)
            return children
            if(!user){
                return (
                    <Navigate to={{
                        pathname:'/',
                        state:{from: location}
                    }}
                    />
                );
            }
            return null;
        }}
        />
    )
}


ProtectedRoute.propTypes={
    user: PropTypes.object,
    children: PropTypes.object.isRequired
}