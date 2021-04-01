import { useMutation } from '@apollo/client';
import DELETE_PRODUCT_MUTATION from '../lib/DeleteItemMutation';

export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
  });
  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm(`Are you sure you want to delete this item?`)) {
          // Go ahead and delete
          deleteProduct().catch((err) => alert(err.message));
        }
      }}
    >
      {children}
    </button>
  );
}
