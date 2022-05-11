const fs = require("fs/promises")
const F = require("fluture")
const path = require("path")
const {
  curry,
  filter,
  fork,
  identity: I,
  j2,
  lines,
  map,
  pipe,
  readFile,
  split,
  always: K,
  chain,
} = require("snang/script")

// writeFile :: String -> String -> Future Error String
const writeFile = curry(
  (file, raw) =>
    new F.Future((bad, good) => {
      fs.writeFile(file, raw, "utf8").catch(bad).then(good)
      return () => {}
    })
)

const INPUT = "./linktree"
const OUTPUT = "./src/pages/links.js"

const writeRaw = pipe(writeFile(OUTPUT), map(K(`Updated ${OUTPUT}!`)))

module.exports = pipe(
  readFile,
  map(
    pipe(
      lines,
      filter(I),
      map(split(": ")),
      j2,
      z => `/* DO NOT EDIT THIS FILE DIRECTLY, INSTEAD LOOK AT update-links.js */
import React from 'react'
import clsx from 'clsx'
import styles from './links.module.css'

const links = ${z}

const Link = ({ href, children }) => (
  <a className={clsx(styles.link, "button", "button--outline")} href={href}>
    {children}
  </a>
)

const Links = () => (
  <div className={styles.page}>
    <header className={styles.header}>
      <img src="/img/logo.svg" className={styles.logo}/>
    </header>
    {links.map(([label, link]) => (
      <Link href={link} key={link}>
        {label}
      </Link>
    ))}
    <footer className={styles.footer}>
      <img src="/img/careers/submarine.gif" className={styles.sub} />
    </footer>
  </div>
)

export default Links
`
    )
  ),
  chain(writeRaw),
  fork(console.error, console.log)
)(INPUT)
