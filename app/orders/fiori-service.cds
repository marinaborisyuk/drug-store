using {OrdersService} from '../../srv';

annotate OrdersService.Orders with @fiori.draft.enabled;
annotate OrdersService.Orders with @odata.draft.enabled;

annotate OrdersService.Orders with @(
  Common.SemanticKey : [ID],
  UI                 : {
    Identification  : [{Value : ID}],
    SelectionFields : [],
    LineItem        : [
      {Value : client_ID},
      {Value : item_ID}
    ],
    HeaderInfo      : {
      TypeName       : '{i18n>orderTypeName}',
      TypeNamePlural : '{i18n>orderTypeNamePlural}',
      Title          : {Value : client_ID},
      Description    : {Value : item_ID}
    }
  }
);

annotate OrdersService.Orders with @title : '{i18n>orderTypeNamePlural}' {
  ID
  @UI.Hidden;

  // client
  // @title                                  : '{i18n>orderClient}'
  // @Common                                 : {
  //   Text            : client.requisites,
  //   TextArrangement : #TextOnly,
  //   ValueList       : {
  //     $Type           : 'Common.ValueListType',
  //     SearchSupported : true,
  //     CollectionPath  : 'Clients',
  //     Parameters      : [
  //       {
  //         $Type             : 'Common.ValueListParameterOut',
  //         LocalDataProperty : client_ID,
  //         ValueListProperty : 'ID',
  //       },
  //       {
  //         $Type             : 'Common.ValueListParameterDisplayOnly',
  //         ValueListProperty : 'name',
  //       },
  //       {
  //         $Type             : 'Common.ValueListParameterDisplayOnly',
  //         ValueListProperty : 'surname',
  //       },
  //       {
  //         $Type             : 'Common.ValueListParameterDisplayOnly',
  //         ValueListProperty : 'number',
  //       }
  //     ]
  //   }
  // };

  modifiedAt
  @UI.Hidden;

  modifiedBy
  @UI.Hidden;

  createdAt
  @UI.Hidden;

  createdBy
  @UI.Hidden;
}
