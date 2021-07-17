// import {
//   makeStyles,
//   IconButton,
//   TextField,
//   TextFieldClassKey,
// } from "@material-ui/core";
// import { useState } from "react";
// import SearchIcon from "@material-ui/icons/Search";
// import React from "react";
// import customStyles from './search.module.css';

// const styles = makeStyles((theme) => ({
//   iconButton: {
//     padding: 10,
//   },
//   root: {
//     display: "flex",
//     backgroundColor: theme.palette.background.paper,
//     margin: "auto",
//     "-webkit-box-align": "center",
//     alignItems: "center",
//     "-webkit-box-pack": "center",
//     justifyContent: "center",
//   },
// }));

// export default function SearchBar(props: {
//   search: (event: React.FormEvent<HTMLFormElement>) => void,
//   value: string,
//   change: (string) => void,
//   isEpisode?: boolean
// }) {
//   // console.log('search: ', props.value)
//   const classes = styles();

//   // const [value, setValue] = useState(props.value);

//   function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
//     // setValue(event.target.value);
//     props.change(event.target.value)
//   }

//   return (
//     <div className={props.isEpisode ? customStyles.episodeMain : null} >
//       <form
//         className={classes.root}
//         noValidate
//         autoComplete="off"
//         onSubmit={props.search}
//       >
//         <TextField
//           label="Search"
//           id="outlined-size-normal"
//           variant="outlined"
//           style={{ width: "20rem" }}
//           value={props.value}
//           onChange={handleChange}
//         />
//         <IconButton
//           type="submit"
//           className={classes.iconButton}
//           aria-label="search"
//         >
//           <SearchIcon fontSize={ props.isEpisode ? "inherit" : "large" } />
//         </IconButton>
//       </form>
//     </div>
//   );
// }

import {
  IconButton,
  Paper,
  InputBase,
} from "@material-ui/core";
import { Search, ArrowBackIosRounded } from "@material-ui/icons";
import React from "react";
import customStyles from './search.module.css';

export default function SearchBar(props: {
  search: (event: React.FormEvent<HTMLDivElement>) => void,
  value: string,
  change: (string) => void,
  placeholder: string,
  isEpisode?: boolean,
  isWidget?: boolean,
}) {

  return (
    <div className={customStyles.body} style={props.isEpisode ? {backgroundColor: 'lightblue'} : props.isWidget ? {backgroundColor: 'white'} : null} >
      {/* <IconButton onClick={() => window.history.back() } className={customStyles.iconBack} style={{backgroundColor: 'white', borderRadius: '2px', padding: '2px'}} aria-label="menu">
        <ArrowBackIosRounded />Back
      </IconButton> */}
      <Paper component="form" className={customStyles.main} onSubmit={props.search} style={props.isEpisode ? {width: '100%'} : null} >
        <InputBase
          className={customStyles.searchArea}
          placeholder={props.placeholder}
          onChange={(event) => props.change(event.target.value)}
          value={props.value}
        />
        {/* <IconButton type="submit" aria-label="search">
          <Search />
        </IconButton> */}
        <div className={customStyles.icon} >
          <Search />
        </div>
      </Paper>
    </div>
  );
}
