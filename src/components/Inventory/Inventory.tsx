import './inventory.scss';

interface Props {
  invRef: React.MutableRefObject<HTMLDivElement | null>;
}
export default function Inventory({ invRef }: Props) {
  return (
    <div
      id='inventory-container'
      ref={invRef}>
      inventory
    </div>
  );
}
