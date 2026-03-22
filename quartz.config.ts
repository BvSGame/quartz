import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

import { writeFile, mkdir } from "fs/promises"
import { existsSync } from "fs"
import path from "path"

const htaccess = () => ( { name: "htaccess", async emit() {
  const outputDir = "public";
  const filePath = path.join( outputDir, ".htaccess" );

  const content = `
RewriteEngine On

RewriteCond %{THE_REQUEST} /([^.]+)\.html [NC]
RewriteRule ^ /%1 [L,R=301]

RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}\.html -f
RewriteRule ^(.*)$ $1.html [NC,L]
  `;

  if ( !existsSync( outputDir ) ) {
    await mkdir( outputDir, { recursive: true } );
  }

  await writeFile( filePath, content, "utf-8" );

  return [];
} } )

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Bombs vs. Sleepwalkers Wiki",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "google",
      tagId: 'G-P9EDWGZ47V',
    },
    locale: "en-US",
    baseUrl: "quartz.bvsga.me",
    ignorePatterns: [ "private", "templates", ".obsidian" ],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Tektur",
        body: "Sofia Sans",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f8",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#284b63",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#161618",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#7b97aa",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate( {
        priority: [ "frontmatter", "git", "filesystem" ],
      } ),
      Plugin.SyntaxHighlighting( {
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      } ),
      Plugin.ObsidianFlavoredMarkdown( {
        enableInHtmlEmbed: true,
        enableVideoEmbed: true,
        enableYouTubeEmbed: true,
        parseBlockReferences: true,
      } ),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks( { markdownLinkResolution: "relative" } ),
      Plugin.Description(),
      Plugin.Latex( { renderEngine: "katex" } ),
    ],
    filters: [ Plugin.RemoveDrafts() ],
    emitters: [
      htaccess(),
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex( {
        enableSiteMap: true,
        enableRSS: true,
      } ),
      Plugin.Assets(),
      Plugin.Static(),
      // Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      // Plugin.CustomOgImages(),
    ],
  },
}

export default config