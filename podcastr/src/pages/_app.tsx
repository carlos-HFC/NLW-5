import { Header } from '../components/Header'
import { Player } from '../components/Player'

import style from '../styles/_app.module.scss'
import '../styles/_global.scss'

function MyApp({ Component, pageProps }) {
  return (
    <div className={style.wrapper}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
      <Player />
    </div>
  )
}

export default MyApp
