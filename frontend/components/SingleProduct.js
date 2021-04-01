import { useQuery } from '@apollo/client';
import Head from 'next/head';
import styled from 'styled-components';
import SINGLE_ITEM_QUERY from '../lib/SingleItemQuery';
import DisplayError from './ErrorMessage';

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 2rem;

  img {
    width: 100%;
    object-fit: contain;
  }
`;

export default function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;

  const {
    Product: {
      name,
      description,
      price,
      photo: {
        altText,
        image: { publicUrlTransformed },
      },
    },
  } = data;
  return (
    <ProductStyles>
      <Head>
        <title>Flea Market | {name}</title>
      </Head>
      <img src={publicUrlTransformed} alt={altText} />
      <div className="details">
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
    </ProductStyles>
  );
}
