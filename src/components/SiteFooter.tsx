function SiteFooter(): JSX.Element {
  return (
    <footer className="border-t border-slate-200 bg-[#f5f5f7]" id="contact">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="space-y-2">
          <p className="text-base font-semibold text-slate-900">Let's build something remarkable.</p>
          <p className="text-sm text-slate-500">
            Reach out at{' '}
            <a
              className="font-medium text-slate-700 transition-colors hover:text-slate-900"
              href="mailto:jaiydev799@hotmail.com"
            >
              jaiydev799@hotmail.com
            </a>
          </p>
        </div>
        <div className="flex gap-6 text-sm text-slate-400">
          <a className="transition-colors hover:text-slate-700" href="https://linkedin.com/in/jaiydev-gupta-408269160/" rel="noreferrer" target="_blank">
            LinkedIn
          </a>
          <a className="transition-colors hover:text-slate-700" href="https://github.com/gupta799" rel="noreferrer" target="_blank">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
