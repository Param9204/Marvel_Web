export function exportElementAsPdf(elementId: string, title = "Export") {
  if (typeof window === "undefined") return

  const el = document.getElementById(elementId)
  if (!el) {
    console.warn("exportElementAsPdf: element not found", elementId)
    return
  }

  // Open a print window with the element's HTML. This avoids adding heavy deps.
  const html = `
    <html>
      <head>
        <title>${title}</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <style>body{font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; margin:0; padding:20px;}</style>
      </head>
      <body>
        ${el.outerHTML}
      </body>
    </html>
  `

  const w = window.open("", "_blank")
  if (!w) return
  w.document.open()
  w.document.write(html)
  w.document.close()
  // give the browser a small moment to layout
  setTimeout(() => {
    w.print()
  }, 500)
}
