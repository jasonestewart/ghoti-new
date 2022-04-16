import { extendType, objectType } from "nexus";
import ALLWORDS from "../data/data";

export const Word = objectType({
    name: "Word", 
    definition(t) {
        t.nonNull.string("text");
        t.nonNull.list.string("words");
    },
});

export const WordQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("list", { 
            type: "Word",
            resolve(parent, args, context, info) { 
                return ALLWORDS;
            },
        });
    },
});

export const NextWordQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.field("next", { 
            type: "Word",
            resolve(parent, args, context, info) {
                const rndm = Math.floor(Math.random() * ALLWORDS.length);
                return ALLWORDS[rndm];
            },
        });
    },
});