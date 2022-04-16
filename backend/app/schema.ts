import { makeSchema } from 'nexus'
import { join } from 'path'
import * as types from "./graphql";

export const schema = makeSchema({
  types, 
  outputs: {
    schema: join(process.cwd(), "./app/generated/schema.graphql"), 
    typegen: join(process.cwd(), "./app/generated/nexus-typegen.ts"), 
  },
})