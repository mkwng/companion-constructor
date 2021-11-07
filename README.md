## Playbooks

### Adding a new attribute

Define it...

- Create AttributeDictionary describing the attribute and its variants
- The path assumes you are already in the "public/attributes" folder...
- Create a const array of variant string names
- Export the list as a type

In type.ts...

- At types.ts, add it to AttributeType
- If it's a selectable one, extend AttributeSelectionBase for it
- Add it to AttributeSelection and the Companion interface

In poses.ts...

- Import it and add it to attributes
- Add it to the AttributeDictionary array for the relevant poses

In helper.ts...

- If it's selectable, add it to selectableAttributes and selectableAttributesArray
