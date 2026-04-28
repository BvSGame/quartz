import { pathToRoot } from '../util/path'
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from './types'
import { i18n } from '../i18n'

const PageTitle: QuartzComponent = ( { fileData, cfg } : QuartzComponentProps ) => {
  const title = cfg?.pageTitle ?? i18n( cfg.locale ).propertyDefaults.title
  const baseDir = pathToRoot( fileData.slug! )
  return (
    <a href={ baseDir }>
      <img src="https://media.bvsga.me/brand/logos/bvs_wiki_logo_600.png" alt="Logo of Bombs vs. Sleepwalkers Wiki" title="Go to home page of Bombs vs. Sleepwalkers Wiki" />
    </a>
  )
}

PageTitle.css = `
.page-title {
  font-size: 1.75rem;
  margin: 0;
  font-family: var(--titleFont);
}
`

export default ( () => PageTitle ) satisfies QuartzComponentConstructor
