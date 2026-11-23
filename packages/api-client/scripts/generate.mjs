import { access, readFile, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import openapiTS, { astToString } from 'openapi-typescript'

// 合同归根仓库所有；从脚本位置推导，避免 shell 工作目录影响生成来源。
const override = process.env.SITE_CONTRACTS_DIR
if (override && !path.isAbsolute(override)) {
  throw new Error('SITE_CONTRACTS_DIR 必须是根仓库 contracts 目录的绝对路径。')
}
const schema = override
  ? pathToFileURL(path.join(override, 'openapi.yaml'))
  : new URL('../../../../contracts/openapi.yaml', import.meta.url)
const target = new URL('../src/generated/schema.ts', import.meta.url)
try {
  await access(schema)
} catch {
  throw new Error(
    '找不到根仓库 contracts/openapi.yaml；请使用完整根工作区，或设置绝对路径 SITE_CONTRACTS_DIR。',
  )
}

// 检查模式只比较内容，避免 CI 悄悄改写生成结果。
const generated =
  '// 此文件由 OpenAPI 合同生成，请修改合同后重新生成，不要手工编辑。\n' +
  astToString(await openapiTS(schema))
if (process.argv.includes('--check')) {
  if ((await readFile(target, 'utf8')) !== generated) {
    throw new Error('API 类型与 OpenAPI 合同不一致，请执行 generate。')
  }
  process.stdout.write('OpenAPI 生成类型一致。\n')
} else {
  await mkdir(new URL('../src/generated/', import.meta.url), { recursive: true })
  await writeFile(target, generated)
  process.stdout.write('OpenAPI 类型已生成。\n')
}
