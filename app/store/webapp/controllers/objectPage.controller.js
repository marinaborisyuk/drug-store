/**
 * DISCLAMER!
 *
 * This code IGNORES dozens of SAP CAP, UI5
 * or fiori guidelines and ect.,
 * because it has been provided ONLY
 * for EDUCATIONAL PURPOSES to SIMPLIFY
 * the calling of StoreService actions
 *
 * !!!DON'T COPY THIS AN USE IN THE PRODUCTION!!!
 *  */
sap.ui.define(
    [
      'sap/ui/core/mvc/ControllerExtension',
      'sap/ui/core/Core',
      'sap/m/Dialog',
      'sap/m/DialogType',
      'sap/m/Button',
      'sap/m/ButtonType',
      'sap/m/MessageToast',
      'sap/m/TextArea',
    ],
    (
        ControllerExtension,
        Core,
        Dialog,
        DialogType,
        Button,
        ButtonType,
        MessageToast,
        TextArea,
    ) => {
      return ControllerExtension.extend(
          'store.controllers.objectPage', {
            onPurchase: function(oContext) {
              if (!this.submitDialog) {
                this.submitDialog = new Dialog({
                  type: DialogType.Message,
                  title: 'Purchase',
                  content: [
                    new TextArea('clientToken', {
                      width: '100%',
                      placeholder: 'Provide client token (required)',
                      liveChange: (oEvent) => {
                        const sText = oEvent.getParameter('value');
                        this.submitDialog
                            .getBeginButton()
                            .setEnabled(sText.length > 0);
                      },
                    }),
                  ],
                  beginButton: new Button({
                    type: ButtonType.Emphasized,
                    text: 'Submit',
                    enabled: false,
                    press: () => {
                      const clientToken = Core.byId('clientToken').getValue();
                      $.ajax({
                        url: '/store/purchase',
                        type: 'POST',
                        headers: {'x-http-method': 'MERGE'},
                        datatype: 'json',
                        contentType: 'application/json; charset=utf-8',
                        data: JSON.stringify({
                          item: oContext.getObject().ID,
                          client: clientToken,
                        }),
                        success: function() {
                          const itemName = oContext.getObject().name;
                          MessageToast.show(
                              `Purchased ${itemName} for ${clientToken}`,
                          );
                        },
                        error: function() {
                          const itemName = oContext.getObject().name;
                          MessageToast.show(
                              `Failed to purchase ${itemName}`,
                          );
                        },
                      });
                      this.submitDialog.close();
                    },
                  }),
                  endButton: new Button({
                    text: 'Cancel',
                    press: () => {
                      this.submitDialog.close();
                    },
                  }),
                });
              }
              this.submitDialog.open();
            },
          });
    },
);
