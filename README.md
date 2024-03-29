https://user-images.githubusercontent.com/1319241/229913289-9ed93727-f1ba-4ad5-a0f6-eb8a2d7f7bcf.mp4

This code powers [Companion-in-a-Box](https://companioninabox.art)

## Playbooks

### Dev process

#### DB Setup
Using Planetscale DB:
- `pscale auth login`
- `pscale connect companions initial-setup --port 3309`
- `pscale connect companions shadow --port 3310`

Using docker-compose to run mysql locally:
- `docker-compose up -d`

#### Dev Setup
- `yarn dev`
- Optional: `yarn prisma studio`

### Updating the schema

- Migration: `yarn prisma migrate dev`
  - docker-compose: 
    ```
    export DATABASE_URL=mysql://companions:companions@localhost:3306/companions
    export SHADOW_DATABASE_URL=mysql://companions:companions@localhost:3307/companions
    yarn prisma migrate dev
    ```
- Deploy request: `pscale deploy-request create companions initial-setup`
- Approve on planetscale.com

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

In helpers.ts...

- If there are colors add it to the check in apiToKeys

In editor.tsx...

- Add it to the editor, pay attention to the section

In schema.prisma...

- Add it
- Don't forget about the colors!!
