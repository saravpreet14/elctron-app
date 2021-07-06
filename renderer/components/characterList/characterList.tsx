import Link from "../Link";
import { makeStyles } from "@material-ui/core/styles";
import { GridList, GridListTile, GridListTileBar } from "@material-ui/core";
import customStyles from './characterList.module.css';

const styles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    overflow: "hidden",
    marginTop: "6vh",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "90vw",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  gridTile: {
    margin: "1.5rem",
    height: "300px",
    borderRadius: "4%",
    overflow: "hidden",
  },
  noData: {
    textSlign: "center",
    fontSize: "2rem",
  }
}));

export default function TitlebarGridList(props : {
    characters: {
        id: string;
        name: string;
        image: string;
    }[]
}) {
  const classes = styles();

  return (
    <div className={classes.root}>
      {props.characters.length === 0 ? (
        <h2 className={classes.noData}>Nothing to show</h2>
      ) : (
        <GridList className={classes.gridList}>
          {props.characters.map((character) => (
            <Link
              key={character.id}
              href={
                "/character/" +
                character.name.replace(" ", "") +
                "-" +
                character.id
              }
              style={{width: 'auto', height: 'auto'}}
            >
              <GridListTile className={customStyles.gridTile} key={character.id}>
                <img
                  width="300"
                  height="300"
                  src={`https://rickandmortyapi.com/api/character/avatar/${character.id}.jpeg`}
                  alt={character.name}
                />
                <GridListTileBar title={character.name} />
              </GridListTile>
            </Link>
          ))}
        </GridList>
      )}
    </div>
  );
}
