import { schema } from "normalizr";

export const licence = new schema.Entity("licences");

export const owner = new schema.Entity("owners");

export const repository = new schema.Entity("repositories", {
    owner: owner,
    licence: licence
});
export const repositories = new schema.Array(repository);

export const result = new schema.Entity("results", {
    items: repositories
});
