import { readFile, mkdir, writeFile } from 'node:fs/promises'
import openapiTS, { astToString } from 'openapi-typescript'

const schema = new URL('../../../contracts/openapi.yaml', import.meta.url)
const target = new URL('../src/generated/schema.ts', import.meta.url)

// 生成源固定为仓库合同；检查模式只比较内容，避免 CI 悄悄改写生成结果。
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
