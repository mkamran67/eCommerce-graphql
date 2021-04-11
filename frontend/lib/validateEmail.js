import USER_EMAIL_QUERY from './CheckUserQuery'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'

export default functionValidateUser(email){

    const [checkEmail, {data, loading, error}] = useQuery(USER_EMAIL_QUERY, {
        variables: {email: email}
    })

    return {
        checkEmail,
        data,
        loading,
        error
    }

};