import fs from 'fs'

const generateIndex = (path, format = 'utf-8') => {
  return (
    readFileLineByLine(path, format)
      .filter(filterHeader)
      .map(toHeading)
      .map((heading) => {
        return heading.toString()
      })
      .join('\n') + '\n'
  )
}

class Heading {
  constructor(level, text) {
    this.level = level
    this.text = text
  }

  toString() {
    const blanks = '  '.repeat(this.level - 1)
    const display = this.text.trim()
    const link = this.text.trim().replace('//s/g', '-').toLowerCase()
    return `${blanks} - [${display}](#${link})`
  }
}

const readFileLineByLine = (path, format = 'utf-8') => {
  // assert if not '.md' file format
  return fs.readFileSync(path, format).split(/\r?\n/)
}

const filterHeader = (line) => {
  return /^#\s|^##\s|^###\s|^####\s|^#####\s|^######\s/i.test(line.trim())
}

const toHeading = (header) => {
  const [n, ...words] = header.trim().split(' ')
  const text = words.join(' ')
  const level = n.length
  return new Heading(level, text)
}

const content = readFileLineByLine('./test-input-md/input-001.md')
const headings = content.filter(filterHeader).map(toHeading)
const mdIndex =
  headings
    .map((heading) => {
      return heading.toString()
    })
    .join('\n') + '\n'

console.log(generateIndex('./test-input-md/input-001.md'))
