import {
  Maybe,
  Pokemon_V2_Ability,
  Pokemon_V2_Move,
  Pokemon_V2_Pokemon,
  Pokemon_V2_Pokemonstat,
} from '../generated/graphql.types';

export type PokemonBase = Pick<
  Pokemon_V2_Pokemon,
  'id' | 'name' | 'height' | 'weight' | 'pokemon_v2_pokemontypes'
>;

export type PokemonStats = Pick<Pokemon_V2_Pokemonstat, 'stat_id' | 'base_stat'>[];

export type PokemonAbilities = {
  pokemon_v2_ability: Pick<Pokemon_V2_Ability, 'name' | 'pokemon_v2_abilityeffecttexts'>;
}[];

export type PokemonMoves = {
  pokemon_v2_move: Pick<
    Pokemon_V2_Move,
    'name' | 'type_id' | 'power' | 'accuracy' | 'pp' | 'pokemon_v2_movedamageclass'
  >;
}[];

export type MyPokemon = {
  id: number;
  name: string;
  types: string[];
};

export type PokemonEvolution = {
  evolvesFromSpeciesId: number | null;
  id: number;
  name: string;
  generationId: number;
  generation: string;
  types: string[];
  trigger?: string;
  minLevel?: Maybe<number>;
  item?: string;
}[];
