import { assert } from 'console'
import fs from 'fs'

const readMarkdownFileLineByLine = (path, format = 'utf-8') => {
  // assert if not '.md' file format
  return fs.readFileSync(path, format).split(/\r?\n/)
}

const extractHeaders = (content) => {
  assert(Array.isArray(content))
  return content.filter((line) => {
    return /^#\s|^##\s|^###\s|^####\s|^#####\s|^######\s/i.test(line.trim())
  })
}

const content = readMarkdownFileLineByLine('./test-input-md/input-001.md')
const headers = extractHeaders(content)

// content.forEach((line) => {
//   console.log(`Line from file: ${line}`)
// })

headers.forEach((line) => {
  console.log(`Header from content: ${line}`)
})
