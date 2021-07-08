import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { useQuery, gql } from "@apollo/client";
import React, { useState, useRef, useEffect } from "react";
import SearchBar from "../searchBar/searchBar";
import CharacterList from "../characterList/characterList";
import { Button } from "@material-ui/core";
import Spinner from '../spinner/spinner';
import Error from '../error/error';

interface characterData {
    id: string;
    name: string;
    image: string;
}

var isSearch:boolean = false;
var static_filter:string = "";

export default function Home(props:{imageSize:{width: number, height: number}, buttonSize:'small'|'medium'|'large'}) {
  const Characters_data = gql`
    query CharactersQuery($page: Int, $filter: FilterCharacter) {
      characters(page: $page, filter: $filter) {
        info {
          prev
          next
        }
        results {
          id
          name
          image
        }
      }
    }
  `;

  const [my_filter, set_filter] = useState(static_filter);

  const { loading, error, data, fetchMore } = useQuery(Characters_data, {
    variables: { page: 1, filter: {} },
    errorPolicy: "ignore",
  });
  if (loading) return <Spinner />;
  if (error) return <Error reload={() => search(my_filter)} />;

  function loadMore(isSearch:boolean, my_filter:string) {
    const nextPage = data.characters.info.next;
    var variables = { page: nextPage, filter: {} };
    if (isSearch) {
      variables = { page: nextPage, filter: { name: my_filter } };
    }

    fetchMore({
      variables: variables,

      updateQuery: (prevResult:{characters: {results: characterData[]}}, { fetchMoreResult }) => {
        fetchMoreResult.characters.results = [
          ...prevResult.characters.results,
          ...fetchMoreResult.characters.results,
        ];
        return fetchMoreResult;
      },
    }).catch(error => null);
  }

  function handleSearchChange(value: string) {
    set_filter(value);
  }

  function search(query: string): void {
    isSearch = query !== '';
    static_filter = query;
    set_filter(query);

    fetchMore({
      variables: { page: null, filter: { name: query } },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        return fetchMoreResult;
      },
    }).catch(error => null)
  }

  const results: characterData[] = data.characters ? data.characters.results : [];
  const info: {
    prev: number | string;
    next: number | string;
  } = data.characters ? data.characters.info : { prev: null, next: null };

  return (
    <div style={{height: '94vh', overflow: 'scroll'}}>
      <Head>
        <title>Rick and Morty</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <br />
      <br />
      <br />
      <SearchBar search={(event: React.FormEvent<HTMLFormElement>) => {event.preventDefault(); search(event.target[0].value)}} value={my_filter} change={(value:string) => handleSearchChange(value)} />
      <div className={styles.loadMore}>
        {isSearch ? (
          <Button
            variant="contained"
            color="primary"
            size={props.buttonSize}
            onClick={() => {search(""); isSearch=false;}}
          >
            Back to all characters
          </Button>
        ) : null}
      </div>
      <CharacterList characters={results} imageSize={props.imageSize} />
      <div className={styles.loadMore}>
        {info.next ? (
          <Button
            variant="contained"
            color="primary"
            size={props.buttonSize}
            onClick={() => loadMore(isSearch, my_filter)}
          >
            Load More
          </Button>
        ) : null}
      </div>
    </div>
  );
}