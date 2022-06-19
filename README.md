# drug-store project template as a task

Welcome to your new project.

It contains these folders and files, following to recommended project layout:

File or Folder | Purpose
---------|----------
`app/` | content for UI frontends goes here
`db/` | your domain models and data go here
`srv/` | your service models and code go here
`test/` | your tests go here
`package.json` | project's metadata and configuration

Your final goal is to add described functionality and to gain total passing of a CI workflow (various tests and lints are used here).

## 0. First Steps

### Mandatory part:
- Import (clone and push) the project to your own github account
- Add tutors to collaborators to track your progress
- Install project's dependencies with `npm i`
- Open a new terminal and run `cds watch` 
- Check exposed services on [localhost:4004](http://localhost:4004)

### Optional part:
- Investigate your project's dependencies, check their repos, issues, documentation and star them, if you wish :)
- Try to play with `cds watch` and `cds run` and find differencies

## 1. DB Modeling

### Mandatory part:
- Create your own custom types (names matter!):
    - A `Currency` (enum) type with `Bitcoin`, `USD`, `BYN` variants
    - A `Price` (structured) type with `value` (`Decimal`) and `currency` (`Currency`) fields
    - A `Phone` (`String`) type to store phone numbers ('+375291234567')
- Fix the [`Items`](./db/models/store/items.cds) entity to use the `Price` type
- Create the `Clients` entity with the following fields:

Name | Type
---------|----------
`name` | `localized String(50)`
`surname` | `localized String(50)`
`number` | `Phone` 
`boughtCount` | `Integer default 0`

And reuse standard `cuid` and `managed` aspects

- Create the `Orders` entity with the following fields:

Name | Type
---------|----------
`client` | `Association to Clients`
`item` | `Association to Items`

And reuse standard `cuid` and `managed` aspects

- Provide some mock data in the [data](./db/data/) folder (use [Items.csv](./db/data/db.store-Items.csv) as a template and [scripts](./scripts/csv/) to generate)

- All the tests related to the domain modelling topic must pass and building with `cds watch` or `cds run` must be successfully completed

### Optional part:
- Add some other types/fields to your schema
- Try to add [constraints](https://cap.cloud.sap/docs/cds/cdl#constraints) to fields
- Try to deploy your db to sqlite (check `cds build --help`) and check it's content

## 2. Services, actions, functions, events and handlers

### Mandatory part:
- Implement the following projections in the `OrdersService` service:
    - `Orders` as a projection of all fields of the corresponding db entity
    - readonly `Items` as a projection of `ID`, `name` and `description` fields of the corresponding db entity
    - readonly `Clients` as a projection of the following fields:

Name | Type | Additional Description
---------|----------|----------
`ID` | `UUID` | 
`name` | `localized String(50)` | 
`surname` | `localized String(50)` | 
`number` | `Phone` | 
`requisites` | `Integer default 0` | Concatenation of name, surname and number fields

Readonly behavior could be achieved by the `@readonly` annotation

- Add a `Clients` projection to the `ClientService`

- Fix the `price` field in the `StoreService`

- Define an action `purchase` in the `StoreService` with the following input values:

Name | Type
---------|----------
`client` | `Clients:ID`
`item` | `Items:ID`

- Define an event `purchased` in the `StoreService` with the following values:

Name | Type
---------|----------
`client` | `Clients:ID`
`item` | `Items:ID`

- Add audit logging of the `READ` event of the `Items` entity of the `StoreService` (check the `OrdersService` implementation as an example)

- Add audit logging of all events of the `Clients` entity of the `StoreService` (check the `OrdersService` implementation as an example)

- Fix the implementation of the `purchase` action in the `StoreService` to check IDs, create a new order (check [queries](./srv/store/helpers/queries.js) first) and emit the `purchased` event

- Add handling of the `purchased` event in the `ClientService`, where the handler increments `boughtCount` field of the corresponding client (check the similar handling in the `ItemsService`)

- All the tests related to the services topic must pass and building with `cds watch` or `cds run` must be successfully completed

- Manually test your services with [requests](./test/educational/services/store/manual/requests.http)


### Optional part:
- Add ordering to projections
- Add some handy functions to services

## 3. Testing, @assert and i18n

### Mandatory part:
- Provide your own unit-tests and increase the test-coverage of the project
- Add `@mandatory`, `@assert.range`, `@assert.integrity`, `@assert.format` annotations
- Deploy the db to sqlite and check the presence of localized* tables
- Add some i18n texts in `_i18n/i18n.properties` files of apps
- All the tests related to the db annotations topic must pass and building with `cds watch` or `cds run` must be successfully completed
- Manually test your services with [requests](./test/educational/services/store/manual/requests.http) with incorrect data

### Optional part:
- Add other useful annotations to the project
- Try to use `annotate` or `extend` (and with aspects too)
- Try to provide localized texts/names for your regions

## 4. UI Implentation via SAP Fiori Annotations and Smart Templates

### Mandatory part:

- `Drug Store` application:
    - Add `name`, `manufacturer`, `price_value`, `price_currency` fields to a list of items
    - Add title and description to an object page of an item
    - Add facets with item's information to the item's object page (use the `Manage Items` app as a template)
    - Hid technical fields of the item `@UI.Hidden` from a search and ect. 
- `Manage Orders` application:
    - Add value lists to `client` and `item` fields (use commented code as an example)
- Fix all missing i18n texts
- Launch the project with `cds watch` or `cds run` and manually test your fiori apps
- All the tests related to the fiori annotations topic must pass and building with `cds watch` or `cds run` must be successfully completed

### Optional part:

- Hid all technical data in all apps (in value helps too)
- Fix application's behavior to meet fiori guidlines and ect.
- Refactor an implementation of the [UI purchase handler](./app/store/webapp/controllers/objectPage.controller.js)
- (**Complex**) Implement end2end item review functionality

## 5. Deployment to SAP BTP

Try to [deploy](https://cap.cloud.sap/docs/guides/deployment/to-cf) the project to the CloudFoundry.
Failure due to region&trial limitations is okay.
