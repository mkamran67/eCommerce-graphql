import { useMutation, useQuery } from '@apollo/client';
import SINGLE_ITEM_QUERY from '../lib/SingleItemQuery';
import UPDATE_PRODUCT_MUTATION from '../lib/UpdateProductMutation';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';

export default function UpdateProduct({ id }) {
  // 1. We need to get the existing product.
  const { data, error, loading } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
  });

  // 2. We need to get the mutation to update the product
  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);

  // 2.5 Create Form State
  const { inputs, handleChange, resetForm, clearForm } = useForm(data?.Product);

  // Loading
  if (loading) return <p>Loading...</p>;
  // 3. We need a form to handle the updates

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        // TODO: Handle submit

        const res = await updateProduct({
          variables: {
            id,
            name: inputs.name,
            description: inputs.description,
            price: inputs.price,
          },
        }).catch(console.error);
        console.log(res);
      }}
    >
      <DisplayError error={error || updateError} />
      <fieldset
        disabled={loading || updateLoading}
        aria-busy={loading || updateLoading}
      >
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Description..."
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit"> Update Product</button>
      </fieldset>
    </Form>
  );
}
