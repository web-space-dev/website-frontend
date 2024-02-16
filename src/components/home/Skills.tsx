import { SkillCategories } from "../../interfaces/home";

interface ISkills {
  title: string;
  categories: SkillCategories;
}

export default function Skills({ title, categories }: ISkills) {
  return (
    <div className="container mx-auto px-5">
      <h2>{title}</h2>
      {categories.nodes.map((category, index) => {
        return (
          <div key={index}>
            <h3>{category.name}</h3>
            <ul>
              {category.skills.nodes.map((skill, index) => (
                <li key={index}>
                  {skill.title}

                  <img
                    src={skill.featuredImage.node.sourceUrl}
                    alt={skill.title + "Logo"}
                  />
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
