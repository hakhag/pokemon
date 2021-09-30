import { NextPageContext } from "next";
import Link from "next/link";

interface Props {
  pokemon: {
    name: string;
  }[];
}

const PokemonPage = ({ pokemon }: Props) => {
  return (
    <div>
      <ul>
        {pokemon.map((pok) => (
          <li key={pok.name}>
            <Link href={`/pokemon/${pok.name}`}>{pok.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

/**
 * getServerSideProps() - hent data ved request time.
 * Denne kalles ved hvert eneste request, og må resolve før
 * siden rendres. Props blir returnert fra funksjonen
 */
export async function getServerSideProps(context: NextPageContext) {
  const data = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=50&offset=0"
  );
  const json = await data.json();

  return {
    props: {
      pokemon: json.results,
    },
  };
}

export default PokemonPage;
