using {StoreService} from '../../srv';

annotate StoreService.Items with @(
  Common.SemanticKey : [ID],
  UI                 : {
    Identification      : [{Value : ID}],
    SelectionFields     : [],
    LineItem            : [
    ],
    HeaderInfo          : {
      TypeName       : '{i18n>itemTypeName}',
      TypeNamePlural : '{i18n>itemTypeNamePlural}',
    },
    Facets              : [
    ],
    FieldGroup #General : {Data : [
    ]}
  }
);

annotate StoreService.Items with @title : '{i18n>itemTypeNamePlural}' {
}

annotate StoreService.Items : price with @title : '{i18n>itemPrice}' {
}
