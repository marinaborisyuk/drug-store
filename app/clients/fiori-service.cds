using {ClientsService} from '../../srv';

annotate ClientsService.Clients with @fiori.draft.enabled;
annotate ClientsService.Clients with @odata.draft.enabled;

annotate ClientsService.Clients with @(
  Common.SemanticKey : [ID],
  UI                 : {
    Identification      : [{Value : ID}],
    SelectionFields     : [],
    LineItem            : [
      {Value : name},
      {Value : surname},
      {Value : number},
    ],
    HeaderInfo          : {
      TypeName       : '{i18n>clientTypeName}',
      TypeNamePlural : '{i18n>clientTypeNamePlural}',
      Title          : {Value : surname},
      Description    : {Value : name}
    },
    Facets              : [
      {
        $Type  : 'UI.ReferenceFacet',
        Label  : '{i18n>clientDetails}',
        Target : '@UI.FieldGroup#Details'
      },
    ],
    FieldGroup #Details : {Data : [
      {Value : name},
      {Value : surname},
      {Value : number},
      {Value : boughtCount},
    ]}
  }
);

annotate ClientsService.Clients with @title : '{i18n>clientTypeNamePlural}' {
  ID
  @UI.Hidden;

  name
  @title                                : '{i18n>clientName}';

  surname
  @title                                : '{i18n>clientSurname}';

  number
  @title                                : '{i18n>clientNumber}';

  boughtCount
  @title                                : '{i18n>clientBoughtCount}';

  modifiedAt
  @UI.Hidden;

  modifiedBy
  @UI.Hidden;

  createdAt
  @UI.Hidden;

  createdBy
  @UI.Hidden;
}
