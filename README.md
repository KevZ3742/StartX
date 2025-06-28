# StartX

[**Live web version here**](https://kevz3742.github.io/StartX/)

StartX is a personal knowledge base and startpage hybrid — a mix of a startpage and a memex.

It helps you organize bookmarks, notes, quotes, images, and projects with an easy, read-only, server-less interface, designed for quick overview and seamless sharing.

This project is a fork of kormyen's memex: https://github.com/kormyen/memex

---

![StartX Preview](https://raw.githubusercontent.com/kormyen/memex/master/PREVIEW.jpg)

---

## Features

- Filtering and tag-based organization  
- Notes, quotes, and terms support  
- Images and file attachments  
- Links
- Metadata  
- Project grouping  
- Customizable themes (drag & drop a [theme SVG file](https://github.com/hundredrabbits/Themes/tree/master/themes) onto the page to change the look, more info [here](https://github.com/hundredrabbits/Themes))  
- Read-only, server-less, lightweight  
- Zen Mode for distraction-free browsing  

---

## What’s new in StartX?

StartX builds on top of Memex by combining a powerful personal knowledge base with a startpage experience, making it your go-to launchpad and archive in one.

- Enhanced startpage feel with quick access to your saved knowledge  
- UI tweaks for a smoother, more modern browsing experience  
- Zen Mode toggle enabled by default for distraction-free use
- Addaptable Favicon that is responsive towards system theme 
- Additional settings exposed for user customization  

---

## Getting Started / Dev

```bash
git clone https://github.com/kevz3742/StartX.git
```
Then open StartX/index.html in any web browser

### Data

[memex/content/data.ndtl](content/data.ndtl)

Stored in a human-readable, flat-file database called [Indental](https://wiki.xxiivv.com/#indental) which is made by Devine Lu Linvega

### Settings

[memex/content/settings.js](content/settings.js)

| Setting  | Description |
|            ---: | :---                                                                                                |
|    STATSNUMTAGS | max limit of tags to show in menu (set to `Infinity` for scroll area)                               |
|    STATSNUMTYPE | max limit of types to show in menu (set to `Infinity` for scroll area)                              |
|     LOADANIMNUM | threshold number of articles in query/displayed to trigger loading animation to display             |
|     WIDEARTICLE | allow wide entries (`WIDE : true`)                                                                  |
| AUTOWIDETRIGGER | automatically wide entry if it has more QOTE entries than this number                               |
|      USEMASONRY | enable [masonry](https://masonry.desandro.com/) layout library usage                                |
| MASONRYPROGRESS | masonry re-layout as images load (true), or only once all images complete (false)                   |
|   ARTICLEIDBASE | CSS name prefix                                                                                     |
|       SHOWUPPER | toggle display of upper entry element(s)                                                            |
|       SHOWTITLE | toggle display of entry title                                                                       |
|        SHOWAUTH | toggle display of entry author(s)                                                                   |
|        SHOWTYPE | toggle display of entry type(s)                                                                     |
|        SHOWLINK | toggle display of entry link(s)                                                                     |
|       SHOWLOWER | toggle display of lower entry element(s)                                                            |
|        SHOWTAGS | toggle display of entry tag(s)                                                                      |
|        SHOWPROJ | toggle display of entry project(s)                                                                  |
|        SHOWNOTE | toggle display of entry notes                                                                       |
|        SHOWQOTE | toggle display of entry quote(s)                                                                    |
|        SHOWTERM | toggle display of entry term(s)                                                                     |
|        SHOWDONE | toggle display of menu done (tick/cross)                                                            |
|        SHOWPROG | toggle display of entry progress notes                                                              |
|        SHOWIMAG | toggle display of entry image                                                                       |
|        SHOWFILE | toggle display of entry file(s)                                                                     |
|     SHOWOVERLAY | toggle display of a dark overlay on image entries when hovered, improving text readability          |
|  ZENMODEENABLED | enable or disable Zen Mode, which hides interface elements for a distraction-free view              |
|   ZENMODEHOTKEY | keyboard shortcut to toggle Zen Mode on or off                                                      |

### Dependencies

- Database parser: [Indental](https://wiki.xxiivv.com/#indental)
- Theming: [Themes](https://github.com/hundredrabbits/Themes)
- Grid layout: [Masonry](https://masonry.desandro.com/)
- Icons: [Font Awesome](https://fontawesome.com/)

### Thanks

- Hamish MacDonald ([Memex](https://github.com/kormyen/memex))
- Devine Lu Linvega ([Oscean](https://github.com/XXIIVV/Oscean))
- Rekka Bell ([kokorobot](https://github.com/rekkabell/kokorobot))
- Hundred Rabbits ([Ecosystem](https://github.com/hundredrabbits))
- Josh Avanier ([Log](https://github.com/joshavanier/log))
- Alexey Botkov ([Legacy](https://github.com/nomand/Legacy))
- Seena Burns ([Isolate](https://github.com/seenaburns/isolate))
