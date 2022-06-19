const {matchesInAppAnnotations} = require('../../../helpers/').structural.app;

describe('Annotations structural tests', () => {
  test('@odata.draft.enabled has been used', async () => {
    await matchesInAppAnnotations(/@odata.draft.enabled/gm);
  });

  test('@fiori.draft.enabled has been used', async () => {
    await matchesInAppAnnotations(/@odata.draft.enabled/gm);
  });

  test('ItemsService has been annotated', async () => {
    await matchesInAppAnnotations(/annotate[\s]StoreService.Items[\s]with/gm);
  });

  test('@UI.Hidden has been used', async () => {
    await matchesInAppAnnotations(/@UI.Hidden/gm);
  });

  test('ValueList has been used', async () => {
    await matchesInAppAnnotations(/ValueList/gm);
  });

  test('i18n has been used', async () => {
    await matchesInAppAnnotations(/{i18n>[^]+}/gm);
  });
});
