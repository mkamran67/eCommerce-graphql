import gql from 'graphql-tag';
import { useLazyQuery, useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import USER_EMAIL_QUERY from '../lib/CheckUserQuery';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      message
      code
    }
  }
`;

export default function Reset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });

  const [
    checkUser,
    { data: userData, error: userError, loading: userLoading },
  ] = useLazyQuery(USER_EMAIL_QUERY, {
    variables: inputs,
  });

  const [resetPass, { data, error, loading }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    await checkUser();

    // Send email to GraphQL API
    if (userData?.allUsers?.length === 1) {
      await resetPass().catch(console.error);
      resetForm();
    }
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Reset your Password</h2>
      <DisplayError error={error} />
      <fieldset>
        {data?.sendUserPasswordResetLink === null && (
          <p>
            Success! <br /> Check your email for a link!
          </p>
        )}
        {userData?.allUsers?.length === 0 && (
          <p>
            Failed 😞 <br /> We did not find a user with this email.
          </p>
        )}
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Request Reset</button>
      </fieldset>
    </Form>
  );
}
