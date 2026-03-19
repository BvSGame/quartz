import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer( {
    links: {
      "Official Website": "https://bvsga.me",
      GitHub: "https://github.com/BvSGame",
      YouTube: "https://www.youtube.com/@Bv.S",
    },
  } ),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    // Component.ConditionalRender( {
    //   component: Component.Breadcrumbs(),
    //   condition: ( page ) => page.fileData.slug !== "index",
    // } ),
    Component.ArticleTitle(),
    Component.TagList(),
    Component.ContentMeta(),
  ],
  left: [
    Component.PageTitle(),
    Component.Flex( {
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    } ),
    Component.Explorer( {
      folderDefaultState: "open",
      filterFn: ( node ) => {
        return node.slug?.startsWith( "tags/" )
      },
      mapFn: ( node ) => {
        if ( node.displayName.startsWith( "Tag: " ) ) {
          node.displayName = node.displayName.replace( "Tag: ", "" )
        }
      },
    } ),
  ],
  right: [
    Component.Graph(),
    Component.TableOfContents(),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
  ],
  left: [
    Component.PageTitle(),
    Component.Flex( {
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    } ),
    Component.Explorer( {
      folderDefaultState: "open",
      filterFn: ( node ) => {
        return node.slug?.startsWith( "tags/" )
      },
      mapFn: ( node ) => {
        if ( node.displayName.startsWith( "Tag: " ) ) {
          node.displayName = node.displayName.replace( "Tag: ", "" )
        }
      },
    } ),
  ],
  right: [],
}
