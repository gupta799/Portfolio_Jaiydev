function SiteFooter(): JSX.Element {
  return (
    <footer className="border-t border-white/8 bg-[#050508]" id="contact">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="space-y-2">
          <p className="text-base font-semibold text-white">Let's build something remarkable.</p>
          <p className="text-sm text-white/45">
            Reach out at{' '}
            <a
              className="text-white/70 transition-colors hover:text-white"
              href="mailto:jaiydev799@hotmail.com"
            >
              jaiydev799@hotmail.com
            </a>
          </p>
        </div>
        <div className="flex gap-6 text-sm text-white/35">
          <a
            className="transition-colors hover:text-white"
            href="https://linkedin.com/in/jaiydev-gupta-408269160/"
            rel="noreferrer"
            target="_blank"
          >
            LinkedIn
          </a>
          <a
            className="transition-colors hover:text-white"
            href="https://github.com/gupta799"
            rel="noreferrer"
            target="_blank"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
