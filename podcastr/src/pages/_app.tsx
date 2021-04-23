import { Header } from '../components/Header'
import { Player } from '../components/Player'
import { PlayerProvider } from '../context/PlayerContext'

import styles from '../styles/_app.module.scss'
import '../styles/_global.scss'

function MyApp({ Component, pageProps }) {
  return (
    <PlayerProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerProvider>
  )
}

export default MyApp
