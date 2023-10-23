export class ScrollSpy {
  private navLinks: NodeListOf<HTMLElement>
  private sections: NodeListOf<HTMLElement>

  constructor() {
    this.navLinks = this.getNavLinks()
    this.sections = this.getSections()

    this.hashHandler = this.hashHandler.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.init()
  }

  public throw(selector: string): never {
    throw new Error(`Element with selector ${selector} is missing`)
  }

  public getNavLinks(): NodeListOf<HTMLElement> {
    const navLinks = document.querySelectorAll<HTMLElement>('.nav-link')

    if (navLinks.length === 0) {
      this.throw('.nav-link')
    }
    return navLinks
  }

  public getSections(): NodeListOf<HTMLElement> {
    const sections = document.querySelectorAll<HTMLElement>('.section')

    if (sections.length === 0) {
      this.throw('.section')
    }
    return sections
  }

  private handleScroll(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targetId = entry.target.getAttribute('id')
            this.navLinks.forEach((link) => {
              const navLinkId = link.getAttribute('href')?.substring(1)
              if (navLinkId === targetId) {
                link.classList.add('active')
              } else {
                link.classList.remove('active')
              }
            })
          }
        })
      },
      { threshold: 0.5 }
    )

    this.sections.forEach((section) => {
      observer.observe(section)
    })
  }

  private hashHandler(): void {
    //Hide the id in the url after a link click
    const location = window.location.hash.split('#')[1]
    window.history.pushState({}, 'Page Title', '/' + location)
  }

  private init(): void {
    window.addEventListener('hashchange', this.hashHandler, false)
    this.handleScroll()
  }
}
