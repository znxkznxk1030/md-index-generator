import { assert } from 'console'
import fs from 'fs'

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

// content.forEach((line) => {
//   console.log(`Line from file: ${line}`)
// })

// headings.forEach((heading) => {
//   // console.log(`Header from content: ${heading.level}, ${heading.text}`)
//   console.log(`Heading from content: ${heading.toString()}`)
// })

console.log(mdIndex)
