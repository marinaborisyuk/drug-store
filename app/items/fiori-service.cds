using {ItemsService} from '../../srv';

annotate ItemsService.Items with @fiori.draft.enabled;
annotate ItemsService.Items with @odata.draft.enabled;

annotate ItemsService.Items with @(
  Common.SemanticKey : [ID],
  UI                 : {
    Identification      : [{Value : ID}],
    SelectionFields     : [],
    LineItem            : [
      {Value : name},
      {Value : manufacturer}
    ],
    HeaderInfo          : {
      TypeName       : '{i18n>itemTypeName}',
      TypeNamePlural : '{i18n>itemTypeNamePlural}',
      Title          : {Value : name},
      Description    : {Value : manufacturer}
    },
    Facets              : [
      {
        $Type  : 'UI.ReferenceFacet',
        Label  : '{i18n>itemGeneral}',
        Target : '@UI.FieldGroup#General'
      },
      {
        $Type  : 'UI.ReferenceFacet',
        Label  : '{i18n>itemDetails}',
        Target : '@UI.FieldGroup#Details'
      },
    ],
    FieldGroup #General : {Data : [
      {Value : name},
      {Value : manufacturer},
      {Value : price_value},
      {Value : price_currency},
      {Value : soldCount},
    ]},
    FieldGroup #Details : {Data : [
      {Value : description},
      {Value : warnings},
      {Value : ingredients},
    ]}
  }
);

annotate ItemsService.Items with @title : '{i18n>itemTypeNamePlural}' {
  ID
  @UI.Hidden;

  name
  @title                                : '{i18n>itemName}';

  description
  @title                                : '{i18n>itemDescription}';

  ingredients
  @title                                : '{i18n>itemIngredients}';

  warnings
  @title                                : '{i18n>itemWarnings}';

  manufacturer
  @title                                : '{i18n>itemManufacturer}';

  soldCount
  @title                                : '{i18n>itemSoldCount}';

  modifiedAt
  @UI.Hidden;

  modifiedBy
  @UI.Hidden;

  createdAt
  @UI.Hidden;

  createdBy
  @UI.Hidden;
}

annotate ItemsService.Items : price with @title : '{i18n>itemPrice}' {
  value
  @title                                        : '{i18n>itemPrice}';

  currency
  @title                                        : '{i18n>itemPriceCurrency}';
}
