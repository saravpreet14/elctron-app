import Link from "../Link";
import styles from "./characterList.module.css";

export default function TitlebarGridList(props: {
  characters: {
    id: string;
    name: string;
    image?: string;
  }[];
  imageSize?: {
    width: number;
    height: number;
  };
  isWidget: boolean;
}) {
    return (
        <div className={styles.main} style={props.isWidget ? {marginLeft: '20px', marginRight: '20px'} : null} >
            {/* <Link href='/characters'><a>Here</a></Link> */}
            {props.characters.map(character => (
                <Link href={`/character/${character.name.replace(' ', '')}-${character.id}`} key={character.id} passHref style={{textDecoration: 'none'}} >
                    <div className={styles.card} key={character.id} style={props.isWidget ? {maxWidth: '150px', margin: '0.8rem'} : null} >
                        <div className={styles.image} style={props.isWidget ? {width: '150px', height: '150px'} : null} >
                            <img src={`https://rickandmortyapi.com/api/character/avatar/${character.id}.jpeg`} alt={character.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                        </div>
                        <div className={styles.name} style={props.isWidget ? {fontSize: '0.8rem', padding: '5px'} : null} >{character.name}</div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
