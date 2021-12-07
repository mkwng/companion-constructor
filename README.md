## Playbooks

### Dev process

- `pscale auth login`
- `pscale connect companions initial-setup --port 3309`
- `pscale connect companions shadow --port 3310`
- `yarn prisma studio`
- `yarn dev`

### Adding a new attribute

Define it...

- Create AttributeDictionary describing the attribute and its variants
- The path assumes you are already in the "public" folder...
- Create a const array of variant string names
- Export the list as a type

In attributes/index.ts...

- Import it and add it to attributes
- If it's selectable, add it to selectableAttributes and selectableAttributesArray

In type.ts...

- At types.ts, add it to AttributeType
- If it's a selectable one, extend AttributeSelectionBase for it
- Add it to AttributeSelection and the Companion interface

In poses.ts...

- Add it to the AttributeDictionary array for the relevant poses

In editor.tsx...

- Add it

In schema.prisma...

- Add it