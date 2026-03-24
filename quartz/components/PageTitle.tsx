import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ( { fileData, cfg } : QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n( cfg.locale ).propertyDefaults.title
  const baseDir = pathToRoot( fileData.slug! )
  return (
    <a href={ baseDir }>
      <img src="https://archive.org/download/bvsgame/brand/logos/bvs_logo_full_2023.png" alt={`"${ title }"`} />
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
