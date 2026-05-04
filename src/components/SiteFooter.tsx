function SiteFooter(): JSX.Element {
  return (
    <footer className="border-t border-white/5 bg-[#0a0908]" id="contact">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 transition-colors duration-200 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="space-y-3">
          <p className="text-lg font-bold text-white">Let&apos;s talk.</p>
          <p className="text-sm text-white/45">
            Reach out at{' '}
            <a className="font-semibold text-white/75 transition hover:text-[#f97316]" href="mailto:jaiydev799@hotmail.com">
              jaiydev799@hotmail.com
            </a>{' '}
            or connect on LinkedIn.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-white/45">
          <a className="transition-colors hover:text-[#f97316]" href="https://linkedin.com/in/jaiydev-gupta-408269160/" rel="noreferrer" target="_blank">
            LinkedIn
          </a>
          <a className="transition-colors hover:text-[#f97316]" href="https://github.com/gupta799" rel="noreferrer" target="_blank">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
