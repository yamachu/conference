import { Fragment } from 'react'
import i18next from 'i18next'
import ReactMarkdown from 'react-markdown'
import * as fs from 'fs'

import { Button } from '@conference/shared/ui'
import NavSection from '@components/NavSection'
import FooterSection from '@components/FooterSection'
import { defaultLanguage, languages } from 'root/i18n.config'
import { urlPrefix } from '@utils/endpoints.constants'

export default function Home({ terms }) {
  return (
    <Fragment>
      <NavSection />

      <div className="min-h-screen p-0 m-0 flex flex-col justify-center items-center">
        <h2 className="m-0 leading-5 text-xl">{i18next.t('privacy_policy')}</h2>

        <div className="flex items-center justify-center flex-wrap max-w-5xl my-2">
          <ReactMarkdown skipHtml={false}>{terms}</ReactMarkdown>
        </div>

        <Button path={urlPrefix} tooltip={i18next.t('back_to_top')}>
          {i18next.t('back_to_top')}
        </Button>
      </div>

      <FooterSection />
    </Fragment>
  )
}

export async function getStaticPaths() {
  return {
    paths: languages.map((lang) => {
      return { params: { lang: lang } }
    }),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const terms = fs.readFileSync(process.cwd() + '/libs/shared/docs/privacy-policy.md', 'utf8')
  return {
    props: {
      terms: terms,
      language: languages.includes(params.lang) ? params.lang : defaultLanguage,
    },
  }
}
