import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const ArticleTitle: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const title = fileData.frontmatter?.title
  const contributors = fileData.frontmatter?.contributors
  const version = fileData.frontmatter?.version

  if ( title ) {
    return (
      <div className={ classNames( displayClass, "article-title-container" ) }>
        <h1 className="article-title">{title}</h1>

        { contributors && (
          <div className="frontmatter-property">
            <span className="label">Contributors: </span>
            { Array.isArray( contributors ) ? (
              <ul className="list">
                {contributors.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            ) : (
              <span className="value">{ contributors }</span>
            ) }
          </div>
        ) }

        { version && (
          <div className="frontmatter-property">
            <span className="label">Version: </span>
            <span className="value">{ version }</span>
          </div>
        ) }

      </div>
    )
  } else {
    return null
  }
}

ArticleTitle.css = `
.article-title {
  margin: 2rem 0 0 0;
}
`

export default (() => ArticleTitle) satisfies QuartzComponentConstructor
