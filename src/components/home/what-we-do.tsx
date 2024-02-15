import { WhatWeDo } from "../../interfaces/home";

interface IWhatWeDo {
  items: WhatWeDo[];
}

export default function WhatWeDo({ items }: IWhatWeDo) {
  return (
    <div className="container mx-auto px-5">
      <h2>What We Do</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.title} - {item.pills.map((pill) => pill.pillText + ", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}
