import Cloth from "../types/Cloth";

export default function Home(props: { allClothes: Cloth[] }) {
  console.log;
  return (
    <div className="home">
      <div className="homeItem">
        {props.allClothes.map((x) => (
          <div key={x.name}>
            <div>{x.name}</div>
            {x.images.map((i) => (
              <img className="clothesImages" key={i} src={i} alt="" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
