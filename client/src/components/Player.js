import React from "react";

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss' Use SASS

const Player = (props) => {
  const { audioUrl } = props;

  return (
    <div className = "player">
      <AudioPlayer
        autoPlay
        src= {audioUrl}
        onPlay={e => console.log("onPlay")}
        // other props here
        loop = {true}
        showJumpControls = {false}
      />         
    </div>
 
  )
}
{/* <source src="https://doc-0g-8k-docs.googleusercontent.com/docs/securesc/h067fpeefbbec10ei31jgmqsg99kt4qs/fsilaq1r3g3u9qej8048v33uruugaakq/1691610525000/09561915791498543083/09561915791498543083/1mMI-OfknBEDfebn0q-SrMWNKQ9o6cxUN?e=download&amp;ax=AH3YgiDehnqYKC9K-N5KAOQYFeICqRSJVcxzKGs-LZ5JwjAmv8Zk0TS_ycY9qj5tik65uUcr3ANOCQy1E2qz1C1YQJjxRr15Fz8pKKN04YG6aADuCITGAxUR0NCn0d2Dyur-LKKir5BoRnnDJe9tbwxjvb7LdA30z7BW8MtYVbiUL7iTkBd7tGc5CzP0pai0gSm_KEzKpwiP1C83wu06PmzEWkTG3F2PtiB8ZJX7rMHf9h-JD2pVYDcGvOEHcidvG2ObFay9ie6PWb5m30i7UyxnWvs8uMOODSHJdsl4MRdGGBZR5lGcMMiLDVJskJr2VWBtDeQJAGbyrGy6Y5lxdOdwd8u7duJAohz8YUCYO9nipMJY8ecJIaU1KCY9d04nEdpidOI0-0mSPoIBy1HpLjFPt7HZd7IwHgqKl22RsOSCJsLC_M7UeYfl-UY_W0m4otNG1xU6q2b4lJOOlqfvW5CTeAinYujeClT6nqWeuazjaisIGmShV_7OK8QSJWnixysOnmNtg51QHXjbCum_jPZalj6fGlzD6z0VGqt9ae4ktVzWaQX7zu_UNWSDIMzkxjSgflOU4H0o3OYX7RUNv9KqSp5noTMJSX2-4g1j7SBOZ-RzO8pOD82k3dP07dgJNLkQ0Y7VuS8-1yNc10DBd7-LL_yQRf8rZ2taDAttzx23F6100F9ZxxybNB0i0ak38uBMx-6AvFW61n3VC8KgkfYx6oF2IpB-oaK3rxcEdLqS4xRAGZVbSxuH-a6RjXHAtSeHzS9c0vabQioLk4jf2-nAuvypr2tvV-FuGT0ypmHp5qqDzNHRZi_czr0rqZEFrEHxFq9STRfgKgFyDJwkcrmcnvzP6Gtfx9k1yjQPKOWwQviElQ9T0TY7LZLyY5GXG1aLytbYEOpOdvu2IrZGMMNlsV05b-Xh2uzULFQI&amp;uuid=6420c393-2d92-46bd-9cda-5da2902516d8&amp;authuser=0" type="audio/mpeg"></source> */}


export default Player;