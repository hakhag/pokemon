import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";

interface Pokemon {
  name: string;
}

interface Props {
  pokemon: Pokemon;
}
const PokemonCreaturePage = ({ pokemon }: Props) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Henter Pokemon...</div>;
  }

  return <h1>{pokemon.name}</h1>;
};

/**
 * Fortell Next.js hvilke paths som skal bli pre-rendet ved buildtime.
 * Veldig fint hvis du har mange pages og bare vil pre-rendre et visst antall.
 */
export async function getStaticPaths() {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=50&offset=0"
  );
  const json = await res.json();

  const paths = json.results.map((pokemon: Pokemon) => ({
    params: { name: pokemon.name },
  }));

  return { paths, fallback: true };
}

/**
 * Denne funksjonen kalles ved buildtime og brukes for å sende
 * props til pagen, som da blir pre-rendret med denne dataen.
 */
export async function getStaticProps(context: GetStaticPropsContext) {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon/" + context.params?.name
  );
  const pokemon = await res.json();

  return {
    props: {
      pokemon,
    },
  };
}

export default PokemonCreaturePage;
