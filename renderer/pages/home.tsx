import Home from "../components/home/home";
import Navbar from "../components/navbar/navbar";
import { useState } from 'react';
import Episodes from '../components/episodes/episodes';
import Widgets from '../components/widgets/widgets';
import styles from '../styles/Home.module.css';

let staticEpisodeData = null;

export default function SignInPage() {

  const [episodeData, setEpisode] = useState(staticEpisodeData);

  return (
    <>
      <Navbar>
      <div 
          // style={{display: 'grid', gridTemplateColumns: '2fr 8fr', marginLeft: '1vw', marginRight: '3vw'}} 
          className={styles.partition}
        >
          <Episodes select={(data) => {staticEpisodeData=data; setEpisode(data);}} selected={episodeData ? episodeData.id : null} />
          {episodeData ? 
            <Widgets data={episodeData} back={() => {staticEpisodeData=null; setEpisode(null);}} /> : 
            <Home imageSize={{width: 300, height: 300}} buttonSize="large" isWidget={false} />}
        </div>
      </Navbar>
    </>
  );
}