import { Approach } from "../../interfaces";

interface IApproach {
  items: Approach[];
}

export default function Approach({ items }: IApproach) {
  return (
    <>
      <h2>Our approach</h2>
      {items.map((item, index) => {
        return (
          <div key={index}>
            <h3>{item.title}</h3>
            <p>{item.paragraph}</p>
          </div>
        );
      })}
    </>
  );
}
