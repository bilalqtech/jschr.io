import * as Behance from 'behance-api'
import { promisify } from 'bluebird'

const behance = new Behance('...')

export async function getUserProject(username: string) {
  const getProjects = promisify<any, {}>(behance.userProjects, { context: behance })

  const x = await getProjects(username)

  console.log(x)

  return x
}