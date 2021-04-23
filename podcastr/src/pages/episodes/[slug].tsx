import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { usePlayer } from '../../context/PlayerContext'
import { api } from '../../services/api'
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString'

import styles from './_episode.module.scss'

type IEpisodeProps = {
  episode: Episode
}

export default function Episode({ episode }: IEpisodeProps) {
  const { play } = usePlayer()

  return (
    <div className={styles.episode}>
      <Head>
        <title>{episode.title} | Podcastr</title>
      </Head>
      <div className={styles.thumbnailContainer}>
        <Link href="/">
          <button type="button">
            <img src="/arrow-left.svg" alt="Voltar" />
          </button>
        </Link>
        <Image width={700} height={160} src={episode.thumbnail} objectFit="cover" />
        <button type="button" onClick={() => play(episode)}>
          <img src="/play.svg" alt="Tocar episódio" />
        </button>
      </div>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </header>

      <div className={styles.description} dangerouslySetInnerHTML={{ __html: episode.description }} />
    </div>
  )
}


/**
 * SE OS paths ESTIVER VAZIO, NO MOMENTO DA BUILD, O NEXTJS NÃO GERARÁ PÁGINAS DE FORMA ESTÁTICA
 * SE O fallback ESTIVER false, E OS paths ESTIVER VAZIO, AO TENTAR ACESSAR A PÁGINA, GERARÁ UM ERRO 404
 * SE O fallback ESTIVER true, E OS paths ESTIVER VAZIO, AO TENTAR ACESSAR A PÁGINA, ELE FARÁ UMA REQUISIÇÃO PELO BROWSER PARA PROCURAR OS DADOS. CONTUDO, EM ALGUM MOMENTO POR CONTA DO TEMPO QUE PODE DEMORAR A REQUISIÇÃO, OS DADOS QUE DEVERÃO VIR, ESTARÃO VAZIOS, E ASSIM, ELE NÃO CONSEGUIRÁ PRÉ-RENDERIZAR A PÁGINA DE FORMA ESTÁTICA JÁ QUE ALGUM DADO ESTARIA VAZIO. SENDO ASSIM, ELE SÓ CARREGARÁ AS PÁGINAS SE O USUÁRIO ACESSÁ-LAS.
 * SE O fallback ESTIVER blocking, ELE BUSCARÁ OS DADOS PELO NEXTJS. SENDO ASSIM, O USUÁRIO SÓ SERÁ NAVEGADO PARA TELA DESEJADA QUANDO OS DADOS ESTIVEREM CARREGADOS.
 */

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('/episodes', {
    params: {
      _limit: 2,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const paths = data.map(ep => {
    return {
      params: {
        slug: ep.id
      }
    }
  })

  return {
    paths,
    fallback: "blocking"
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await api.get(`/episodes/${ctx.params.slug}`)

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR }),
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(data.file.duration),
    description: data.description,
    url: data.file.url,
  }

  return {
    props: {
      episode
    },
    revalidate: 60 * 60 * 24 //24h
  }
}