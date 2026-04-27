import { mkdir, writeFile } from 'node:fs/promises'

const repo = process.env.OSRACER_SOURCE_REPO || 'osrbot/osracer'
const branch = process.env.OSRACER_SOURCE_BRANCH || 'dev'
const limit = Number(process.env.CHANGELOG_LIMIT || 30)
const apiUrl = `https://api.github.com/repos/${repo}/commits?sha=${branch}&per_page=${limit}`

const headers = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28'
}

if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
}

function firstLine(message) {
  return message.split('\n').find(Boolean)?.trim() || 'Update project'
}

function shortSha(sha) {
  return sha.slice(0, 7)
}

function formatDate(value) {
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date(value))
}

function renderEnglish(commits) {
  const rows = commits
    .map((commit) => {
      const date = formatDate(commit.commit.author.date)
      const title = firstLine(commit.commit.message)
      const sha = shortSha(commit.sha)
      return `| ${date} | [${sha}](${commit.html_url}) | ${title} |`
    })
    .join('\n')

  return `# Changelog\n\nThis page is generated from recent commit messages in \`${repo}\` on the \`${branch}\` branch.\n\n| Date | Commit | Message |\n| --- | --- | --- |\n${rows}\n`
}

function renderChinese(commits) {
  const rows = commits
    .map((commit) => {
      const date = formatDate(commit.commit.author.date)
      const title = firstLine(commit.commit.message)
      const sha = shortSha(commit.sha)
      return `| ${date} | [${sha}](${commit.html_url}) | ${title} |`
    })
    .join('\n')

  return `# 更新日志\n\n本页面根据 \`${repo}\` 仓库 \`${branch}\` 分支的近期 commit message 自动生成。\n\n| 日期 | Commit | Message |\n| --- | --- | --- |\n${rows}\n`
}

async function main() {
  const response = await fetch(apiUrl, { headers })
  if (!response.ok) {
    throw new Error(`Failed to fetch commits: ${response.status} ${response.statusText}`)
  }

  const commits = await response.json()
  await mkdir('docs/changelog', { recursive: true })
  await mkdir('docs/zh/changelog', { recursive: true })
  await writeFile('docs/changelog/index.md', renderEnglish(commits), 'utf8')
  await writeFile('docs/zh/changelog/index.md', renderChinese(commits), 'utf8')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
