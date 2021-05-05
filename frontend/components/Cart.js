import CartStyles from './styles/CartStyles';
import { useUser } from './User';

export default function Cart() {
  const me = useUser();

  if (!me) return null;

  return <CartStyles open>{me.email}</CartStyles>;
}
