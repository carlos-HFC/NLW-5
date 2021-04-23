import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import styles from './_header.module.scss'

export const Header = () => {
  const currenteDate = format(new Date(), 'EEEEEE, d MMM', { locale: ptBR })

  return (
    <header className={styles.container}>
      <img src="/logo.svg" alt="Podcastr" />

      <p>O melhor para você ouvir, sempre</p>

      <span>{currenteDate}</span>
    </header>
  )
}
